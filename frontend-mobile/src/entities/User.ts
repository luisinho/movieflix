import { Role } from "./Role";

export type UserResponse = {
    content: User[];
    totalPages: number;
}

export type User = {
    id: number;
    name: string;
    email: string;
    active: boolean;
    createdAt: Date;
    roles: Role[];
    idRole: number;
}

export const getNewUser = () => {

    const user = {
        id: 0,
        name: '',
        email: '',
        active: true,
        idRole: 0
    }

    return user as User;
}