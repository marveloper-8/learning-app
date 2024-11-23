import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

export const Button: FC<ButtonProps> = ({
    children, className = '', ...props
}) => {
    return (
        <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${className}`}
            {...props}
        >{children}</button>
    )
}