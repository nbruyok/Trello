const setTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getTasks = () => {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks;
  } catch (e) {
    console.error("Failed to parse tasks");
    return [];
  }
};
