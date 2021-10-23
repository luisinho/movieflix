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
}

export const getNewUser = () => {

    const user = {
        id: 0,
        name: '',
        email: '',
        active: true
    }

    return user as User;
}