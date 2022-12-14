const todoCounter = document.getElementById("todoCounter");
const inProgressCounter = document.getElementById("inProgressCounter");
const doneCounter = document.getElementById("doneCounter");

const indexMapper = {
  todo: todoCounter,
  inProgress: inProgressCounter,
  done: doneCounter,
};

const createCard = (name, user, date, description, status, index) => {
  let nextStatus = "inProgress";
  let buttonName = "To In Progress";
  if (status === "inProgress") {
    nextStatus = "done";
    buttonName = "to Done";
  } else if (status === "done") {
    nextStatus = "todo";
    buttonName = "to ToDo";
  }

  return `
    <div class="task">
      <h3 class="task__title">${name}</h3>
            <div class="task__info">
              <h3 class="user__name">${user}</h3>
              ${
                date !== "Invalid Date"
                  ? `<p class="task__date">${date}</p>`
                  : ""
              }
            </div>

            <p class="task__text">${description}</p>

            <div class="task-buttons__container">
                ${`<button onclick='changeStatus(${index}, "${nextStatus}")' class='button button--green'>${buttonName}</button>`}

                ${
                  status === "todo"
                    ? `<button class="button button--blue" onclick="openEditTaskModal(${index})">
                  <span class="button__content"><img class="button__icon" src="./assets/icons/edit.svg" />Edit</span>
                </button>`
                    : ""
                }
              <button class="button button--red" onclick='deleteTask(${index})'>
                <span class="button__content"><img class="button__icon"
                    src="./assets/icons/bin-black.svg" />Delete</span>
              </button>
            </div >
        </div >
    `;
};

const changeStatus = (index, status) => {
  if (Number.parseInt(indexMapper[status].innerHTML) === 6) {
    switchCounterValidationModal();
    return;
  }

  const tasks = getTasks();
  tasks[index].status = status;
  setTasks(tasks);
  createList();
};

const deleteTask = (index) => {
  const tasks = getTasks();
  tasks.splice(index, 1);
  setTasks(tasks);
  createList();
};
