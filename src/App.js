import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState} from "react";

function App() {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2.30pm',
            reminder: true,
        },
        {
            id: 2,
            text: 'Meeting at School',
            day: 'Feb 6th at 1.30pm',
            reminder: true,
        },
        {
            id: 3,
            text: 'Food Shopping',
            day: 'Feb 5th at 2.30pm',
            reminder: false,
        },
    ])

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
        setTasks(tasks.map((task) => task.id === id ? {...task, reminder: !task.reminder} : task))
    }

    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000 + 1)

        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
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
