const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let tasks = [
  {
    id: 1,
    title: "Set up environment",
    description: "Install Node.js, npm, and git",
    completed: true,
    priority: "high",
    createdAt: new Date(),
  },
];

// GET /tasks → Retrieve all tasks
app.get("/tasks", (req, res) => {
  let filteredTasks = [...tasks];

  // Filter by completion status
  if (req.query.completed !== undefined) {
    const completedFilter = req.query.completed === "true";
    filteredTasks = filteredTasks.filter((task) => task.completed === completedFilter);
  }

  // Sort by creation date
  filteredTasks.sort((a, b) => b.createdAt - a.createdAt);
  res.json(filteredTasks);
});

// GET /tasks/:id → Retrieve a specific task
app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// POST /tasks → Create a new task
app.post("/tasks", (req, res) => {
  const { title, description, completed, priority } = req.body;
  const validPriorities = ["low", "medium", "high"];

  if (!title || typeof completed !== "boolean") {
    return res.status(400).json({ message: "Title and completed (boolean) are required" });
  }

  // Set default priority if not provided
  const taskPriority = validPriorities.includes(priority) ? priority : "medium";

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title,
    description: description || "",
    completed,
    priority: taskPriority,
    createdAt: new Date(),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id → Update an existing task
app.put("/tasks/:id", (req, res) => {
  const { title, description, completed, priority } = req.body;
  const task = tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ message: "Completed must be a boolean" });
    }
    task.completed = completed;
  }
  if (priority !== undefined) {
    const validPriorities = ["low", "medium", "high"];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority level" });
    }
    task.priority = priority;
  }

  res.json(task);
});

// DELETE /tasks/:id → Delete a task
app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

app.listen(port, (err) => {
  if (err) {
    return console.log("Error starting server:", err);
  }
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;