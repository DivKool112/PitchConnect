import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeFirebase();
});

window.expandBlock = function (block) {
  const moreInfo = block.querySelector(".more-info");
  moreInfo.style.display =
    moreInfo.style.display === "block" ? "none" : "block";
};

window.showConnectForm = function (event, button) {
  event.stopPropagation(); // Prevents the event from bubbling up to the competition block
  const connectForm = button.nextElementSibling;
  connectForm.style.display = "block";
};

window.save = function (competition) {
  console.log(`Saving data for competition: ${competition}`);

  const suffix = competition.slice(-1);
  const name = document.getElementById(`name${suffix}`).value;
  const email = document.getElementById(`email${suffix}`).value;
  const phone = document.getElementById(`phone${suffix}`).value;
  const grade = document.getElementById(`grade${suffix}`).value;
  const skills = document.getElementById(`skills${suffix}`).value;

  console.log(
    `Collected data - Name: ${name}, Email: ${email}, Phone: ${phone}, Grade: ${grade}, Skills: ${skills}`
  );

  const database = getDatabase();
  set(ref(database, `${competition}/${phone}`), {
    name: name,
    email: email,
    phone: phone,
    grade: grade,
    skills: skills,
  })
    .then(() => {
      console.log("Data saved successfully!");
      read(competition);
    })
    .catch((error) => {
      console.error("Error saving data:", error);
    });
};

function read(competition) {
  console.log(`Reading data for competition: ${competition}`);
  const suffix = competition.slice(-1);
  const database = getDatabase();
  const competitionRef = ref(database, competition);

  onValue(
    competitionRef,
    (snapshot) => {
      const userListTable = document
        .getElementById(`userListTable${suffix}`)
        .getElementsByTagName("tbody")[0];
      userListTable.innerHTML = "";

      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = childData.name;
        row.appendChild(nameCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = childData.email;
        row.appendChild(emailCell);

        const phoneCell = document.createElement("td");
        phoneCell.textContent = childData.phone;
        row.appendChild(phoneCell);

        const gradeCell = document.createElement("td");
        gradeCell.textContent = childData.grade;
        row.appendChild(gradeCell);

        const skillsCell = document.createElement("td");
        skillsCell.textContent = childData.skills;
        row.appendChild(skillsCell);

        userListTable.appendChild(row);
      });
    },
    (error) => {
      console.error("Error reading data:", error);
    }
  );
}

function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyBTyd9FxXmB4Yxu9cQduwpcXIoXAcKy9Do",
    authDomain: "pitchconnect-19ab4.firebaseapp.com",
    databaseURL: "https://pitchconnect-19ab4-default-rtdb.firebaseio.com",
    projectId: "pitchconnect-19ab4",
    storageBucket: "pitchconnect-19ab4.appspot.com",
    messagingSenderId: "996821724172",
    appId: "1:996821724172:web:d02e54d4291ecdd5f69229",
    measurementId: "G-FS420KB3B4",
  };

  initializeApp(firebaseConfig);
  console.log("Firebase initialized");

  // Read data for all competitions on load
  const competitions = [
    "competition1",
    "competition2",
    "competition3",
    "competition4",
    "competition5",
  ];
  competitions.forEach((competition) => {
    read(competition);
  });
}
