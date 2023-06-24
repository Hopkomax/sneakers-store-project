import createSneakersMarkup from './createMarkupFunctions/createSneakersMarkup';
import { themeSwitch, setThemeOnLoad } from './themeSwitch';
import { modalHandler } from './displayCart';
import { setActualPriceIntoHeader } from './calculateTotalPrice';
import createPurchasesMarkup from './createMarkupFunctions/createPurchasesMarkup';
import createSneakersMarkupInCart from './createMarkupFunctions/createSneakersMarkupInCart';
import { createEmptyPurchases } from './createMarkupFunctions/createEmptyPurchases';
import { modalHandler } from './displayCart';
import { db, signOut } from '../firebase';
import 'firebase/compat/firestore';
import { forEach } from 'lodash';

// import { openModal } from './handleAuthForm';

const list = document.querySelector('.purchasesList__list');
const headerGroup = document.querySelector('.header__user__icons__group');
const btnLogOut = document.querySelector('.btn__log__out');

setThemeOnLoad();
db.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(' USER =>', user);

    setActualPriceIntoHeader();

    console.log(' USER =>', user);
    document.querySelector('.header__user__user__name').textContent = user.displayName;

    headerGroup.classList.add('visible');
    btnLogOut.classList.add('visible');

    console.log(user.displayName);
  } else {
    headerGroup.classList.remove('visible');
    btnLogOut.classList.remove('visible');
  }
});

document.querySelector('.theme__switch').addEventListener('change', themeSwitch);
document.addEventListener('click', modalHandler);

btnLogOut.addEventListener('click', () => {
  signOut().then(() => {
    db.auth().onAuthStateChanged(user => {
      if (!user) {
        window.location.href = 'index.html';
      }
    });
  });
});

// const userButton = document.querySelector('.header__user__icon__user');
function handleAuthStateChanged(user) {
  if (user) {
db.firestore()
  .collection('orders')
  .where('userId', '==', db.auth().currentUser.uid)
  .onSnapshot(
    snapshot => {
      const orders = snapshot.docs.map(doc => doc.data()) || [];
      console.log(orders);
      orders.forEach(({order, createdAt}) => {
        console.log(order, createdAt);
      })
      // const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
      if (orders.length === 0) {
        emptyPurchases();
      } else {
  //       <li>
  //   <p>10.06</p>
  //   <ul>
  //     <li>card</li>
  //     <li>card</li>
  //     <li>card</li>
  //   </ul>
  // </li>
      //  const markup = orders.map(({order, createdAt}) => {
        //   return `
        //   <li>
        //   <p>10.06</p>
        //   <ul> ${order.map(({title}) => `<li>${title}</li>`)}
        //   </ul>
        // </li>`
        // })
        list.insertAdjacentHTML('afterbegin', createPurchasesMarkup(orders));

      }
    },
    error => {
      console.log('Помилка отримання даних:', error);
    },
  );
  }
}
db.auth().onAuthStateChanged(handleAuthStateChanged);

function emptyPurchases() {
  const purchasesList = document.querySelector('.purchasesList__list');
  purchasesList.innerHTML = createEmptyPurchases();
}
