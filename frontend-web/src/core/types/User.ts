export type User = {
    id: number;
    name: string;
}

export const getNewUser = () => {

    const user = {
        id: 0,
        name: ''
    }

    return user as User;
}