export interface TodoItemModel {
    name: string;
    completed: boolean;
    completedAt?: Date;
    id: number;

    createdAt?: Date;
    updatedAt?: Date;
}