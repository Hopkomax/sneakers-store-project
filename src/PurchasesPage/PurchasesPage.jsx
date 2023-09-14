import PurchasesList from './components/PurchasesList';

// function PurchasesPage() {
//     return (
//       <><PurchasesList/></>
//     );
//   }
  
//   export default PurchasesPage;
  

import React, { useEffect } from 'react';
import '../main.scss'; 
// import '../styles/components/purchases'

import createSneakersMarkup from '../js/createMarkupFunctions/createSneakersMarkup';
import { themeSwitch, setThemeOnLoad } from '../js/themeSwitch';
import { modalHandler } from '../js/displayCart';
import { setActualPriceIntoHeader } from '../js/calculateTotalPrice';
import createPurchasesMarkup from '../js/createMarkupFunctions/createPurchasesMarkup';
import createSneakersMarkupInCart from '../js/createMarkupFunctions/createSneakersMarkupInCart';
import { createEmptyPurchases } from '../js/createMarkupFunctions/createEmptyPurchases';
import { db, signOut } from '../firebase';
// import '../firebase/compat/firestore';
import 'firebase/compat/firestore'
import '../firebase/index'
import { forEach } from 'lodash';
import '../js/mobileMenu';


function PurchasesPage() {
  useEffect(() => {

 

    const list = document.querySelector('.purchasesList__list');
    const headerGroup = document.querySelector('.header__user__icons__group');
    const btnLogOut = document.querySelector('.btn__log__out');

    setThemeOnLoad();
    db.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(' USER =>', user);
        console.log('react');
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

    function handleAuthStateChanged(user) {
      if (user) {
        db.firestore()
          .collection('orders')
          .where('userId', '==', db.auth().currentUser.uid)
          .onSnapshot(
            snapshot => {
              const orders = snapshot.docs.map(doc => doc.data()) || [];
              console.log(orders);
              orders.forEach(({ order, createdAt }) => {
                console.log(order, createdAt);
              });
              if (orders.length === 0) {
                emptyPurchases();
              } else {
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
      const purchasesList = document.querySelector('.emptyLayout');
      purchasesList.innerHTML = createEmptyPurchases();
    }

  }, []);

     return (
      <><PurchasesList/></>
    );
  }

export default PurchasesPage;
