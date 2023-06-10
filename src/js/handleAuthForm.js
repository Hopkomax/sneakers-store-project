import { createUser , signIn, authState } from '../firebase';

const userButton = document.querySelector('.header__user__icon__user');
const authModal = document.querySelector('.modal-auth__backdrop');
const closeButton = document.querySelector('.close');
const authForm = document.querySelector('.auth__form');
const userNameForm = document.querySelector('.username__form');
const usernameInput = userNameForm.querySelector('input[name="username"]');
const actionText = document.querySelector('.action__text');
const btnChangeForm = document.querySelector('.btn__change__form');
const title = document.querySelector('.form__title');
let isLoginMode = true;
const identificateForm = document.querySelector('[data-action]');
const actionValue = identificateForm.dataset.action;
console.log(actionValue);

function handleSubmit(event) {
  event.preventDefault();

  const formData = [...authForm.elements].reduce((formData, element) => {
    if (element.name) {
      formData[element.name] = element.value;
    }
    return formData;
  }, {});
  if (actionValue === 'log_in'){
  createUser(formData);

 
}else if (actionValue === 'reg'){
    signIn(formData);
    console.log('rege');
}
authForm.reset();
} 

function openModal() {
  authModal.classList.add('open');
  closeButton.addEventListener('click', closeModal);
  userButton.removeEventListener('click', openModal);
}

function closeModal() {
  authModal.classList.remove('open');
  closeButton.removeEventListener('click', closeModal);
  userButton.addEventListener('click', openModal);
}

function changeForm() {
    if (isLoginMode) {
        btnChangeForm.textContent = 'Registration';
        userNameForm.classList.add('hiden');
        btnChangeForm.setAttribute('data-action', 'log_in');
        title.textContent = 'Log in';
        actionText.textContent = 'Don`t have account?';
        usernameInput.removeAttribute('required');
        authState();
        authForm.reset();
        isLoginMode = false;
      } else {
        btnChangeForm.textContent = 'Log in';
        btnChangeForm.setAttribute('data-action', 'reg');    
        userNameForm.classList.remove('hiden');
        title.textContent = 'Sign up';
        actionText.textContent = 'Already have account?';

        authForm.reset();
        isLoginMode = true;
      }
}
// function changeForm(){
//     const action = btnChangeForm.dataset.action;
//     if(action === 'log_in') {
//         // 2 поля
//         console.log('login');
//         userNameForm.classList.add('hiden');
//         btnChangeForm.setAttribute('data-action', 'reg');
//         btnChangeForm.textContent = 'Registration';
//         authForm.reset();
//     } else if (action === 'reg') {
//         console.log('reg');
//         userNameForm.classList.remove('hiden');
//         btnChangeForm.setAttribute('data-action', 'log_in');

//         btnChangeForm.textContent = 'Log in';

//         authForm.reset();

    // }
   // userNameForm.hide;
    // console.log(actionValue);
   // btnChangeForm.dataset.action = "reg";

// }
userButton.addEventListener('click', openModal);
authForm.addEventListener('submit', handleSubmit);
btnChangeForm.addEventListener('click', changeForm);