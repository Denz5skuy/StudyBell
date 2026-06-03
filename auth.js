const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!name || !email || !password || !confirmPassword) {
            alert("Semua data wajib diisi!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Konfirmasi password tidak cocok!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userExist = users.find(
            user => user.email === email
        );

        if (userExist) {
            alert("Email sudah terdaftar!");
            return;
        }

        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Akun berhasil dibuat!");

        window.location.href = "index.html";
    });
}



if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            u =>
            u.email === email &&
            u.password === password
        );

        if (!user) {
            alert("Email atau password salah!");
            return;
        }

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        alert("Login berhasil!");

        window.location.href = "dashboard.html";
    });
}
