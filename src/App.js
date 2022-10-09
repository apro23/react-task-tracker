import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

import {faker} from '@faker-js/faker';
import { useEffect, useState } from 'react';
import Footer from "./components/Footer";


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch tasks from server
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Fetch task from server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask =  async(task) => {
    const res = await fetch(`http://localhost:5000/tasks`, 
    {
      method: 'POST', 
      headers: {
      'Content-Type': 'application/json'      
      },
      body: JSON.stringify(task)
  })

  const data = await res.json()
    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE'})
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async(id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }    

    const res = await fetch(`http://localhost:5000/tasks/${id}`, 
    {
      method: 'PUT', 
      headers: {
      'Content-Type': 'application/json'      
      },
      body: JSON.stringify(updatedTask)
  })

  const data = await res.json()

    setTasks(tasks.map(task => task.id === id ? {...task, reminder: data.reminder } : task))
  }

  return (
    <div className="container">
     <Header tasks={tasks} setTasks={setTasks} onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask} />
     { showAddTask && <AddTask onAdd={addTask}/> }
     { tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : <h3>No tasks found.</h3> }
     <Footer />
    </div>
  );
}

const tasksArray = [
  {
      id: faker.datatype.uuid(),
      text: faker.random.words(3),
      day: faker.date.future().toDateString(),
      reminder: faker.datatype.boolean(),
  },
  {
      id: faker.datatype.uuid(),
      text: faker.random.words(3),
      day: faker.date.future().toDateString(),
      reminder: faker.datatype.boolean(),
  },
  {
      id: faker.datatype.uuid(),
      text: faker.random.words(3),
      day: faker.date.future().toDateString(),
      reminder: faker.datatype.boolean(),
  },
]

export default App;
