export type RoleResponse = {
    content: Role[];
}

export type Role = {
    id: number;
    authority: string;
    description: string;
}