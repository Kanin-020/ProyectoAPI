export interface Task {
    taskId: number,
    projectId: number,
    projectName?: string,
    name: string,
    description: string,
    state: string,
    creationDate: string,
    deadline: string,
}

export interface Project {
    projectId: number,
    name: string,
    description: string,
    state: string,
    creationDate: string,
    deadline: string,
}

export interface Comment{
    commentId: number,
    taskId: number,
    userId: number,
    state: string,
    content: string,
    date: string,
}

export interface User{
    userId: number,
    projectId?: number,
    name : string,
    email: string,
    password: string,
    role: string,
    creationDate: string,
    lastLoginDate: string
}
