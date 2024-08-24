import React, { FormEvent } from "react"

interface ButtonProps {
    onClick: (e: React.FormEvent) => void;
    text: string;
    type?: 'button' | 'submit'
}




export const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
    return (
        <button onClick={onClick} className="w-full bg-black p-2 rounded-lg text-white font-semibold hover:bg-yellow-300 hover:text-black">
            {text}
        </button>
    )
}