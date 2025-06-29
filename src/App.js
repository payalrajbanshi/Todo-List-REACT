// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// import React, { useState } from "react";

// function App() {
//   const [task, setTask] = useState("");      // input value
//   const [tasks, setTasks] = useState([]);    // list of tasks

//   const handleAddTask = () => {
//     if (task.trim() === "") return;          // ignore empty tasks
//     setTasks([...tasks, task]);               // add task to array
//     setTask("");                             // clear input
//   };

//   return (
//     <div className="App" style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
//       <h1>My To-Do List</h1>
//       <input
//         type="text"
//         placeholder="Enter a task"
//         value={task}
//         onChange={(e) => setTask(e.target.value)} />
//       <button onClick={handleAddTask}>Add</button>

//       <ul>
//         {tasks.map((t, index) => (
//           <li key={index}>{t}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";

// function App() {
//   const [task, setTask] = useState("");
//   const [tasks, setTasks] = useState([]);

//   // Load tasks from localStorage on mount
//   useEffect(() => {
//     const savedTasks = JSON.parse(localStorage.getItem("tasks"));
//     if (savedTasks) setTasks(savedTasks);
//   }, []);

//   // Save tasks to localStorage whenever tasks change
//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const handleAddTask = () => {
//     if (task.trim() === "") return;
//     const newTask = { text: task, completed: false };
//     setTasks([...tasks, newTask]);
//     setTask("");
//   };

//   const handleToggleTask = (index) => {
//     const updatedTasks = [...tasks];
//     updatedTasks[index].completed = !updatedTasks[index].completed;
//     setTasks(updatedTasks);
//   };

//   const handleDeleteTask = (index) => {
//     setTasks(tasks.filter((_, i) => i !== index));
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
//       <h1 style={{ textAlign: "center" }}>📝 Advanced To-Do List</h1>

//       <div style={{ display: "flex", marginBottom: "10px" }}>
//         <input
//           type="text"
//           placeholder="Enter a task"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//           style={{ flex: 1, padding: "8px" }}
//         />
//         <button onClick={handleAddTask} style={{ marginLeft: "10px" }}>
//           ➕ Add
//         </button>
//       </div>

//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {tasks.map((t, index) => (
//           <li
//             key={index}
//             style={{
//               marginBottom: "10px",
//               background: "#f1f1f1",
//               padding: "10px",
//               borderRadius: "5px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               textDecoration: t.completed ? "line-through" : "none",
//               color: t.completed ? "gray" : "black",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <input
//                 type="checkbox"
//                 checked={t.completed}
//                 onChange={() => handleToggleTask(index)}
//                 style={{ marginRight: "10px" }}
//               />
//               {t.text}
//             </div>
//             <button onClick={() => handleDeleteTask(index)}>🗑</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (task.trim() === "") return;

    const newTask = { text: task, completed: false, dueDate, priority };

    if (editIndex !== -1) {
      const updated = [...tasks];
      updated[editIndex] = newTask;
      setTasks(updated);
      setEditIndex(-1);
    } else {
      setTasks([...tasks, newTask]);
    }

    setTask("");
    setDueDate("");
    setPriority("Medium");
  };

  const handleToggle = (i) => {
    const updated = [...tasks];
    updated[i].completed = !updated[i].completed;
    setTasks(updated);
  };

  const handleDelete = (i) => setTasks(tasks.filter((_, idx) => idx !== i));

  const handleEdit = (i) => {
    const t = tasks[i];
    setTask(t.text);
    setDueDate(t.dueDate);
    setPriority(t.priority);
    setEditIndex(i);
  };

  const filtered = tasks.filter((t) =>
    filter === "All" ? true : filter === "Completed" ? t.completed : !t.completed
  );

  const priorityColor = {
    High: "border-red-500",
    Medium: "border-yellow-500",
    Low: "border-green-500",
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">📝 Smart To-Do App</h1>

      <div className="space-y-2 mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button
          onClick={handleAdd}
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editIndex === -1 ? "➕ Add Task" : "✏️ Update Task"}
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-4">
        {["All", "Pending", "Completed"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 border rounded ${
              filter === type ? "bg-gray-800 text-white" : "bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {filtered.map((t, i) => (
          <li
            key={i}
            className={`p-4 border-l-4 rounded shadow flex justify-between items-center ${
              priorityColor[t.priority]
            } ${t.completed ? "opacity-50 line-through" : ""}`}
          >
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleToggle(i)}
                  className="mr-2"
                />
                <span className="font-semibold">{t.text}</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                📅 {t.dueDate || "No due date"} | 🔥 {t.priority}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(i)} className="text-blue-600">✏️</button>
              <button onClick={() => handleDelete(i)} className="text-red-600">🗑</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

