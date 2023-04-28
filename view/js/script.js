'use strict';

const toast = new bootstrap.Toast(document.querySelector('#toast'));
const toastMessage = document.querySelector('#toast-message');

UpUp.start({
    'content-url': '/html/offline.html',
    'assets': [
        '/img/favicon.svg',
        '/css/fontawesome.min.css',
        '/css/style.css',
    ],
});

function triggerToast(message) {
    toastMessage.innerText = message;
    toast.show();
}
