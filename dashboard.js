const user = JSON.parse(localStorage.getItem("loggedInUser"));

if(!user){
  window.location.href = "login.html";
}

document.getElementById("greeting").innerHTML = `Hai, ${user.name} 👋`;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderDashboard(){

  const taskContainer = document.getElementById("taskContainer");

  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);
  const late = tasks.filter(t => !t.completed && new Date(t.deadline) < new Date());

  document.getElementById("pendingCount").innerText = pending.length;
  document.getElementById("completedCount").innerText = completed.length;
  document.getElementById("lateCount").innerText = late.length;

  // 🔥 DEADLINE TERDEKAT (FIX + GURU + STATUS)
  const nearest = pending.sort((a,b)=> new Date(a.deadline)-new Date(b.deadline))[0];

  if(nearest){
    document.getElementById("deadlineContent").innerHTML = `
      <h3>${nearest.title}</h3>
      <p>👨‍🏫 ${nearest.teacher}</p>
      <p>📅 ${nearest.deadline}</p>
      <p>Status: ${new Date(nearest.deadline) < new Date() ? "TERLAMBAT" : "BELUM"}</p>
    `;
  }

  // 🔥 TASK MENDATANG (FIX FULL)
  taskContainer.innerHTML = "";

  tasks.slice(0,3).forEach(t=>{

    let status =
      t.completed ? "SELESAI"
      : new Date(t.deadline) < new Date()
      ? "TERLAMBAT"
      : "BELUM";

    taskContainer.innerHTML += `
      <div class="task-item">

        <div class="task-info">

          <h4>${t.title}</h4>
          <p>👨‍🏫 ${t.teacher}</p>
          <p>${t.deadline}</p>
          <p>Status: ${status}</p>

        </div>

      </div>
    `;
  });

}

renderDashboard();