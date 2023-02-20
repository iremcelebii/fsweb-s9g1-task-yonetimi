import { useState } from "react";
import "./app.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import TaskHookForm from "./TaskHookForm";
import PeopleForm from "./PeopleForm";
import { initialTasks, initialTeam } from "./data";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const notify1 = () => toast("Görev Tamamlandı!");
  const notify2 = () => toast("Görev Eklendi!");
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks]);
    notify2();
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi]);
  }

  function handleComplete(id) {
    let tiklanan = tasks
      .filter((x) => x.id === id)
      .map((x) => ({ ...x, status: "yapıldı" }));
    let kalan = tasks.filter((x) => x.id !== id);
    let birlestir = [...kalan];
    birlestir.push(tiklanan[0]);
    // console.log("tiklanan");
    // console.log(tiklanan);
    // console.log("birlestir");
    // console.log(birlestir);
    setTasks(birlestir);
    notify1();
  }

  return (
    <div className="app">
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
          <ToastContainer />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
