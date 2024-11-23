import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt'
import { PrismaService } from "prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ){}

    async login(loginDto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {email: loginDto.email}
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        return {
            token: this.jwtService.sign({userId: user.id}),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        }
    }

    async register(registerDto: RegisterDto) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                name: registerDto.name,
                password: hashedPassword,
                role: 'STUDENT',
            }
        })

        return {
            token: this.jwtService.sign({userId: user.id}),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            }
        }
    }
}