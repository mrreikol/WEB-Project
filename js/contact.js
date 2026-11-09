const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const success = document.getElementById("contact-success");

const fields = [nameInput, emailInput, phoneInput, messageInput];

function showError(field, text) {
    const error = document.getElementById(field.id + "-error");
    field.classList.toggle("is-invalid", text !== "");
    field.setAttribute("aria-invalid", String(text !== ""));
    error.textContent = text;
    error.hidden = text === "";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneDigits = phone.replace(/\D/g, "");
    const phoneIsValid = phone === "" ||
        (/^\+?[\d()\s-]+$/.test(phone) && phoneDigits.length >= 7 && phoneDigits.length <= 15);

    showError(nameInput, name ? "" : "Enter your name.");
    showError(emailInput, emailIsValid ? "" : "Enter a valid email address.");
    showError(phoneInput, phoneIsValid ? "" : "Enter a valid phone number.");
    showError(messageInput, message.length >= 10 ? "" : "Enter at least 10 characters.");

    const firstInvalid = form.querySelector(".is-invalid");
    success.hidden = firstInvalid !== null;

    if (firstInvalid) {
        firstInvalid.focus();
    }
});

form.addEventListener("input", function () {
    success.hidden = true;
});

form.addEventListener("reset", function () {
    for (const field of fields) {
        showError(field, "");
    }

    success.hidden = true;
});