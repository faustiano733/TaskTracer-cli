import path from 'path'
import fs from 'fs/promises'
import { existsSync } from 'fs'

export const createDb = async ()=>{
    const dbDir = path.resolve("db")
    const dbFile = path.join(dbDir, 'db.json')
    
    if(!existsSync(dbDir)){
        await fs.mkdir(dbDir)
    }

    if(!existsSync(dbFile)){
        await fs.writeFile(dbFile, JSON.stringify({task:[], last_id:0}))
        return true
    }
    return false

}
