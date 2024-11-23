import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

export const Input: FC<InputProps> = ({
    className = '', ...props
}) => {
    return (
        <input
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    )
}