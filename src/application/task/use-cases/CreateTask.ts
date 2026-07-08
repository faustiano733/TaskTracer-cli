import { type TaskRepository } from "../../../domain/repository/TaskRepository.js";
import { type Task } from "../../../domain/entities/Task.js";

export interface CreateTaskInput {
    description:string
}

export type CreateTaskOutput = Task 

export class CreateTask {
    

    constructor(private taskRepository: TaskRepository){
        this.taskRepository = taskRepository
    }

    async exec(description:string):Promise<CreateTaskOutput>{
        const task = await this.taskRepository.create(description)

        return task
    }
}