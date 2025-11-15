// js/main.js

const THEME_KEY = "fanpage_theme";
let currentTheme = "dark";

// Inicialización cuando el DOM está listo
$(function () {
    loadPreferences();
    setupThemeToggle();
    setupContactForm();
});

// Cargar preferencias guardadas
function loadPreferences() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
        currentTheme = savedTheme;
    }
    applyTheme();
}

// Aplicar tema
function applyTheme() {
    if (currentTheme === "light") {
        $("body").addClass("light-theme");
    } else {
        $("body").removeClass("light-theme");
    }
}

// Configurar toggle del modo oscuro
function setupThemeToggle() {
    $("#theme-toggle").on("click", function () {
        currentTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem(THEME_KEY, currentTheme);
        applyTheme();
        $(this).text(currentTheme === "dark" ? "" : "");
    });
}

// Configurar validación del formulario
function setupContactForm() {
    const form = $("#contact-form");
    
    if (form.length === 0) return;

    // Botón limpiar
    $("#clear-btn").on("click", function () {
        form[0].reset();
        $(".error-message").text("");
        $(".form-group input, .form-group textarea").removeClass("error");
        $("#form-status").text("");
    });

    // Botón enviar
    $("#submit-btn").on("click", function (e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Si la validación pasa, mostrar alert
            alert("¡Mensaje enviado exitosamente!");
            form[0].reset();
            $(".error-message").text("");
            $(".form-group input, .form-group textarea").removeClass("error");
        }
    });
}

// Validar formulario
function validateForm() {
    const nombre = $("#nombre").val().trim();
    const edad = $("#edad").val().trim();
    const email = $("#email").val().trim();
    const comentario = $("#comentario").val().trim();
    
    let isValid = true;

    // Limpiar mensajes de error previos
    $(".error-message").text("");
    $(".form-group input, .form-group textarea").removeClass("error");

    // Validar nombre
    if (nombre === "") {
        $("#nombre-error").text("El nombre es requerido");
        $("#nombre").addClass("error");
        isValid = false;
    }

    // Validar edad
    if (edad === "") {
        $("#edad-error").text("La edad es requerida");
        $("#edad").addClass("error");
        isValid = false;
    } else if (isNaN(edad) || edad < 1 || edad > 150) {
        $("#edad-error").text("La edad debe ser un número válido");
        $("#edad").addClass("error");
        isValid = false;
    }

    // Validar email
    if (email === "") {
        $("#email-error").text("El email es requerido");
        $("#email").addClass("error");
        isValid = false;
    } else if (!isValidEmail(email)) {
        $("#email-error").text("El email no es válido");
        $("#email").addClass("error");
        isValid = false;
    }

    // Validar comentario
    if (comentario === "") {
        $("#comentario-error").text("El comentario es requerido");
        $("#comentario").addClass("error");
        isValid = false;
    }

    return isValid;
}

// Función para validar email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
