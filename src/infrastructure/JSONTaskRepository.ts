import fs from 'fs/promises'
import path from 'path'
import type { Task } from '../domain/entities/Task.js';
export class TaskRepository {
    
    constructor(private db:{task:Task[], last_id:number},
    private dbPath: string){
        this.dbPath = path.resolve('db/db.json')
        
    }

    async init (){
        const file = await fs.readFile(this.dbPath, 'utf8')
        this.db = JSON.parse(file)
    }

    async commit(){
        await fs.writeFile(this.dbPath, JSON.stringify(this.db))
    }

    async add(description:string){
        const now = new Date
        const task = {
            id : this.db.last_id + 1,
            description,
            createdAt : now,
            updatedAt : now,
            status : 'todo',
        }
        
        this.db.last_id += 1
        this.db.task.push(task)
        await this.commit()

        return task
        
    }

    async delete(id:number){
        const taskIndex = this.binaryTaskSearch(id)
        
        if(taskIndex == -1){
            console.log('Tarefa nao existe')
            return false
        }
        this.db.task.splice(taskIndex, 1)
        await this.commit()
        return true
        
    }

    async markInProgress(id:number){
        const taskIndex = this.binaryTaskSearch(id)
        if(taskIndex == -1){
            console.log('Tarefa nao existe')
            return false
        }

        this.db.task[taskIndex].status = "in-progress";
        await this.commit();
        return true
    }
    async markDone(id:number){
        const taskIndex = this.binaryTaskSearch(id)
        if(taskIndex == -1){
            console.log('Tarefa nao existe')
            return false
        }

        this.db.task[taskIndex].status = "done";
        await this.commit();
        return true
    }
    
    async findAll(){
        return this.db.task
    }
    async findByStatus(status:string){
        let filteredTasks = this.db.task.filter(task=>task.status == status)

        return filteredTasks
    }

    binaryTaskSearch(id:number):number{
        const tasks = this.db.task
        let max = tasks.length - 1
        let min = 0

        while(min <= max){
            const middle = Math.floor((min + max) / 2);
            const task = tasks[middle]
            const taskId = task?.id 
            if( taskId == id){
                return middle
            }else{
            if(taskId > id){
                max = middle - 1
            }

              if(taskId < id){
                min = middle + 1
              }
            }

        }
        return -1    
    }
}