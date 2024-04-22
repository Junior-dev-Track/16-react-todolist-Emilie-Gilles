import { useState } from "react";

function TodoList() {
  //useState permet de créer un état local
  //dans notre cas, on crée un état local qui est un tableau vide d'objets

  const [tasks, setTasks] = useState([]);
  //dans notre cas, on crée un état local qui est une chaine de caractères vide
  const [newTask, setNewTask] = useState("");
  //on initie un id à 0
  const [id, setId] = useState(0);

  //fonction qui permet d'ajouter une tâche
  function addTask() {
    //si la tâche est vide, on ne fait rien
    if (newTask === "") {
      return;
    }
    //on ajoute la tâche au tableau et on lui donne un id qui sera toujours unique
    setTasks([...tasks, { name: newTask, checked: false, id: id }]);
    //on incrémente l'id
    setId(id + 1);
    //on remet la tâche à vide
    setNewTask("");
  }

  //function pour si task.done est false, le bouton supprimer n'est pas cliquable
  function removeTask(id) {
    const newTasks = [...tasks];
    const task = newTasks.find((task) => task.id === id);
    // if (!task.checked) {
    //   return;
    // }
    const index = newTasks.indexOf(task);
    newTasks.splice(index, 1);
    setTasks(newTasks);
  }

  //fonction qui permet de cocher une tâche
  function checkTask(id) {
    const newTasks = [...tasks];
    const task = newTasks.find((task) => task.id === id);
    task.checked = !task.checked;
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

  //fonction pour modifier une tache en appuyant sur le bouton modifier, le span qui a ka classe taskName devient un input

  function modifyTask(id) {
    //on recupère la tâche à modifier
    const newTasks = [...tasks];
    const task = newTasks.find((task) => task.id === id);
    //on recupère l'index de la tâche à modifier
    const index = newTasks.indexOf(task);
    //on crée un input
    const input = document.createElement("input");
    //on lui donne la valeur de la tâche à modifier
    input.value = task.name;
    //on recupere le span qui a la classe taskName et dont l'index est celui de la tâche à modifier
    const span = document.querySelectorAll(".taskName")[index];
    //on remplace le span par l'input
    span.replaceWith(input);
    //on recupère le bouton modifier qui a l'index de la tâche à modifier
    const modifyBtn = input.nextElementSibling.children[0];
    //on change le texte du bouton modifier en valider
    modifyBtn.textContent = "Valider";
    //on ajoute un event listener sur le bouton valider
    modifyBtn.addEventListener("click", () => {
      //si l'input est vide, on ne fait rien
      if (input.value === "") {
        return;
      }
      //on remplace l'input par un span
      const newSpan = document.createElement("span");
      newSpan.textContent = input.value;
      input.replaceWith(newSpan);
      //on remet le texte du bouton valider en modifier
      modifyBtn.textContent = "Modifier";
      //on modifie la tâche dans le tableau
      task.name = input.value;
      //on remplace la tâche dans le tableau
      newTasks.splice(index, 1, task);
      //on remet à jour le tableau
      setTasks(newTasks);
    });
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
                onChange={() => checkTask(task.id)}
              />
              <span className="taskName">{task.name}</span>

              <div className="allTasks__tasksToDo__btns">
                <button onClick={() => modifyTask(task.id)}>Modifier</button>
                <button id="deleteBtn" onClick={() => removeTask(task.id)}>
                  Supprimer
                </button>
              </div>
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
              <span className="taskName">{task.name}</span>
              <button id="deleteBtn" onClick={() => removeTask(task.id)}>
                Supprimer
              </button>
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
          placeholder="Ajouter une tâche"
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.querySelector("button").click();
  }
});

export default TodoList;
