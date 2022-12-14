const todoTasks = document.getElementById("todoTasks");
const inProgressTasks = document.getElementById("inProgressTasks");
const doneTasks = document.getElementById("doneTasks");

const createList = () => {
  todoTasks.innerHTML = "";
  inProgressTasks.innerHTML = "";
  doneTasks.innerHTML = "";
  const tasks = getTasks();
  const todoTasksNumber = tasks.filter((task) => task.status === "todo").length;
  const inProgressTasksNumber = tasks.filter(
    (task) => task.status === "inProgress"
  ).length;
  const doneTasksNumber = tasks.filter((task) => task.status === "done").length;

  todoCounter.innerHTML = todoTasksNumber;
  inProgressCounter.innerHTML = inProgressTasksNumber;
  doneCounter.innerHTML = doneTasksNumber;

  for (const [index, task] of tasks.entries()) {
    const card = createCard(
      task.name,
      task.user,
      task.date,
      task.description,
      task.status,
      index
    );
    switch (task.status) {
      case "todo":
        todoTasks.innerHTML += card;
        break;
      case "inProgress":
        inProgressTasks.innerHTML += card;
        break;
      case "done":
        doneTasks.innerHTML += card;
        break;
      default:
        break;
    }
  }
};

const removeList = (status) => {
  const tasks = getTasks();
  const newTasks = tasks.filter((task) => task.status !== status);
  setTasks(newTasks);
  createList();
};
