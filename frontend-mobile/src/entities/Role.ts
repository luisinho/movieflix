export type RoleResponse = {
    content: Role[];
}

export type Role = {
    id: number;
    authority: string;
    description: string;
}

export const getNewRole = () => {

    const user = {
        id: 0,
        authority: '',
        description: ''
    }

    return user as Role;
}