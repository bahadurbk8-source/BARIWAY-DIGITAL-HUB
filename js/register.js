document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");

    if (!registerForm) return;

    registerForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const username = document.getElementById("regUsername").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (localStorage.getItem("user")) {
            alert("An account already exists. Please login.");
            window.location.href = "login.html";
            return;
        }

        const user = {
            username,
            email,
            password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration successful!");

        registerForm.reset();

        window.location.href = "login.html";

    });

});