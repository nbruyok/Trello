const modalClear = document.getElementById("modalClear");
const modalOverlay = document.getElementById("modalOverlay");
const modals = document.getElementById("modals");
const cardList = document.getElementById("cardList");
const newTaskButton = document.getElementById("new-task");
const newTaskModal = document.getElementById("newTask");
const usersSelector = document.getElementById("userNameSelect");
const submitButton = document.getElementById("buttonSubmit");
const titleInput = document.getElementById("titleInput");
const dateInput = document.getElementById("dateInput");
const descriptionInput = document.getElementById("descriptionInput");
const validIDs = ["todo", "inProgress", "done"];
const editTaskModal = document.getElementById("modal-edit-task");
const editTaskTextarea = document.getElementById("edit-textarea");
const submitEditedTaskButton = document.getElementById("submit-edit-button");
let parentId = null;
let tempIndex = 0;

function switchModal() {
  modalClear.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}

function switchNewTaskModal() {
  newTaskModal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}

function createTask() {
  const name = titleInput.value;
  const user = usersSelector.value;
  const date = new Date(dateInput.value).toDateString();
  const description = descriptionInput.value;
  let tasks = getTasks();
  if (!tasks) {
    tasks = [];
  }
  setTasks([...tasks, { name, user, date, description, status: "todo" }]);
  titleInput.value = "";
  usersSelector.selectedIndex = 0;
  dateInput.value = "";
  descriptionInput.value = "";
  switchNewTaskModal();
  createList();
}

function hasParent(element, classname) {
  if (element.className && element.className.split(" ").indexOf(classname) >= 0)
    return true;
  return element.parentNode && hasParent(element.parentNode, classname);
}

function getParentId(element) {
  if (validIDs.includes(element.id)) {
    return element.id;
  }
  return getParentId(element.parentNode);
}

cardList.addEventListener("click", function (event) {
  if (hasParent(event.target, "clear-button")) {
    switchModal();
    parentId = getParentId(event.target);
  }
});

modalClear.addEventListener("click", function (event) {
  if (
    event.target == "cancel-button" ||
    hasParent(event.target, "cancel-button")
  ) {
    switchModal();
  } else if (event.target.id == "buttonClearAll") {
    removeList(parentId);
    switchModal();
  }
});

newTaskButton.addEventListener("click", () => {
  if (Number.parseInt(todoCounter.innerHTML) === 6) {
    switchCounterValidationModal();
    return;
  }
  switchNewTaskModal();
});

newTaskModal.addEventListener("click", function (event) {
  if (
    event.target == "cancel-button" ||
    hasParent(event.target, "cancel-button")
  ) {
    switchNewTaskModal();
  }
});

submitButton.addEventListener("click", createTask);

const fetchUsers = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => json.map((user) => user.name))
    .then((names) =>
      names.forEach((name) => {
        const opt = document.createElement("option");
        opt.textContent = name;
        opt.value = name;
        usersSelector.appendChild(opt);
      })
    );
};

function openEditTaskModal(index) {
  tempIndex = index;
  editTaskModal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
  const tasks = getTasks();
  editTaskTextarea.value = tasks[index].description;
  setTasks(tasks);
  createList();
}

function submitEditedTask() {
  const index = tempIndex;
  const tasks = getTasks();
  let newTaskText = editTaskTextarea.value;
  tasks[index].description = newTaskText;
  setTasks(tasks);
  createList();
  modalOverlay.classList.toggle("closed");
  editTaskModal.classList.toggle("closed");
}

submitEditedTaskButton.addEventListener("click", submitEditedTask);

const counterValidationModal = document.getElementById(
  "counter-validation-modal"
);

counterValidationModal.addEventListener("click", function (event) {
  if (event.target.id == "button-ok") {
    switchCounterValidationModal();
  }
});

function switchCounterValidationModal() {
  counterValidationModal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}
