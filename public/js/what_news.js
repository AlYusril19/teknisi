document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem('himbauan_shown')) {
        let himbauanModal = new bootstrap.Modal(document.getElementById('himbauanModal'), {
            backdrop: 'static',
            keyboard: false
        });
        himbauanModal.show();
        localStorage.setItem('himbauan_shown', 'true');
    }
});
