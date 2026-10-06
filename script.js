function makeGreeting(name) {
  return "Hello, " + name + "!";
}

function calculateTotal(price, quantity) {
  return price * quantity;
}

const formatPrice = (total) => "$" + total.toFixed(2);

const priceForm = document.querySelector("#price-form");
const priceResult = document.querySelector("#price-result");

priceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.querySelector("#customer-name").value.trim();
  const price = Number(document.querySelector("#item-price").value);
  const quantity = Number(document.querySelector("#item-quantity").value);

  if (price < 0 || quantity < 1) {
    priceResult.textContent = "Enter a price of zero or more and at least one item.";
    return;
  }

  const total = calculateTotal(price, quantity);
  priceResult.textContent = makeGreeting(name) + " Your total is " + formatPrice(total) + ".";
});

let studentNames = ["Asha", "Ben", "Mina", "Leo"];
const studentList = document.querySelector("#student-list");
const arraySummary = document.querySelector("#array-summary");
const arrayResult = document.querySelector("#array-result");

function renderStudents() {
  studentList.innerHTML = "";

  studentNames.forEach(function (name) {
    const listItem = document.createElement("li");
    listItem.textContent = name;
    studentList.appendChild(listItem);
  });

  if (studentNames.length > 0) {
    arraySummary.textContent = "First student (index 0): " + studentNames[0] + " · " + studentNames.length + " students";
  } else {
    arraySummary.textContent = "The student list is empty.";
  }
}

document.querySelector("#student-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const studentInput = document.querySelector("#new-student");
  const newName = studentInput.value.trim();

  if (newName !== "") {
    studentNames.push(newName);
    studentInput.value = "";
    arrayResult.textContent = newName + " was added with push().";
    renderStudents();
  }
});

document.querySelector("#update-student").addEventListener("click", function () {
  if (studentNames.length === 0) {
    arrayResult.textContent = "Add a student before renaming the first one.";
    return;
  }

  studentNames[0] = studentNames[0] + " (updated)";
  arrayResult.textContent = "Updated the first item in the array.";
  renderStudents();
});

document.querySelector("#remove-student").addEventListener("click", function () {
  if (studentNames.length === 0) {
    arrayResult.textContent = "There are no students to remove.";
    return;
  }

  const removedName = studentNames.pop();
  arrayResult.textContent = removedName + " was removed with pop().";
  renderStudents();
});

document.querySelector("#sort-students").addEventListener("click", function () {
  const sortedNames = studentNames.slice().sort();
  arrayResult.textContent = "A–Z using slice() and sort(): " + (sortedNames.join(", ") || "No students yet.");
});

renderStudents();

const teamMembers = [
  { name: "Maya Chen", role: "Designer", department: "Creative", temporaryNote: "New team member" },
  { name: "Noah Patel", role: "Developer", department: "Technology" },
  { name: "Zara Ali", role: "Coordinator", department: "Operations" }
];
const teamList = document.querySelector("#team-list");
const objectResult = document.querySelector("#object-result");

function renderTeamMembers() {
  teamList.innerHTML = "";

  teamMembers.forEach(function (member) {
    const card = document.createElement("article");
    card.className = "object-card";

    const name = document.createElement("h3");
    name.textContent = member.name;
    card.appendChild(name);

    Object.entries(member).forEach(function (entry) {
      if (entry[0] !== "name") {
        const property = document.createElement("p");
        const label = document.createElement("strong");
        label.textContent = entry[0] + ": ";
        property.append(label, document.createTextNode(entry[1]));
        card.appendChild(property);
      }
    });

    teamList.appendChild(card);
  });
}

document.querySelector("#update-role").addEventListener("click", function () {
  teamMembers[0].role = "Lead Designer";
  objectResult.textContent = "Updated Maya's role property.";
  renderTeamMembers();
});

document.querySelector("#add-property").addEventListener("click", function () {
  teamMembers[0].status = "Available";
  objectResult.textContent = "Added a status property to Maya's object.";
  renderTeamMembers();
});

document.querySelector("#remove-property").addEventListener("click", function () {
  if ("temporaryNote" in teamMembers[0]) {
    delete teamMembers[0].temporaryNote;
    objectResult.textContent = "Removed Maya's temporaryNote property with delete.";
  } else if ("status" in teamMembers[0]) {
    delete teamMembers[0].status;
    objectResult.textContent = "Removed Maya's status property with delete.";
  } else {
    objectResult.textContent = "Maya has no extra property to remove.";
  }
  renderTeamMembers();
});

renderTeamMembers();

const domMessage = document.querySelector("#dom-message");
document.querySelector("#change-text").addEventListener("click", function () {
  domMessage.textContent = "JavaScript changed this text with textContent.";
});

document.querySelector("#change-html").addEventListener("click", function () {
  domMessage.innerHTML = "This word is <strong>bold</strong> using innerHTML.";
});

document.querySelector("#change-style").addEventListener("click", function () {
  domMessage.classList.toggle("is-highlighted");
});

document.querySelector("#add-note").addEventListener("click", function () {
  const noteArea = document.querySelector("#note-area");
  if (noteArea.children.length === 0) {
    const note = document.createElement("p");
    note.textContent = "This note was created with createElement() and added to the page.";
    noteArea.appendChild(note);
  }
});

document.querySelector("#remove-note").addEventListener("click", function () {
  const noteArea = document.querySelector("#note-area");
  if (noteArea.firstElementChild) {
    noteArea.firstElementChild.remove();
  }
});

document.querySelector("#event-input").addEventListener("input", function (event) {
  const preview = document.querySelector("#input-preview");
  preview.textContent = event.target.value === "" ? "Your live preview appears here." : "You typed: " + event.target.value;
});

document.querySelector("#color-select").addEventListener("change", function (event) {
  const colorPreview = document.querySelector("#color-preview");
  colorPreview.className = "color-preview";
  if (event.target.value !== "teal") {
    colorPreview.classList.add(event.target.value);
  }
  colorPreview.textContent = "You selected " + event.target.value + ".";
});

const hoverTarget = document.querySelector("#hover-target");
hoverTarget.addEventListener("mouseenter", function () {
  hoverTarget.classList.add("is-hovered");
  document.querySelector("#mouse-result").textContent = "Mouse entered the box.";
});
hoverTarget.addEventListener("mouseleave", function () {
  hoverTarget.classList.remove("is-hovered");
  document.querySelector("#mouse-result").textContent = "Mouse left the box.";
});

document.querySelector("#keyboard-input").addEventListener("keydown", function (event) {
  document.querySelector("#keyboard-result").textContent = "You pressed: " + event.key;
});

let tasks = [];
let nextTaskId = 1;
const todoList = document.querySelector("#todo-list");
const todoEmpty = document.querySelector("#todo-empty");
const taskCount = document.querySelector("#task-count");

function renderTasks() {
  todoList.innerHTML = "";
  todoEmpty.hidden = tasks.length > 0;
  taskCount.textContent = tasks.length + (tasks.length === 1 ? " ITEM" : " ITEMS");

  tasks.forEach(function (task) {
    const listItem = document.createElement("li");
    listItem.className = task.completed ? "todo-item is-complete" : "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Complete " + task.text);
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const taskText = document.createElement("span");
    taskText.className = "todo-text";
    taskText.textContent = task.text;

    const removeButton = document.createElement("button");
    removeButton.className = "delete-task";
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", "Remove " + task.text);
    removeButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });
      renderTasks();
    });

    listItem.append(checkbox, taskText, removeButton);
    todoList.appendChild(listItem);
  });
}

document.querySelector("#todo-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const todoInput = document.querySelector("#todo-input");
  const taskText = todoInput.value.trim();

  if (taskText !== "") {
    tasks.push({ id: nextTaskId, text: taskText, completed: false });
    nextTaskId += 1;
    todoInput.value = "";
    renderTasks();
    todoInput.focus();
  }
});

renderTasks();