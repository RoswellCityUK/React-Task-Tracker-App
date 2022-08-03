import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from "react";

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }

        getTasks()
    }, []);

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5111/tasks')
        const data = await res.json()
        return data
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5111/tasks/${id}`)
        const data = await res.json()
        return data
    }

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5111/tasks/${id}`, {
            method: 'DELETE',
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

        const res = await fetch(`http://localhost:5111/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask),
        })

        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
    }

    const addTask = async (task) => {
        const res = await fetch('http://localhost:5111/tasks',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()

        setTasks([...tasks, data])
    }

    const toggleAddTask = () => {
        setShowAddTask(!showAddTask)
    }

    return (
        <div className="container">
            <Header title='Task tracker' stateAddTask={showAddTask} toggleAddTask={toggleAddTask} />
            { showAddTask && <AddTask addTask={addTask}/>}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggleReminder={toggleReminder}/> : 'No Tasks to show'}
        </div>
    );
}

export default App;
