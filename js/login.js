document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            alert("No registered user found. Please register first.");
            window.location.href = "register.html";
            return;
        }

        if (
            username === savedUser.username &&
            password === savedUser.password
        ) {

            // Login Status Save
            localStorage.setItem("isLoggedIn", "true");

            alert("Login Successful!");

            window.location.href = "dashboard.html";

        } else {

            alert("Invalid Username or Password");

        }

    });

});