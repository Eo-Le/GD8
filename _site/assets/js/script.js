console.log("loaded: assets/js/script.js");

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('button').addEventListener('click', function () {
        alert('Alert fra assets/js/script.js.');
    });
});
