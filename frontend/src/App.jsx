import React, { useState } from 'react'

// import './App.css'

const App=()=>{
  const [task, setTask]= useState([]);
  const [title, setTitle]= useState([]);
  const [description, setDescription]= useState([]);
  const [deadline, setdeadline]= useState([]);
  const [priority, setpriority]= useState([]);

  useEffect(()=>{
    axios.get('http://localhost:5300/api/task').then(response => setTask(response.data))
    .catch(error => console.log(error));
  },[]);

  const addTask =()=>{
    const newTask = {title, description, deadline, priority};
    axios.post('http://localhost:5300/api/task', newTask)
    .then(response => setTask([...tasks, response.data]))
    .catch(error =>console.log(error));
  }

  const markAsCompleted =(id)=>{
    axios.put( `http://localhost:5300/api/task/complete/${id}`)
    .then(response => setTask(task.map(task._id === id ? response.data: task))
    ).catch(error=> console.log(error));
  }

  const deletetask = (id)=>{
    axios.delete(`http://localhost:5300/api/task/${id}`)
    .then(()=> setTasks(tasks.filter(task => task._id !== id)))
    .catch(error=> concole.log(error));
  }

return(
  <Container>
    <Typograpgy variant = 'h3' gutterBotton> Task Manager</Typograpgy>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField fullwidth label= 'Task title' value={title} onChange={e => setTitle(e.target.value)}/>
        <TextField fullwidth label= 'Description' value={description} onChange={e => setDescription(e.target.value)}/>
        <TextField fullwidth label= 'Deadline' value={deadline} onChange={e => setdeadline(e.target.value)}/>
        <TextField fullwidth label= 'Priority' value={Priority} onChange={e => setPriority(e.target.value)}>
          <option value= "low">Low</option>
          <option value= "High">High</option>
          <option value= "medium">medium</option>
        </TextField>
        <Button fullWidth onClick={addTask}> Add task</Button>
      </Grid>
    </Grid>

    <Grid container spacing={2} mt={2}>
      {task.map(task=>(
        <Grid item xs = {12} md={4} key={task._id}>
          <Card>
            <CardContent>
              <Typography variant = "h6" color={task.completed ? 'gray' :'black'}>{task.title}</Typography>
              <Typography variant = "body2"> {task.description}</Typography>
              <Typography variant = "body2"> {new Date(task.deadline).toLocaledateString()}</Typography>
              <Typography variant = "body2" color="textSecondary"> {task.priority}</Typography>
              <Button onClick={()=>markAsCompleted(task._id)} disabled ={task.completed}>Complete</Button>
              <Button onClick={()=> deleteTask(task._id)}>Delete</Button>
            </CardContent>
          </Card>
        </Grid>
       ))}
    </Grid>

  </Container>
)

}


  


export default App
