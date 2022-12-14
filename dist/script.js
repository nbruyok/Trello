const todoCounter=document.getElementById("todoCounter"),inProgressCounter=document.getElementById("inProgressCounter"),doneCounter=document.getElementById("doneCounter"),indexMapper={todo:todoCounter,inProgress:inProgressCounter,done:doneCounter},createCard=(t,e,s,n,a,o)=>{let d="inProgress",r="To In Progress";return"inProgress"===a?(d="done",r="to Done"):"done"===a&&(d="todo",r="to ToDo"),`
    <div class="task">
      <h3 class="task__title">${t}</h3>
            <div class="task__info">
              <h3 class="user__name">${e}</h3>
              ${"Invalid Date"!==s?`<p class="task__date">${s}</p>`:""}
            </div>

            <p class="task__text">${n}</p>

            <div class="task-buttons__container">
                ${`<button onclick='changeStatus(${o}, "${d}")' class='button button--green'>${r}</button>`}


                ${"todo"===a?`<button class="button button--blue" onclick="openEditTaskModal(${o})">
                  <span class="button__content"><img class="button__icon" src="./assets/icons/edit.svg" />Edit</span>
                </button>`:""}
              <button class="button button--red" onclick='deleteTask(${o})'>
                <span class="button__content"><img class="button__icon"
                    src="./assets/icons/bin-black.svg" />Delete</span>
              </button>
            </div >
        </div >

    `},changeStatus=(t,e)=>{if(6!==Number.parseInt(indexMapper[e].innerHTML)){const s=getTasks();s[t].status=e,setTasks(s),createList()}else switchCounterValidationModal()},deleteTask=t=>{const e=getTasks();e.splice(t,1),setTasks(e),createList()},todoTasks=document.getElementById("todoTasks"),inProgressTasks=document.getElementById("inProgressTasks"),doneTasks=document.getElementById("doneTasks"),createList=()=>{todoTasks.innerHTML="",inProgressTasks.innerHTML="",doneTasks.innerHTML="";const t=getTasks();var e,s,n=t.filter(t=>"todo"===t.status).length,a=t.filter(t=>"inProgress"===t.status).length,o=t.filter(t=>"done"===t.status).length;todoCounter.innerHTML=n,inProgressCounter.innerHTML=a,doneCounter.innerHTML=o;for([e,s]of t.entries()){var d=createCard(s.name,s.user,s.date,s.description,s.status,e);switch(s.status){case"todo":todoTasks.innerHTML+=d;break;case"inProgress":inProgressTasks.innerHTML+=d;break;case"done":doneTasks.innerHTML+=d}}},removeList=e=>{const t=getTasks();var s=t.filter(t=>t.status!==e);setTasks(s),createList()};window.onload=function(){fetchUsers(),createList()};const modalClear=document.getElementById("modalClear"),modalOverlay=document.getElementById("modalOverlay"),modals=document.getElementById("modals"),cardList=document.getElementById("cardList"),newTaskButton=document.getElementById("new-task"),newTaskModal=document.getElementById("newTask"),usersSelector=document.getElementById("userNameSelect"),submitButton=document.getElementById("buttonSubmit"),titleInput=document.getElementById("titleInput"),dateInput=document.getElementById("dateInput"),descriptionInput=document.getElementById("descriptionInput"),validIDs=["todo","inProgress","done"],editTaskModal=document.getElementById("modal-edit-task"),editTaskTextarea=document.getElementById("edit-textarea"),submitEditedTaskButton=document.getElementById("submit-edit-button");let parentId=null,tempIndex=0;function switchModal(){modalClear.classList.toggle("closed"),modalOverlay.classList.toggle("closed")}function switchNewTaskModal(){newTaskModal.classList.toggle("closed"),modalOverlay.classList.toggle("closed")}function createTask(){var t=titleInput.value,e=usersSelector.value,s=new Date(dateInput.value).toDateString(),n=descriptionInput.value;let a=getTasks();a=a||[],setTasks([...a,{name:t,user:e,date:s,description:n,status:"todo"}]),titleInput.value="",usersSelector.selectedIndex=0,dateInput.value="",descriptionInput.value="",switchNewTaskModal(),createList()}function hasParent(t,e){return!!(t.className&&0<=t.className.split(" ").indexOf(e))||t.parentNode&&hasParent(t.parentNode,e)}function getParentId(t){return validIDs.includes(t.id)?t.id:getParentId(t.parentNode)}cardList.addEventListener("click",function(t){hasParent(t.target,"clear-button")&&(switchModal(),parentId=getParentId(t.target))}),modalClear.addEventListener("click",function(t){"cancel-button"==t.target||hasParent(t.target,"cancel-button")?switchModal():"buttonClearAll"==t.target.id&&(removeList(parentId),switchModal())}),newTaskButton.addEventListener("click",()=>{(6!==Number.parseInt(todoCounter.innerHTML)?switchNewTaskModal:switchCounterValidationModal)()}),newTaskModal.addEventListener("click",function(t){"cancel-button"!=t.target&&!hasParent(t.target,"cancel-button")||switchNewTaskModal()}),submitButton.addEventListener("click",createTask);const fetchUsers=()=>{fetch("https://jsonplaceholder.typicode.com/users").then(t=>t.json()).then(t=>t.map(t=>t.name)).then(t=>t.forEach(t=>{const e=document.createElement("option");e.textContent=t,e.value=t,usersSelector.appendChild(e)}))};function openEditTaskModal(t){tempIndex=t,editTaskModal.classList.toggle("closed"),modalOverlay.classList.toggle("closed");var e=getTasks();editTaskTextarea.value=e[t].description,setTasks(e),createList()}function submitEditedTask(){var t=tempIndex;const e=getTasks();var s=editTaskTextarea.value;e[t].description=s,setTasks(e),createList(),modalOverlay.classList.toggle("closed"),editTaskModal.classList.toggle("closed")}submitEditedTaskButton.addEventListener("click",submitEditedTask);const counterValidationModal=document.getElementById("counter-validation-modal");function switchCounterValidationModal(){counterValidationModal.classList.toggle("closed"),modalOverlay.classList.toggle("closed")}counterValidationModal.addEventListener("click",function(t){"button-ok"==t.target.id&&switchCounterValidationModal()});const setTasks=t=>{localStorage.setItem("tasks",JSON.stringify(t))},getTasks=()=>{try{return JSON.parse(localStorage.getItem("tasks"))}catch(t){return console.error("Failed to parse tasks"),[]}};
