
import { TaskRepository } from './repository/taskRepository.js'
import { createDb } from './utils/functions.js'
const args = process.argv.slice(2)

if(!args || args.length == 0){
    throw Error('Nenhum argumento passado')
}


const arg1 = args[0].toLowerCase()
await createDb()
const taskRepository = new TaskRepository
await taskRepository.init()
let taskId = undefined
let tasks = []
switch(arg1){
    case 'add':
        const taskDescription = args[1].toLowerCase()

        if(!taskDescription){
            console.log('Inclua o nome da tarefa')
        }
        taskRepository.add(taskDescription)
        break;
    case 'delete':
        console.log('Deletando tarefa')
        taskId = args[1]
        if(!taskId){
            console.log('insira o id da tarefa')
            break
        }
        taskRepository.delete(taskId)
        break
    case 'mark-in-progress':
        taskId = args[1]
        if(!taskId){
            console.log('insira o id da tarefa')
            break
        }

        taskRepository.markInProgress(taskId)
        break;
    case 'mark-done':
        taskId = args[1]
        if(!taskId){
            console.log('insira o id da tarefa')
            break
        }
        await taskRepository.markDone(taskId)
        break;
    case 'list':
        const arg2 = args[1]
        switch(arg2){
            case 'done':
                tasks = await taskRepository.findByStatus(arg2) || []
                if(!(tasks.length > 0)){
                    console.log("Não existem tarefas")
                    break
                }

                console.log(tasks)
                break;
            case 'in-progress':
                tasks = await taskRepository.findByStatus(arg2) || []
                if(!(tasks.length > 0)){
                    console.log("Não existem tarefas")
                    break
                }

                console.log(tasks)
                break;
            case 'todo':
                tasks = await taskRepository.findByStatus(arg2) || []
                if(!(tasks.length > 0)){
                    console.log("Não existem tarefas")
                    break;
                }

                console.log(tasks)
                break;
            case undefined:
                tasks = await taskRepository.findAll() || []
           
                if(!(tasks.length > 0)){
                    console.log("Não existem tarefas")
                    break;
                }

                console.log(tasks)
                break;
            default:
                console.log('Argumento invalido')
        }
        break
    default:
        console.log('Argumento invalido')
        break;
}