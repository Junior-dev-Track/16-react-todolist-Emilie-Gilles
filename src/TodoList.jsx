import { useState } from "react";

function TodoList() {
  //useState permet de créer un état local
  //dans notre cas, on crée un état local qui est un tableau vide d'objets

  const [tasks, setTasks] = useState([]);
  //dans notre cas, on crée un état local qui est une chaine de caractères vide
  const [newTask, setNewTask] = useState("");

  //fonction qui permet d'ajouter une tâche
  function addTask() {
    //si la tâche est vide, on ne fait rien
    if (newTask === "") {
      return;
    }
    //on ajoute la tâche au tableau et on lui donne un id
    setTasks([...tasks, { id: tasks.length, name: newTask, checked: false }]);
    //on remet la tâche à vide
    setNewTask("");
  }

  //function pour si task.done est false, le bouton supprimer n'est pas cliquable
  function removeTask(index) {
    const newTasks = [...tasks];
    if (newTasks[index].checked === false) {
      return;
    }
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  //fonction qui permet de cocher une tâche
  function checkTask(index) {
    //on crée une copie du tableau
    const newTasks = [...tasks];
    //on coche la tâche à l'index donné
    newTasks[index].checked = !newTasks[index].checked;
    //on met à jour le tableau
    setTasks(newTasks);
  }

  //fonction remainTask qui permet de compter le nombre de tâches restantes et de les afficher dans une div
  function remainTask(tasks) {
    const remain = tasks.filter((task) => !task.checked).length;
    return (
      <div className="toDoList__remainTasks">
        Il reste {remain} tâches à accomplir
      </div>
    );
  }

  //fonction pour modifier une tache en appuyant sur le bouton modifier le texte de la tache s'affiche dans une nouvelle input
  function modifyTask(index) {
    const newTasks = [...tasks];
    const task = newTasks[index];
    const newName = prompt("Modifier la tâche", task.name);
    if (newName === null) {
      return;
    }
    task.name = newName;
    setTasks(newTasks);
  }

  //function pour afficher les taches à faire sous forme de liste si task.done est false

  function tasksToDo() {
    const newTasks = [...tasks];
    const tasksToDo = newTasks.filter((task) => !task.checked);
    return (
      <div className="allTasks__tasksToDo">
        <h2>Tâches à faire</h2>
        <ul>
          {tasksToDo.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.checked}
                onChange={() => checkTask(index)}
              />
              {task.name}
              <button onClick={() => removeTask(index)}>Supprimer</button>
              <button onClick={() => modifyTask(index)}>Modifier</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  //function pour afficher les taches termnées sous forme de liste
  function doneTask() {
    const newTasks = [...tasks];
    const doneTasks = newTasks.filter((task) => task.checked);
    return (
      <div className="allTasks__tasksDone">
        <h2>Tâches terminées</h2>
        <ul>
          {doneTasks.map((task, index) => (
            <li key={index}>
              {task.name}
              <button onClick={() => removeTask(index)}>Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section className="toDoList">
      <div className="toDoList__input">
        <input
          type="text"
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button onClick={addTask}>Ajouter</button>
      </div>

      {remainTask(tasks)}
      <div className="allTasks">
        {tasksToDo()}
        {doneTask()}
      </div>
    </section>
  );
}

export default TodoList;
