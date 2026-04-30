
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
switch(arg1){
    case 'add':
        const taskName = args[1]
        if(!taskName){
            console.log('Inclua o nome da tarefa')
        }

        taskRepository.add(taskName)
        break;
    case 'delete':
        console.log('Deletando tarefa')
        break;
    case 'mark-in-progress':
        console.log('Tarefa em progresso')
        break;
    case 'mark-done':
        console.log('Tarefa Concluida')
        break;
    case 'list':
        const arg2 = args[1]
        switch(arg2){
            case 'done':
                console.log('tarefas concluidas:')
                break;
            case 'in-progress':
                console.log('tarefas em progresso:')
                break;
            case 'todo':
                console.log('tarefas incompletas:')
                break;
            case undefined:
                console.log('todas as tarefas')
                break;
            default:
                console.log('Argumento invalido')
            
        }
        break
    default:
        console.log('Argumento invalido')
        break;
}