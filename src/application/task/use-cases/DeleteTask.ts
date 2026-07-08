import type { TaskRepository } from "../../../infrastructure/JSONTaskRepository.js";

export class DeleteTask {
    constructor(private taskRepository:TaskRepository){
        this.taskRepository = taskRepository
    }

    async exec(id:number):Promise<boolean>{
        const isDeleted = await this.taskRepository.delete(id)
        return isDeleted

    }
}