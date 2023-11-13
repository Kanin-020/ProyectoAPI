export interface Task {
    taskId: number,
    projectId: number,
    projectName?: string,
    name: string,
    description: string,
    status: string,
    creationDate: string,
    deadline: string,
}

export interface Project {
    projectId: number,
    name: string,
    description: string,
    status: string,
    creationDate: string,
    deadline: string,
}

export interface Comment {
    commentId: number,
    taskId: number,
    userId: number,
    status: string,
    content: string,
    date: string,
}

export interface User {
    userId: number,
    projectId?: number,
    name: string,
    email: string,
    oldPassword?: string,
    password: string,
    role: string,
    creationDate?: string,
    lastLoginDate?: string
}

export interface Relation {
    relation_commentId?: number,
    relation_projectId?: number,
    projectId?: number,
    commentId?: number,
    taskId: number,
    userId: number,
}
