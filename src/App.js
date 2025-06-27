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

import React, { useState } from "react";

function App() {
  const [task, setTask] = useState("");      // input value
  const [tasks, setTasks] = useState([]);    // list of tasks

  const handleAddTask = () => {
    if (task.trim() === "") return;          // ignore empty tasks
    setTasks([...tasks, task]);               // add task to array
    setTask("");                             // clear input
  };

  return (
    <div className="App" style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>My To-Do List</h1>
      <input
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)} />
      <button onClick={handleAddTask}>Add</button>

      <ul>
        {tasks.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;

