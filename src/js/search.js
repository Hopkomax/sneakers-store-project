import sneakers from "../db/sneakers";
import createSneakersMarkup from "./createSneakersMarkup";
export default function search(event) {
    //console.log(event.currentTarget.value);
    //const input = document.querySelector('.search__input').value;
    const inputValue = event.currentTarget.value.toLocaleLowerCase().trim();
    const searchedSneakers = sneakers.filter((sneaker) => sneaker.title.toLocaleLowerCase().includes(inputValue));
    console.log(searchedSneakers);
    const list = document.querySelector('.sneakersList__list');
list.innerHTML = '';
createSneakersMarkup(searchedSneakers);

}
const input = document.querySelector('.search__input');
input.addEventListener('input', search);

