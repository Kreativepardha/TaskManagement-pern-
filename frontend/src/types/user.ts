

export interface User {
    id: number;
    name:string | null;
    email: string;
    password:string
}

export interface UserLogin {
    email: string;
    password: string
}

export interface UserRegister extends UserLogin {
    name?:string;
}


export interface FromError{ 
    name?:string;
    email?:string;
    password?:string;
    general?:string;
}