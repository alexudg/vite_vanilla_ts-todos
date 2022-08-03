import './style.css'
import 'toastify-js/src/toastify.css'
import Toastify from 'toastify-js' // npm install @types/toastify-js

const taskForm = document.querySelector<HTMLFormElement>('#taskForm')

const tasksList = document.querySelector<HTMLDivElement>('#tasksList')

interface Task {
    title: string,
    description: string
}

let tasks: Task[] = []

taskForm?.addEventListener('submit', (eve) => {
    eve.preventDefault()
    
    const txtTitle = taskForm.title as unknown as HTMLInputElement
    const txtDescription = taskForm.description as unknown as HTMLTextAreaElement
    
    tasks.push({
        title: txtTitle.value, 
        description: txtDescription.value
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))    

    taskForm.reset() 
    txtTitle.focus()

    loadTasks()
    Toastify({
        text: 'Task added!',
        close: true,
        style: {
            background: "linear-gradient(to right, green, lightgreen)",
        }
    }).showToast()
})

function loadTasks() {
    tasksList!.innerHTML = ''

    tasks.forEach((task) => {
        const taskElement = document.createElement('div');
        taskElement.className = 'bg-gray-800 mb-4 px-2 py-2 rounded-md'

        const title = document.createElement('header');
        title.innerText = task.title
        taskElement.append(title)

        const description = document.createElement('p')
        description.innerText = task.description
        taskElement.append(description)

        const btnDelete = document.createElement('button')
        btnDelete.innerText = 'Eliminar'
        btnDelete.className = 'bg-red-600 px-3 py-1 rounded-md'
        btnDelete.onclick = () => {
            const i = tasks.indexOf(task)
            if (i > -1) {
                tasks.splice(i, 1)
                localStorage.setItem('tasks', JSON.stringify(tasks)) 
                Toastify({
                    text: 'Task deleted!',
                    style: {
                        background: "linear-gradient(to right, red, salmon)",
                    }
                }).showToast()
            }                       
            taskElement.remove()
        }

        taskElement.append(btnDelete)

        tasksList?.append(taskElement);        
    })
}

document.addEventListener('DOMContentLoaded', () => {
    tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    loadTasks()
})