'use client';

import { FC, FormEvent, useState } from "react";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
}

export const LoginForm: FC<LoginFormProps> = ({onSubmit}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(email, password);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Button type="submit" className="w-full">Login</Button>
        </form>
    )
}