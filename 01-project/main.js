// Simulate DB
let skills = [];
// Simulate ID
let nextId = 1;

// Get All Elements
const addForm = document.querySelector("#addForm");
const skillInput = document.querySelector("#skillInput");
const emptyState = document.querySelector("#emptyState");
const tagsList = document.querySelector("#tagsList");
const countLabel = document.querySelector("#countLabel");

// Render
function render() {
  tagsList.innerHTML = "";
  emptyState.style.display = skills.length === 0 ? "block" : "none";

  skills.forEach((skill) => {
    // Skill
    const li = document.createElement("li");
    const name = document.createElement("span");
    const btnRemove = document.createElement("button");

    li.className = "tag";
    li.dataset.id = skill.id;
    name.textContent = skill.name;

    btnRemove.className = "tag__remove";
    btnRemove.type = "button";
    btnRemove.setAttribute("aria-label", "delete");
    btnRemove.textContent = "X";

    li.append(name, btnRemove);
    tagsList.appendChild(li);
  });

  countLabel.textContent = skills.length;
}

// Add New Skill
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Get Value
  const value = skillInput.value.trim();
  // Check Value
  if (value === "") return;
  // Add Skill To Skills
  skills.push({
    id: nextId++,
    name: value,
  });

  skillInput.value = "";
  skillInput.focus();
  // Call Render
  render();
});

// Delete Skill
tagsList.addEventListener("click", (event) => {
  if (!event.target.classList.contains("tag__remove")) return;

  const li = event.target.closest(".tag");

  const itemRemove = Number(li.dataset.id);

  skills = skills.filter((skill) => skill.id !== itemRemove);

  render();
});

// Initial State
render();
