let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function priority(deadline) {

    let d = new Date(deadline);
    let t = new Date();

    let diff =
    Math.ceil(
        (d - t) /
        (1000 * 60 * 60 * 24)
    );

    if (diff <= 3) return "high";
    if (diff <= 7) return "medium";

    return "low";
}

function status(task) {

    if (task.completed)
        return "SELESAI";

    if (
        new Date(task.deadline)
        <
        new Date()
    )
        return "TERLAMBAT";

    return "BELUM";
}

function addTask() {

    const title =
    document.getElementById("title").value;

    const subject =
    document.getElementById("subject").value;

    const teacher =
    document.getElementById("teacher").value;

    const deadline =
    document.getElementById("deadline").value;

    if (
        !title ||
        !subject ||
        !teacher ||
        !deadline
    ) {
        alert("Lengkapi semua data!");
        return;
    }

    tasks.push({

        id: Date.now(),

        title,
        subject,
        teacher,
        deadline,

        completed: false,
        completedAt: ""

    });

    save();
    render();

    document.getElementById("title").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("teacher").value = "";
    document.getElementById("deadline").value = "";
}

function toggle(i) {

    if (tasks[i].completed)
        return;

    let history =
    JSON.parse(
        localStorage.getItem("history")
    ) || [];

    tasks[i].completed = true;

    tasks[i].completedAt =
    new Date().toLocaleString("id-ID");

    history.push({

        title: tasks[i].title,
        subject: tasks[i].subject,
        teacher: tasks[i].teacher,
        completedAt: tasks[i].completedAt

    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    save();
    render();
}

function delTask(i) {

    if (
        confirm(
            "Hapus tugas ini?"
        )
    ) {

        tasks.splice(i, 1);

        save();
        render();
    }
}

function editTask(i) {

    let t = tasks[i];

    let title =
    prompt(
        "Judul Tugas",
        t.title
    );

    let subject =
    prompt(
        "Mata Pelajaran",
        t.subject
    );

    let teacher =
    prompt(
        "Guru",
        t.teacher
    );

    let deadline =
    prompt(
        "Deadline",
        t.deadline
    );

    if (title)
        t.title = title;

    if (subject)
        t.subject = subject;

    if (teacher)
        t.teacher = teacher;

    if (deadline)
        t.deadline = deadline;

    save();
    render();
}

function render() {

    let list =
    document.getElementById(
        "taskList"
    );

    list.innerHTML = "";

    if (tasks.length === 0) {

        list.innerHTML =

        `
        <div class="empty">
            Belum ada tugas
        </div>
        `;

        return;
    }

    tasks.forEach((t, i) => {

        list.innerHTML +=

        `
        <div class="task">

            <h3>
                ${t.title}
            </h3>

            <p>
                📚 ${t.subject}
                |
                👨‍🏫 ${t.teacher}
            </p>

            <p>
                📅 ${t.deadline}
            </p>

            <span class="badge ${priority(t.deadline)}">
                ${priority(t.deadline).toUpperCase()}
            </span>

            <p>
                Status:
                ${status(t)}
            </p>

            ${
                t.completed
                ?

                `
                <p class="done-info">
                ✅ Selesai pada
                ${t.completedAt}
                </p>
                `

                :

                ''
            }

            <div class="btns">

                <button
                class="done"
                onclick="toggle(${i})">

                Selesai

                </button>

                <button
                class="edit"
                onclick="editTask(${i})">

                Edit

                </button>

                <button
                class="del"
                onclick="delTask(${i})">

                Hapus

                </button>

            </div>

        </div>
        `;
    });
}

render();