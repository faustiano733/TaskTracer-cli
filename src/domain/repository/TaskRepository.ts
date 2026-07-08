import type { Task } from "../entities/Task.js";

export interface TaskRepository {

    findAll:()=>Promise<Task[]>
    create:(description:string)=>Promise<Task>
    findTodoTasks:()=>Promise<Task[]>
    findInProgressTasks:()=>Promise<Task[]>
    findDoneTasks:()=>Promise<Task[]>
    delete:(id:string)=>Promise<boolean>

}