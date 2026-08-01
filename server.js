const express = require('express');
const app = express()
const port = 3000

const tasks = [
    { id: 1, title: "Learn Express", done: false },
    { id: 2, title: "Build CRUD API", done: false },
    { id: 3, title: "Complete Assignment", done: true }
];

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    });
});

app.get('/health', (req, res) => {
    res.json({
        "status": "ok"
    });
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const taskId = Number(req.params.id);
    const foundTask = tasks.find(task => task.id === taskId);
    if (foundTask) {
        res.json(foundTask);
    } else {
        res.status(404).json({ error: `Task ${taskId} not found` });
    }
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const id = tasks[tasks.length - 1].id + 1;
    if(!title){
      return res.status(400).json({
          error: "Title is required"
      });
    }
    let temp = { id: id, title: title, done: false }
    tasks.push(temp)
    res.status(201).json(temp);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})