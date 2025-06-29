// import React, { useState, useEffect } from "react";

// function App() {
//   const [task, setTask] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [priority, setPriority] = useState("Medium");
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [editIndex, setEditIndex] = useState(-1);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("tasks"));
//     if (saved) setTasks(saved);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const handleAdd = () => {
//     if (task.trim() === "") return;

//     const newTask = { text: task, completed: false, dueDate, priority };

//     if (editIndex !== -1) {
//       const updated = [...tasks];
//       updated[editIndex] = newTask;
//       setTasks(updated);
//       setEditIndex(-1);
//     } else {
//       setTasks([...tasks, newTask]);
//     }

//     setTask("");
//     setDueDate("");
//     setPriority("Medium");
//   };

//   const handleToggle = (i) => {
//     const updated = [...tasks];
//     updated[i].completed = !updated[i].completed;
//     setTasks(updated);
//   };

//   const handleDelete = (i) => setTasks(tasks.filter((_, idx) => idx !== i));

//   const handleEdit = (i) => {
//     const t = tasks[i];
//     setTask(t.text);
//     setDueDate(t.dueDate);
//     setPriority(t.priority);
//     setEditIndex(i);
//   };

//   const filtered = tasks.filter((t) =>
//     filter === "All" ? true : filter === "Completed" ? t.completed : !t.completed
//   );

//   const priorityColor = {
//     High: "border-red-500",
//     Medium: "border-yellow-500",
//     Low: "border-green-500",
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">📝 Smart To-Do App</h1>

//       <div className="space-y-2 mb-4">
//         <input
//           type="text"
//           className="w-full p-2 border rounded"
//           placeholder="Enter a task"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//         />
//         <input
//           type="date"
//           className="w-full p-2 border rounded"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//         />
//         <select
//           className="w-full p-2 border rounded"
//           value={priority}
//           onChange={(e) => setPriority(e.target.value)}
//         >
//           <option>High</option>
//           <option>Medium</option>
//           <option>Low</option>
//         </select>
//         <button
//           onClick={handleAdd}
//           className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {editIndex === -1 ? "➕ Add Task" : "✏️ Update Task"}
//         </button>
//       </div>

//       <div className="flex justify-center gap-4 mb-4">
//         {["All", "Pending", "Completed"].map((type) => (
//           <button
//             key={type}
//             onClick={() => setFilter(type)}
//             className={`px-3 py-1 border rounded ${
//               filter === type ? "bg-gray-800 text-white" : "bg-gray-100"
//             }`}
//           >
//             {type}
//           </button>
//         ))}
//       </div>

//       <ul className="space-y-3">
//         {filtered.map((t, i) => (
//           <li
//             key={i}
//             className={`p-4 border-l-4 rounded shadow flex justify-between items-center ${
//               priorityColor[t.priority]
//             } ${t.completed ? "opacity-50 line-through" : ""}`}
//           >
//             <div>
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={t.completed}
//                   onChange={() => handleToggle(i)}
//                   className="mr-2"
//                 />
//                 <span className="font-semibold">{t.text}</span>
//               </div>
//               <div className="text-sm text-gray-500 mt-1">
//                 📅 {t.dueDate || "No due date"} | 🔥 {t.priority}
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => handleEdit(i)} className="text-blue-600">✏️</button>
//               <button onClick={() => handleDelete(i)} className="text-red-600">🗑</button>
//             </div>
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
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);

    const theme = localStorage.getItem("darkMode") === "true";
    setDarkMode(theme);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("darkMode", darkMode);
  }, [tasks, darkMode]);

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
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="max-w-xl mx-auto p-6 dark:bg-gray-900 dark:text-white transition-colors duration-500">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center w-full">📝 Smart To-Do App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className="ml-4 text-sm px-3 py-1 rounded border bg-gray-100 dark:bg-gray-700 dark:text-white"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <label className="block">
            <span className="sr-only">Task name</span>
            <input
              type="text"
              className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
              placeholder="Enter a task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </label>
          <input
            type="date"
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-600"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <button
            onClick={handleAdd}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform transform active:scale-95"
          >
            {editIndex === -1 ? "➕ Add Task" : "✏️ Update Task"}
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {["All", "Pending", "Completed"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 border rounded transition-colors ${
                filter === type
                  ? "bg-gray-800 text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
              aria-label={`Filter ${type} tasks`}
            >
              {type}
            </button>
          ))}
        </div>

        <ul className="space-y-3">
          {filtered.map((t, i) => (
            <li
              key={i}
              className={`p-4 border-l-4 rounded shadow flex justify-between items-center transition-all duration-300 ${
                priorityColor[t.priority]
              } ${t.completed ? "opacity-50 line-through" : ""} dark:bg-gray-800`}
            >
              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={() => handleToggle(i)}
                    className="mr-2"
                    aria-label={`Mark ${t.text} as completed`}
                  />
                  <span className="font-semibold">{t.text}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  📅 {t.dueDate || "No due date"} | 🔥 {t.priority}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(i)}
                  className="text-blue-600 hover:scale-110 transition-transform"
                  aria-label="Edit task"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="text-red-600 hover:scale-110 transition-transform"
                  aria-label="Delete task"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
