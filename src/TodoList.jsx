import { useState } from "react";

//fait un fonction TodoList qui retourne un composant react
//qui contient un input et un bouton
//et qui affiche une liste de tâches  sous forme de checkbox lorsqu'elles sont ajoutées
//et qui permet de les supprimer une fois cochées

function TodoList() {
  //useState permet de créer un état local
  //dans notre cas, on crée un état local qui est un tableau vide
  const [tasks, setTasks] = useState([]);
  //dans notre cas, on crée un état local qui est une chaine de caractères vide
  const [newTask, setNewTask] = useState("");

  //fonction qui permet d'ajouter une tâche
  function addTask() {
    //si la tâche est vide, on ne fait rien
    if (newTask === "") {
      return;
    }
    //on ajoute la tâche au tableau
    setTasks([...tasks, newTask]);
    //on remet la tâche à vide
    setNewTask("");
  }

  //fonction qui permet de supprimer une tâche
  function removeTask(index) {
    //on crée une copie du tableau
    const newTasks = [...tasks];
    //on supprime la tâche à l'index donné
    newTasks.splice(index, 1);
    //on met à jour le tableau
    setTasks(newTasks);
  }

  return (
    <div>
      <h1>Ma Todo List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(event) => setNewTask(event.target.value)}
      />
      <button onClick={addTask}>Ajouter</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input type="checkbox" />
            {task}
            <button onClick={() => removeTask(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
