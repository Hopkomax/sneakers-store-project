import { createUser, signIn, db } from '../firebase';

const userButton = document.querySelector('.header__user__icon__user');
const authModal = document.querySelector('.modal-auth__backdrop');
const closeButton = document.querySelector('.close');
const authForm = document.querySelector('.auth__form');
const userNameForm = document.querySelector('.username__form');
const usernameInput = userNameForm.querySelector('input[name="name"]');
const actionText = document.querySelector('.action__text');
const btnChangeForm = document.querySelector('.btn__change__form');
const title = document.querySelector('.form__title');
let isRegMode = true;
const identificateForm = document.querySelector('[data-action]');
const actionValue = identificateForm.dataset.action;
const userName = document.querySelector('.header__user__user__name');

console.log(actionValue);

export async function handleSubmit(event) {
  event.preventDefault();

  const formData = [...authForm.elements].reduce((formData, element) => {
    if (element.name) {
      formData[element.name] = element.value;
    }
    return formData;
  }, {});

  if (isRegMode) {
    await createUser(formData);
    console.log('rege');
    await signIn(formData);
    
  } else if (!isRegMode) {
    await signIn(formData);
    console.log('log_in');
  }
  authForm.reset();
  const curentUser = await db.auth().currentUser;
  console.log(curentUser);
  userName.textContent = curentUser.displayName;
}

export function openModal() {
  console.log('openModal1');
  authModal.classList.add('open');
  closeButton.addEventListener('click', closeModal);
  userButton.removeEventListener('click', openModal);
  document.body.style.overflow = 'hidden';

}

export function closeModal() {
  authModal.classList.remove('open');
  closeButton.removeEventListener('click', closeModal);
  userButton.addEventListener('click', openModal);
  document.body.style.overflow = 'visible';

}


function changeForm() {
if(isRegMode){
    btnChangeForm.textContent = 'Registration';
    userNameForm.classList.add('hiden');
    btnChangeForm.setAttribute('data-action', 'log_in');
    title.textContent = 'Log in';
    actionText.textContent = 'Don`t have account?';
    usernameInput.removeAttribute('required');
    authForm.reset();
    isRegMode = false;
} else {
    btnChangeForm.textContent = 'Log in';
    btnChangeForm.setAttribute('data-action', 'reg');
    userNameForm.classList.remove('hiden');
    title.textContent = 'Registration';
    actionText.textContent = 'Already have account?';
    authForm.reset();
    isRegMode = true;
}

}

// function changeForm() {
//   if (isRegMode) {
//     console.log('1');
//     btnChangeForm.textContent = 'Log in';
//     userNameForm.classList.add('hiden');
//     btnChangeForm.setAttribute('data-action', 'log_in');
//     title.textContent = 'Log in';
//     actionText.textContent = 'Don`t have account?';
//     usernameInput.removeAttribute('required');
//     // authState();
//     authForm.reset();
//     isRegMode = true;
//   } else {
//     btnChangeForm.textContent = 'Registration';
//     btnChangeForm.setAttribute('data-action', 'reg');
//     userNameForm.classList.remove('hiden');
//     title.textContent = 'Sign up';
//     actionText.textContent = 'Already have account?';

//     authForm.reset();
//     isRegMode = false;
//   }
// }
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
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
  authModal.addEventListener('click', function(event) {
    if (event.target === authModal) {
      closeModal();
    }
  });