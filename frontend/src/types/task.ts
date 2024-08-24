

export interface Task {
    id: number;
    title: string;
    description?: string;
    completed?:boolean;
    important?:boolean;
    createdAt?:string;
    updatedAt?:string;
    userId: number;
}

export interface TaskCreate {
      title: string;
    description?: string;
    important?: boolean;
    completed?: boolean;
}