import React from "react";



interface InputBoxProps {
    type:string;
    placeholder:string;
    label: string
    name:string;
    value: string;
    error?: string;
    required?: boolean;
    className?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox: React.FC<InputBoxProps> = ( { type,placeholder,value,onChange,required, label,name,error } ) => {
    return (
        <div className="">
            <label className="block text-sm  font-extrabold"> {label} </label>
            <input 
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className={`w-full p-2 border rounded-md text-black ${ error? 'border-red-500' : 'border-slate-300'}`}
            />
            { error && <span className="text-red-400 text-sm mt-1">Error: Invalid Input   </span>  }
        </div>
    )
}