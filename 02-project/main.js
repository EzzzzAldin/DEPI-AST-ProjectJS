// Step 1 => (Data) Simulate API
const users = [
  {
    username: "Ezz Aldin",
    name: "Ezz Aldin Mohamed",
    role: "Full Stack Developer",
  },
  { username: "Omar", name: "Omar Mhamoud", role: "Full Stack Developer" },
  { username: "Sara", name: "Sara Adel", role: "Front-End Developer" },
  { username: "Omar74", name: "Omar Mhamoud", role: "Front-End Developer" },
];

let timeout = null;

// Step 2 => Elements
const usernameInput = document.querySelector("#usernameInput");
const resultBox = document.querySelector("#resultBox");

// Step 3 => Render OR Main Core Logic Task
const fetchUsers = (username) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (u) => u.username.toLocaleLowerCase() === username.toLocaleLowerCase(),
      );

      if (user) {
        resolve(user);
      } else {
        reject(new Error("User Not Found"));
      }
    }, 800);
  });
};

// Step 4 => States
function initialState() {
  resultBox.innerHTML = `<p class="result-box__hint" id="hintState" style="width: 100%">
          Search will start when you type
        </p>`;
}

function loading() {
  resultBox.innerHTML = `<div
          class="result-box__loading-wrapper"
          id="loadingState"
          style="width: 100%"
        >
          <div class="spinner"></div>
          <p class="result-box__loading">Searching for the user...</p>
        </div>`;
}

function userErr(msg) {
  resultBox.innerHTML = `<p class="result-box__error" id="errorState" style="width: 100%">
          ${msg}
        </p>`;
}

function showUser(user) {
  const avavterChar = user.name.charAt(0).toUpperCase();

  resultBox.innerHTML = `
        <div class="result-box__user" id="userState" style="width: 100%">
          <div class="avatar" id="userAvatar">${avavterChar}</div>

          <div>
            <p class="user-name" id="userName">${user.name}</p>
            <p class="user-meta" id="userRole">${user.role}</p>
          </div>
        </div>
    `;
}

// Step 5 => Events
usernameInput.addEventListener("input", (event) => {
  // Catch Value
  const value = event.target.value.trim();
  // mange Time
  clearTimeout(timeout);
  // Use All States
  if (value === "") {
    initialState();
    return;
  }

  timeout = setTimeout(() => {
    loading();

    fetchUsers(value)
      .then((user) => {
        showUser(user);
      })
      .catch((error) => {
        userErr(error.message);
      });
  }, 400);
});
