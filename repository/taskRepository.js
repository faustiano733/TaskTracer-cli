import fs from 'fs/promises'
import path from 'path'
export class TaskRepository {
    
    constructor(){
        this.dbPath = path.resolve('db/db.json')
        this.db = {}
        this.transaction = {}
    }

    async init (){
        const file = await fs.readFile(this.dbPath, 'utf8')
        this.db = JSON.parse(file)
    }

    async commit(){
        await fs.writeFile(this.dbPath, JSON.stringify(this.db))
    }
    async add(description){
        const now = new Date
        const task = {
            id : this.db.last_id + 1,
            createdAt : now,
            updatedAt : now,
            status : 'todo',
        }
        
        this.db.last_id += 1
        this.db.task.push(task)
        await this.commit()

        return task
        
    }
}