import main from './js/main'
import createSneakersMarkup from './js/createMarkupFunctions/createSneakersMarkup'
import search from './js/search';
import createSkeletonMarkup from './js/createMarkupFunctions/createSkeletonMarkup'
import handleFavorites from './js/handleFavorites'
import handleCart from './js/handleCart'
import { getSneakers } from './api/api';
import displayCart from './js/displayCart'
import createMakeOrderMarkup from './js/createMarkupFunctions/createMakeOrderMarkup';
import createSneakersMarkupInCart from './js/createMarkupFunctions/createSneakersMarkupInCart'
import themeSwitch from './js/themeSwitch';
import setThemeOnLoad from './js/themeSwitch';
import mobileMenu from './js/mobileMenu';
import createPurchasesMarkup from './js/createMarkupFunctions/createPurchasesMarkup';
import './js/handleAuthForm';
// import displayPurchases from './js/purchases';
// const sentense = "Get best sle offers now!";

// if(sentense.toLowerCase().includes('sale')){
// console.log(true);
// }console.log(false);

// function countSheep(number){
//     for(let i = 1; i <= 100; i++){
//         console.log(i + ' ' + 'sheep');
//         if(i === number){
//             console.log('sleep');
//             return;
//         }
//     }
// }
// console.log(countSheep(28));
// console.log(countSheep(13));

// // function countSum( ...args){
//     function countSum( ){
//       console.log(arguments);
//        Array.from(arguments)
//    const total = Array.from(arguments).reduce(((total, number) => total + number), 0);
//     return total;
// }

// console.log(countSum(1, 2, 3, 4, 5, 6)); // 21
// console.log(countSum(32, 8, 5, 6, 9)); // 60
// /////////////////////


// const inventory = {
//     items: ['Knife', 'Gas mask'],
//     add(itemName) {
//       console.log(`Adding ${itemName} to inventory`);
  
//       this.items.push(itemName);
//     },
//     remove(itemName) {
//       console.log(`Removing ${itemName} from inventory`);
  
//       this.items = this.items.filter(item => item !== itemName);
//     },
//   };
  
//   const invokeInventoryAction = function (itemName, action) {
//     console.log(`Invoking action on ${itemName}`);
//     action(itemName);
//   };
//   invokeInventoryAction('Medkit', inventory.add.bind(inventory));

//   // Invoking action on Medkit
//   // Adding Medkit to inventory
  
//   console.log(inventory.items); // ['Knife', 'Gas mask', 'Medkit']
  
//   invokeInventoryAction('Gas mask', inventory.remove.bind(inventory));
//   // Invoking action on Gas mask
//   // Removing Gas mask from inventory
  
//   console.log(inventory.items); // ['Knife', 'Medkit']

//   console.log('..........................................');

//   //1 Модуль 1. Заняття 1. (1.1)

//   const weight = "88,3".replace(',', '.');
//   const height = '1.75'.replace(',', '.');
//   const result =(parseFloat( weight/ (height**2))).toFixed(1);
//   console.log(result);

//   //2 Модуль 1. Заняття 1. (1.2)
//   const year = 1601;
//   console.log(Math.ceil(year/100));

//   //3 1 Модуль 1. Заняття 1. (1.3)

//   function convertMinutesToHours(timeMinutes){
//     const hours = Math.floor(timeMinutes / 60);
//     const minutes = timeMinutes % 60;
//     console.log(hours +':' + minutes);
//   }
//   const timeMinutes = 450;
//   convertMinutesToHours(timeMinutes);

//   //4 1 Модуль 1. Заняття 1. (2.1)

//   const variable = 45;
//   console.log( typeof variable === 'string' ? true : false);

//   //5  1 Модуль 1. Заняття 1. (3.1)

//   // const number1 = prompt("Введіть перше число:");
//   // const number2 = prompt("Введіть перше число:");
//   // const sum =parseFloat(number1) + parseFloat(number2);
//   // console.log(sum);
//   // alert(sum);

//   //6 Модуль 1. Заняття 2. Розгалуження. Цикли (1.1)

//   const bmi = result;

//   if(bmi < 18.5){
//     console.log("Недостатня вага");
//   } else if(bmi <= 25){
//     console.log("Норма");
//   } else if(bmi <= 30) {
//     console.log("Надмірна вага");
//   } else if (bmi > 30){
//     console.log("Ожиріння");
//   }

//   //7 Модуль 1. Заняття 2. Розгалуження. Цикли (1.2)

//   const credits = 23580;
//   const pricePerDroid = 3000;
//   const amountOfDroids = prompt("Enter anoubt of droids:");
//    if(amountOfDroids === null){
//     console.log('Скасовано користувачем');
//    } else {
//     const totalPrice = amountOfDroids * pricePerDroid;
//     console.log(totalPrice);
//    if(credits - totalPrice < 0) {
//     console.log('Недостатньо коштів на рахунку');
//    } else{
//     console.log(`Ви купили ${amountOfDroids} дроїдів, на рахунку залишилося
//      ${(credits - totalPrice)} кредитів.`);
//    }
//    }
