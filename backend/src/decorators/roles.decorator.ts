import { SetMetadata } from "@nestjs/common"

export const ROLES_KEY = 'roles'
export enum UserRole {
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN',
}

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)