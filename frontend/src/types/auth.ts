export interface User {
    id: number;
    email: string;
    name: string;
    role: 'STUDENT' | 'ADMIN'
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string
}

export interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
}