import createSneakersMarkup from './createMarkupFunctions/createSneakersMarkup';
import { getSneakers } from '../api/api';
import { setInCartOnload, handleCart } from './handleCart';
import { setFavoritesOnload, handleFavorites } from './handleFavorites';
import { setActualPriceIntoHeader } from './calculateTotalPrice';
import createSkeletonMarkup from './createMarkupFunctions/createSkeletonMarkup';
import { setThemeOnLoad, themeSwitch } from './themeSwitch';
import { signOut, db} from '../firebase';

const list = document.querySelector('.sneakersList__list');
const headerGroup = document.querySelector('.header__user__icons__group');

setThemeOnLoad();
checkCurrentUser();
createSkeletonMarkup();

setTimeout(() => {
  getSneakers().then(data => {
    list.innerHTML = '';
    list.insertAdjacentHTML('afterbegin', createSneakersMarkup(data));
  });
 
}, 2000);

  async function checkCurrentUser() {
  await db.auth().onAuthStateChanged((user) => {
  if (user){
    setInCartOnload();
    setFavoritesOnload();
    setActualPriceIntoHeader();

    console.log(' USER =>', user);
    document.querySelector('.header__user__user__name').textContent = user.displayName;
    headerGroup.classList.add('visible');
    console.log(user.displayName);
  } else {
    headerGroup.classList.remove('visible');

  }
});
}

document.querySelector('.sneakersList__list').addEventListener('click', handleFavorites);
document.querySelector('.sneakersList__list').addEventListener('click', handleCart);
document.querySelector('.theme__switch').addEventListener('change', themeSwitch);
document.querySelector('.btn__log__out').addEventListener('click', signOut);


