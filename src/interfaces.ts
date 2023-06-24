export interface League {
    id: string,
    name: string,
    description: string,
    type: string,
    adminId: string,
    usersTeams?: {}
};

export interface User {
    id: string,
    name: string,
    type: string
};

export interface Team {
    id: string,
    name: string,
    type: string,
};