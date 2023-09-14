var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire7084"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire7084"] = parcelRequire;
}

var $1iJ0s = parcelRequire("1iJ0s");

var $4GMN4 = parcelRequire("4GMN4");
function $c875197adb1a0bb3$export$dba1ce2c92721fdf() {
    return `<div class="emptyContentFavorites__wrapper" >
    <div class="emptyContentFavorites__img">🥺</div>
    <h3 class="emptyContentFavorites__title">Favorites not found</h3>
    <p class="emptyContentFavorites__text">You have not added anything to favorites</p>
    <div class='emptyContentFavorites__container__button'>
    <a href="index.html" class="emptyContentFavorites__button">Return</a>
    </div>
    </div>`;
}



var $d9MTO = parcelRequire("d9MTO");

var $bEAY7 = parcelRequire("bEAY7");

var $lDONj = parcelRequire("lDONj");

var $03Y6j = parcelRequire("03Y6j");

var $2wACO = parcelRequire("2wACO");
parcelRequire("f2p19");

var $5rPUo = parcelRequire("5rPUo");

var $iqmmd = parcelRequire("iqmmd");
parcelRequire("lo6ue");
// import { handleCart } from './handleCart';
const $ac329baf2538dd87$var$headerGroup = document.querySelector(".header__user__icons__group");
const $ac329baf2538dd87$var$btnLogOut = document.querySelector(".btn__log__out");
(0, $iqmmd.db).auth().onAuthStateChanged((user)=>{
    if (user) {
        console.log(" USER =>", user);
        console.log("promise");
        setTimeout(()=>{
            (0, $bEAY7.setInCartOnload)();
            (0, $4GMN4.setFavoritesOnload)();
        }, 2000);
        (0, $d9MTO.setActualPriceIntoHeader)();
        console.log(" USER =>", user);
        document.querySelector(".header__user__user__name").textContent = user.displayName;
        $ac329baf2538dd87$var$headerGroup.classList.add("visible");
        $ac329baf2538dd87$var$btnLogOut.classList.add("visible");
        console.log(user.displayName);
    } else {
        $ac329baf2538dd87$var$headerGroup.classList.remove("visible");
        $ac329baf2538dd87$var$btnLogOut.classList.remove("visible");
    }
});
(0, $03Y6j.setThemeOnLoad)();
document.querySelector(".theme__switch").addEventListener("change", (0, $03Y6j.themeSwitch));
document.addEventListener("click", (0, $2wACO.modalHandler));
$ac329baf2538dd87$var$btnLogOut.addEventListener("click", ()=>{
    (0, $iqmmd.signOut)().then(()=>{
        (0, $iqmmd.db).auth().onAuthStateChanged((user)=>{
            if (!user) window.location.href = "index.html";
        });
    });
});
const $ac329baf2538dd87$var$userButton = document.querySelector(".header__user__icon__user");
$ac329baf2538dd87$var$userButton.addEventListener("click", (0, $5rPUo.openModal));
const $ac329baf2538dd87$var$list = document.querySelector(".favoritesList__list");
$ac329baf2538dd87$var$list.addEventListener("click", $ac329baf2538dd87$var$handleFavorites);
$ac329baf2538dd87$var$list.addEventListener("click", $ac329baf2538dd87$var$handleCart);
function $ac329baf2538dd87$var$handleAuthStateChanged(user) {
    if (user) {
        console.log("USER =>", user);
        console.log("db.auth().currentUser.uid", (0, $iqmmd.db).auth().currentUser.uid);
        (0, $iqmmd.db).firestore().collection("favorites").where("userId", "==", (0, $iqmmd.db).auth().currentUser.uid).onSnapshot((snapshot)=>{
            const favorites = snapshot.docs.map((doc)=>doc.data()) || [];
            console.log(favorites);
            if (favorites.length === 0) $ac329baf2538dd87$var$emptyFavorites();
            else {
                $ac329baf2538dd87$var$list.insertAdjacentHTML("afterbegin", (0, $1iJ0s.default)(favorites));
                (0, $4GMN4.setFavoritesOnload)();
                (0, $bEAY7.setInCartOnload)();
            }
        }, (error)=>{
            console.log("Помилка отримання даних:", error);
        });
    }
}
(0, $iqmmd.db).auth().onAuthStateChanged($ac329baf2538dd87$var$handleAuthStateChanged);
(0, $d9MTO.setActualPriceIntoHeader)();
function $ac329baf2538dd87$var$emptyFavorites() {
    const favoritesList = document.querySelector(".favoritesList__list");
    favoritesList.innerHTML = (0, $c875197adb1a0bb3$export$dba1ce2c92721fdf)();
}
async function $ac329baf2538dd87$var$handleFavorites(event) {
    const heart = event.target;
    if (heart.classList.contains("sneaker__heart__button")) {
        const sneaker = heart.closest("li");
        if (heart.classList.contains("active")) {
            heart.classList.remove("active");
            const docId = await (0, $iqmmd.db).firestore().collection("favorites").get();
            docId.forEach(async (item)=>{
                const currentSneaker = item.data();
                if (currentSneaker.id === sneaker.id) await (0, $iqmmd.db).firestore().collection("favorites").doc(item.id).delete();
            });
            sneaker.remove();
            $ac329baf2538dd87$var$list.innerHTML = "";
        }
    }
    (0, $iqmmd.db).firestore().collection("favorites").get().then((querySnapshot)=>{
        if (querySnapshot.empty) {
            console.log("Колекція порожня");
            $ac329baf2538dd87$var$emptyFavorites();
        } else console.log("Колекція не порожня");
    }).catch((error)=>{
        console.log("Помилка при отриманні даних з колекції:", error);
    });
}
async function $ac329baf2538dd87$var$handleCart(event) {
    const cart = event.target;
    if (cart.classList.contains("sneaker__add__button")) {
        const sneakerId = cart.parentNode.parentNode.id;
        const selectedSneaker = await (0, $lDONj.getSneakerById)(sneakerId) || {};
        if (cart.classList.contains("active")) {
            cart.classList.remove("active");
            const docId = await (0, $iqmmd.db).firestore().collection("cart").get();
            docId.forEach(async (item)=>{
                const currentSneaker = item.data();
                if (currentSneaker.id === selectedSneaker.id) await (0, $iqmmd.db).firestore().collection("cart").doc(item.id).delete();
            });
            (0, $d9MTO.setActualPriceIntoHeader)();
            return;
        }
        await (0, $iqmmd.db).auth().onAuthStateChanged(async (user)=>{
            if (user) {
                cart.classList.add("active");
                await (0, $iqmmd.db).firestore().collection("cart").add({
                    ...selectedSneaker,
                    userId: (0, $iqmmd.db).auth().currentUser.uid
                });
                (0, $d9MTO.setActualPriceIntoHeader)();
            } else console.log("щоб додати у корзину - зареєструйся");
        });
    }
}


//# sourceMappingURL=favorites.81007f9e.js.map
