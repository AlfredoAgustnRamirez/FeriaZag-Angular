export interface Session{
    user: User;
    token: string
}

export interface User{
    iduser: string
    password: string
    email: string
}


export interface UserPayload{
    password: string
    email: string
}