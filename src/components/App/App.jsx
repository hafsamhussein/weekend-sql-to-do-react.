import {useState, useEffect} from 'react';
import axios from 'axios';


function App () {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState(0);

  useEffect(() => {
    axios.get('/todo')
      .then(response => setTasks(response.data))
      .catch(error => console.log('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    axios.post('/todo', {task_name: newTask, priority: newPriority, status: 'Incomplete'})
      .then(() => {
        setNewTask('');
        setNewPriority(0);
        // Refresh tasks
        return axios.get('/todo');
      })
      .then(response => setTasks(response.data))
      .catch(error => console.log('Error adding new task:', error));
  };

  const completeTask = (id) => {
    axios.put(`/todo/${id}`)
      .then(() => axios.get('/todo'))
      .then(response => setTasks(response.data))
      .catch(error => console.log('Error completing task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`/todo/${id}`)
      .then(() => axios.get('/todo'))
      .then(response => setTasks(response.data))
      .catch(error => console.log('Error deleting task:', error));
  };
  
  return (
    <div>
      <h1>TO DO APP</h1>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" />
      <input type="number" value={newPriority} onChange={(e) => setNewPriority(e.target.value)} placeholder="Priority" />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.task_name} - Priority: {task.priority}
            <button onClick={() => completeTask(task.id)}>Complete</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default App
