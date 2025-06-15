# **Task Manager API**

## **Overview**
This project is a simple **Task Manager API** built using **Node.js and Express.js**. It allows users to create, update, retrieve, and delete tasks. The API supports filtering by **completion status**, sorting by **creation date**, and categorizing tasks by **priority level** (`low`, `medium`, `high`). Unit testing is performed using **tap** and **supertest** to ensure functionality.

---

## **Setup Instructions**

### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo/task-manager-api.git
```
Replace `your-repo` with your actual repository link.

### **2. Navigate to the Project Directory**
```sh
cd task-manager-api
```

### **3. Install Dependencies**
```sh
npm install
```

### **4. Run the API Server**
```sh
node app.js
```
or use **nodemon** for automatic restarts:
```sh
npx nodemon app.js
```

### **5. Run Unit Tests**
```sh
node test.js
```

---

## **API Endpoints & Testing Guide**

### **Base URL:**  
`http://localhost:3000`

### **Task Operations**

| Method | Endpoint | Description | Example Request |
|--------|---------|-------------|----------------|
| **GET** | `/tasks` | Retrieve all tasks (supports filtering & sorting) | `GET /tasks?completed=true` |
| **GET** | `/tasks/:id` | Retrieve a task by ID | `GET /tasks/1` |
| **GET** | `/tasks/priority/:level` | Retrieve tasks by priority (`low`, `medium`, `high`) | `GET /tasks/priority/high` |
| **POST** | `/tasks` | Create a new task | `POST /tasks` (Body: `{ title, description, completed, priority }`) |
| **PUT** | `/tasks/:id` | Update an existing task | `PUT /tasks/1` (Body: `{ title, description, completed, priority }`) |
| **DELETE** | `/tasks/:id` | Delete a task | `DELETE /tasks/1` |

### **Example Request Using cURL**

#### **Creating a New Task**
```sh
curl -X POST http://localhost:3000/tasks \
-H "Content-Type: application/json" \
-d '{"title": "Sample Task", "description": "Test description", "completed": false, "priority": "medium"}'
```

#### **Retrieving Completed Tasks**
```sh
curl -X GET http://localhost:3000/tasks?completed=true
```

#### **Updating a Task**
```sh
curl -X PUT http://localhost:3000/tasks/1 \
-H "Content-Type: application/json" \
-d '{"completed": true}'
```

#### **Deleting a Task**
```sh
curl -X DELETE http://localhost:3000/tasks/1
```

---

## **Running Unit Tests**
To validate API functionality, execute:
```sh
node test.js
```


Expected output:
```
✔ 19 passing tests
```

