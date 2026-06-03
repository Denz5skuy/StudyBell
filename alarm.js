let alarms =
JSON.parse(
localStorage.getItem("alarms")
) || [];

/* =====================
   MODAL
===================== */

function openModal(){

    document
    .getElementById("modal")
    .style.display = "flex";

}

function closeModal(){

    document
    .getElementById("modal")
    .style.display = "none";

}

/* =====================
   TAMPILKAN HARI
===================== */

function toggleDays(){

    const repeat =
    document
    .getElementById("repeat")
    .value;

    const daysBox =
    document
    .getElementById("daysBox");

    if(repeat === "custom"){

        daysBox.style.display =
        "flex";

    }else{

        daysBox.style.display =
        "none";

        document
        .querySelectorAll(
            "#daysBox input"
        )
        .forEach(cb=>{
            cb.checked = false;
        });

    }
}

/* =====================
   AMBIL HARI
===================== */

function getSelectedDays(){

    let days = [];

    document
    .querySelectorAll(
        "#daysBox input:checked"
    )
    .forEach(day=>{

        days.push(
            day.value
        );

    });

    return days;
}

/* =====================
   SIMPAN
===================== */

function saveData(){

    localStorage.setItem(
        "alarms",
        JSON.stringify(alarms)
    );

}

/* =====================
   TAMBAH ALARM
===================== */

function addAlarm(){

    const subject =
    document
    .getElementById("subject")
    .value
    .trim();

    const task =
    document
    .getElementById("task")
    .value
    .trim();

    const hour =
    parseInt(
        document
        .getElementById("hour")
        .value
    );

    const minute =
    parseInt(
        document
        .getElementById("minute")
        .value
    );

    const period =
    document
    .getElementById("period")
    .value;

    const repeat =
    document
    .getElementById("repeat")
    .value;

    if(!subject || !task){

        alert(
        "Lengkapi data"
        );

        return;
    }

    if(
        isNaN(hour) ||
        hour < 1 ||
        hour > 12
    ){

        alert(
        "Jam harus 1-12"
        );

        return;
    }

    if(
        isNaN(minute) ||
        minute < 0 ||
        minute > 59
    ){

        alert(
        "Menit harus 0-59"
        );

        return;
    }

    const days =
    getSelectedDays();

    if(
        repeat === "custom" &&
        days.length === 0
    ){

        alert(
        "Pilih minimal 1 hari"
        );

        return;
    }

    alarms.push({

        id: Date.now(),

        subject,

        task,

        time:
        String(hour)
        .padStart(2,"0")

        +

        ":"

        +

        String(minute)
        .padStart(2,"0"),

        period,

        repeat,

        days,

        active:true

    });

    saveData();

    renderAlarms();

    clearForm();

    closeModal();
}

/* =====================
   RESET FORM
===================== */

function clearForm(){

    document
    .getElementById("subject")
    .value = "";

    document
    .getElementById("task")
    .value = "";

    document
    .getElementById("hour")
    .value = "";

    document
    .getElementById("minute")
    .value = "";

    document
    .getElementById("repeat")
    .value = "daily";

    toggleDays();
}

/* =====================
   ON OFF SWITCH
===================== */

function toggleAlarm(id){

    alarms.forEach(alarm=>{

        if(
            alarm.id === id
        ){

            alarm.active =
            !alarm.active;

        }

    });

    saveData();
    renderAlarms();
}

/* =====================
   HAPUS
===================== */

function deleteAlarm(id){

    if(
        !confirm(
        "Hapus alarm?"
        )
    ){
        return;
    }

    alarms =
    alarms.filter(
        alarm =>
        alarm.id !== id
    );

    saveData();

    renderAlarms();
}

/* =====================
   FILTER
===================== */

let currentTab =
"all";

document
.querySelectorAll(".tab")
.forEach((tab,index)=>{

    tab.addEventListener(
    "click",
    ()=>{

        document
        .querySelectorAll(".tab")
        .forEach(t=>
            t.classList.remove(
            "active"
            )
        );

        tab.classList.add(
        "active"
        );

        currentTab =
        index === 0
        ? "all"
        : "active";

        renderAlarms();

    });

});

/* =====================
   RENDER
===================== */

function renderAlarms(){

    const list =
    document
    .getElementById(
        "alarmList"
    );

    list.innerHTML = "";

    let data =
    alarms;

    if(
        currentTab ===
        "active"
    ){

        data =
        alarms.filter(
            alarm =>
            alarm.active
        );

    }

    if(
        data.length === 0
    ){

        list.innerHTML = `

        <div
        class="alarm-card">

            <p
            style="
            text-align:center;
            color:#777;">

            Belum ada alarm

            </p>

        </div>

        `;

        return;
    }

    data.forEach(alarm=>{

        list.innerHTML += `

        <div class="alarm-card">

            <div class="alarm-top">

                <div>

                    <div
                    class="alarm-title">

                    ${alarm.subject}

                    </div>

                    <div
                    class="alarm-task">

                    ${alarm.task}

                    </div>

                    <div
                    class="alarm-time">

                    ⏰
                    ${alarm.time}
                    ${alarm.period}

                    </div>

                    <div
                    class="alarm-days">

                    ${
                        alarm.repeat
                        === "daily"

                        ? "Setiap Hari"

                        : alarm.days.join(
                            ", "
                        )
                    }

                    </div>

                </div>

                <label
                class="switch">

                    <input
                    type="checkbox"

                    ${
                        alarm.active
                        ? "checked"
                        : ""
                    }

                    onchange="
                    toggleAlarm(
                    ${alarm.id}
                    )
                    ">

                    <span
                    class="slider">

                    </span>

                </label>

            </div>

            <button

            class="delete-btn"

            onclick="
            deleteAlarm(
            ${alarm.id}
            )
            ">

            Hapus

            </button>

        </div>

        `;

    });

}

/* =====================
   LOAD
===================== */

toggleDays();
renderAlarms();