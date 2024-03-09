console.log('Processo iniziato...');

fetch('http://localhost:3000/api/userinfo', {
    method: 'GET',
    credentials: 'include' // Importante per i cookie con CORS
})
    .then(response => {
        if (!response.ok) throw new Error('Risposta non valida dal server');
        return response.json();
    })
    .then(data => {
        console.log(data); // Usa i dati dell'utente come necessario
    })
    .catch(error => {
        console.error('Errore durante il recupero delle informazioni dell\'utente:', error);
    });


const googleBtnAuth = document.querySelector('.btn-google');
const registerBtnAuth = document.querySelector('.btn-register');
const loginBtnAuth = document.querySelector('.btn-login');

const inputEmail = document.querySelector('.input-email');
const labelEmail = document.querySelector('.label-email');

googleBtnAuth.addEventListener('click', (e) => {
    window.location.href = 'http://localhost:3000/api/register/google';
})





registerBtnAuth.addEventListener('click', (e) => {

    registerBtnAuth.classList.add('animation-out');
    loginBtnAuth.classList.add('animation-out');
    googleBtnAuth.classList.add('animation-out');
    const wrapper = document.querySelector('.email-wrapper');
    console.log(wrapper);

    setTimeout(() => {
        registerBtnAuth.classList.add('d-none');
        //inputEmail.classList.remove('d-none');
        //inputEmail.classList.add('animation-in');

        wrapper.classList.add('d-flex');
        wrapper.classList.add('flex-column');
        wrapper.classList.add('align-items-center');
        wrapper.innerHTML =
            `
            <div class="input-group mb-3 w-75">
                <input id="email" type="email" class="form-control" placeholder="email@example.com" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <span class="input-group-text" id="basic-addon2">Email</span>
            </div>
            <div class="input-group mb-3 w-75">
                <input id="username" type="text" class="form-control" placeholder="Username" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <span class="input-group-text" id="basic-addon2">Username</span>
            </div>
            <div class="input-group mb-3 w-75">
                <input id="password" type="password" class="form-control" placeholder="YourPassword@1" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <span class="input-group-text" id="basic-addon2">Password</span>
            </div>
            <div class="d-flex w-75 justify-content-around">
                <button id="save-btn" type="button" class="btn btn-outline-info w-25">Indietro</button>
                <button id="back-btn" type="button" class="btn btn-success w-25">Register</button>
            </div>
        `;
        //wrapper.classList.remove('d-none');
        wrapper.classList.add('animation-in');
    }, 1000)
})

loginBtnAuth.addEventListener('click', (e) => {


})