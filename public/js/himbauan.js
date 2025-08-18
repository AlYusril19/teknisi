document.addEventListener("DOMContentLoaded", function () {
    let idTele = window.idTele;
    if (idTele === null) {
        let himbauanModal = new bootstrap.Modal(document.getElementById('himbauanModal'), {
            backdrop: 'static', // cannot close by clicking outside
            keyboard: false     // cannot close with ESC key
        });
        himbauanModal.show();
    }
});