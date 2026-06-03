const history =
JSON.parse(localStorage.getItem("history")) || [];

const activities =
JSON.parse(localStorage.getItem("activities")) || [];

const container =
document.getElementById("historyContainer");

const doneTab =
document.getElementById("doneTab");

const activityTab =
document.getElementById("activityTab");

function renderHistory(){

    container.innerHTML = "";

    if(history.length === 0){

        container.innerHTML = `
        <div class="history-item">
            <div class="history-content">
                <h3>Belum ada tugas selesai</h3>
            </div>
        </div>
        `;
        return;
    }

    history
    .slice()
    .reverse()
    .forEach(task=>{

        container.innerHTML += `
        <div class="history-item">

            <div class="history-icon">
                <i class="fa-solid fa-circle-check"></i>
            </div>

            <div class="history-content">

                <h3>${task.title}</h3>

                <div class="teacher">
                    ${task.teacher}
                </div>

                <div class="date">
                    Selesai pada ${task.completedAt}
                </div>

            </div>

        </div>
        `;
    });
}

function renderActivities(){

    container.innerHTML = "";

    if(activities.length === 0){

        container.innerHTML = `
        <div class="activity-item">
            <h4>Belum ada aktivitas</h4>
        </div>
        `;
        return;
    }

    activities
    .slice()
    .reverse()
    .forEach(item=>{

        container.innerHTML += `
        <div class="activity-item">

            <h4>${item.text}</h4>

            <p>${item.time}</p>

        </div>
        `;
    });
}

doneTab.addEventListener("click",()=>{

    doneTab.classList.add("active");
    activityTab.classList.remove("active");

    renderHistory();
});

activityTab.addEventListener("click",()=>{

    activityTab.classList.add("active");
    doneTab.classList.remove("active");

    renderActivities();
});

renderHistory();