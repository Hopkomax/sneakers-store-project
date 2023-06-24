(function () {
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
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

var $j5HDT = parcelRequire("j5HDT");

var $9FS1E = parcelRequire("9FS1E");

var $eJHP4 = parcelRequire("eJHP4");
parcelRequire("8cZNZ");

var $1wyha = parcelRequire("1wyha");
async function $1080de6416cd3505$export$4be896189efc8c9f(event) {
    const heart = event.target;
    // console.log('heart', heart);
    if (heart.classList.contains("sneaker__heart__button")) {
        console.log("heart", heart);
        await (0, $eJHP4.db).auth().onAuthStateChanged(async (user)=>{
            if (user) {
                const sneaker = heart.closest("li");
                const selectedSneaker = await (0, $9FS1E.getSneakerById)(sneaker.id) || {};
                // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                if (heart.classList.contains("active")) {
                    // const updatedFavorites = favorites.filter(({ id }) => id !== sneaker.id);
                    // localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                    heart.classList.remove("active");
                    // work with FIREBASE
                    const docId = await (0, $eJHP4.db).firestore().collection("favorites").get();
                    docId.forEach(async (item)=>{
                        const currentSneaker = item.data();
                        if (currentSneaker.id === selectedSneaker.id) await (0, $eJHP4.db).firestore().collection("favorites").doc(item.id).delete();
                    });
                    return;
                }
                heart.classList.add("active");
                // favorites.push(selectedSneaker);
                // localStorage.setItem('favorites', JSON.stringify(favorites));
                // add sneakers to FIREBASE
                await (0, $eJHP4.db).firestore().collection("favorites").add({
                    ...selectedSneaker,
                    userId: (0, $eJHP4.db).auth().currentUser.uid
                });
            } else {
                console.log("зареєструйся");
                (0, (/*@__PURE__*/$parcel$interopDefault($1wyha))).fire("Please log in");
            }
        });
    }
}
function $1080de6416cd3505$export$29284ae2149307d8() {
    const currentUser = (0, $eJHP4.db).auth().currentUser;
    if (!currentUser) return;
    (0, $eJHP4.db).firestore().collection("favorites").where("userId", "==", currentUser.uid).onSnapshot((snapshot)=>{
        const favorites = snapshot.docs.map((doc)=>doc.data()) || [];
        document.querySelectorAll(".sneaker__heart__button.active").forEach((item)=>item.classList.remove("active"));
        for (const { id: id  } of favorites){
            const item = document.getElementById(id);
            if (!item) continue;
            const heartButton = item.querySelector(".sneaker__heart__button");
            heartButton.classList.add("active");
        }
    }, (error)=>{
        console.log("Помилка отримання даних:", error);
    });
}


function $928032db4a220b47$export$dba1ce2c92721fdf() {
    return `<div class="emptyContentFavorites__wrapper" >
    <div class="emptyContentFavorites__img">🥺</div>
    <h3 class="emptyContentFavorites__title">Favorites not found</h3>
    <p class="emptyContentFavorites__text">You have not added anything to favorites</p>
    <div class='emptyContentFavorites__container__button'>
    <a href="index.html" class="emptyContentFavorites__button">Return</a>
    </div>
    </div>`;
}



var $iDdm1 = parcelRequire("iDdm1");

var $9jwmw = parcelRequire("9jwmw");

var $9FS1E = parcelRequire("9FS1E");

var $lGpGj = parcelRequire("lGpGj");

var $30aga = parcelRequire("30aga");
const $bf423685ba1738e3$var$navToggle = document.querySelector("#navToggle");
const $bf423685ba1738e3$var$navClosedIcon = document.querySelector("#navClosed");
const $bf423685ba1738e3$var$navOpenIcon = document.querySelector("#navOpen");
const $bf423685ba1738e3$var$navIcon = document.querySelectorAll(".navIcon");
const $bf423685ba1738e3$var$nav = document.querySelector("nav");
$bf423685ba1738e3$var$navToggle.addEventListener("click", ()=>{
    $bf423685ba1738e3$var$nav.classList.toggle("open");
    document.body.style.overflow = $bf423685ba1738e3$var$nav.classList.contains("open") ? "hidden" : "auto";
    $bf423685ba1738e3$var$navIcon.forEach((icon)=>{
        icon.classList.toggle("hidden");
    });
});
window.addEventListener("resize", ()=>{
    if (document.body.clientWidth > 1200) {
        $bf423685ba1738e3$var$nav.classList.remove("open");
        $bf423685ba1738e3$var$navIcon.forEach((icon)=>{
            icon.classList.remove("hidden");
        });
        $bf423685ba1738e3$var$navOpenIcon.classList.add("hidden");
        document.body.style.overflow = "auto";
    }
}, {
    passive: false
});



var $eJHP4 = parcelRequire("eJHP4");
const $a969998314c3f48f$var$userButton = document.querySelector(".header__user__icon__user");
const $a969998314c3f48f$var$authModal = document.querySelector(".modal-auth__backdrop");
const $a969998314c3f48f$var$closeButton = document.querySelector(".close");
const $a969998314c3f48f$var$authForm = document.querySelector(".auth__form");
const $a969998314c3f48f$var$userNameForm = document.querySelector(".username__form");
const $a969998314c3f48f$var$usernameInput = $a969998314c3f48f$var$userNameForm.querySelector('input[name="name"]');
const $a969998314c3f48f$var$actionText = document.querySelector(".action__text");
const $a969998314c3f48f$var$btnChangeForm = document.querySelector(".btn__change__form");
const $a969998314c3f48f$var$title = document.querySelector(".form__title");
let $a969998314c3f48f$var$isRegMode = true;
const $a969998314c3f48f$var$identificateForm = document.querySelector("[data-action]");
const $a969998314c3f48f$var$actionValue = $a969998314c3f48f$var$identificateForm.dataset.action;
const $a969998314c3f48f$var$userName = document.querySelector(".header__user__user__name");
const $a969998314c3f48f$var$btnLogOut = document.querySelector(".btn__log__out");
console.log($a969998314c3f48f$var$actionValue);
async function $a969998314c3f48f$export$89c2621768820c8b(event) {
    event.preventDefault();
    const formData = [
        ...$a969998314c3f48f$var$authForm.elements
    ].reduce((formData, element)=>{
        if (element.name) formData[element.name] = element.value;
        return formData;
    }, {});
    if ($a969998314c3f48f$var$isRegMode) {
        await (0, $eJHP4.createUser)(formData);
        console.log("rege");
        await (0, $eJHP4.signIn)(formData);
    } else if (!$a969998314c3f48f$var$isRegMode) {
        await (0, $eJHP4.signIn)(formData);
        console.log("log_in");
    }
    $a969998314c3f48f$var$authForm.reset();
    const curentUser = await (0, $eJHP4.db).auth().currentUser;
    console.log(curentUser);
    $a969998314c3f48f$var$userName.textContent = curentUser.displayName;
    $a969998314c3f48f$export$3f6fecd573f3fa48();
}
function $a969998314c3f48f$export$a7f6cffb6b8ba11c() {
    console.log("openModal1");
    const currentUser = (0, $eJHP4.db).auth().currentUser;
    if (currentUser) {
        const currentPath = window.location.pathname;
        const basePath = currentPath.endsWith("/index.html") ? currentPath.slice(0, -11) : currentPath;
        const newURL = `${window.location.origin}${basePath}/purchases.html`;
        const finalURL = newURL.replace("/favorites.html", "");
        window.location.replace(finalURL);
        console.log("window.location");
        console.log(window.location);
        return;
    }
    $a969998314c3f48f$var$authModal.classList.add("open");
    $a969998314c3f48f$var$closeButton.addEventListener("click", $a969998314c3f48f$export$3f6fecd573f3fa48);
    $a969998314c3f48f$var$userButton.removeEventListener("click", $a969998314c3f48f$export$a7f6cffb6b8ba11c);
    document.body.style.overflow = "hidden";
}
function $a969998314c3f48f$export$3f6fecd573f3fa48() {
    $a969998314c3f48f$var$authModal.classList.remove("open");
    $a969998314c3f48f$var$closeButton.removeEventListener("click", $a969998314c3f48f$export$3f6fecd573f3fa48);
    $a969998314c3f48f$var$userButton.addEventListener("click", $a969998314c3f48f$export$a7f6cffb6b8ba11c);
    document.body.style.overflow = "visible";
}
function $a969998314c3f48f$var$changeForm() {
    if ($a969998314c3f48f$var$isRegMode) {
        $a969998314c3f48f$var$btnChangeForm.textContent = "Registration";
        $a969998314c3f48f$var$userNameForm.classList.add("hiden");
        $a969998314c3f48f$var$btnChangeForm.setAttribute("data-action", "log_in");
        $a969998314c3f48f$var$title.textContent = "Log in";
        $a969998314c3f48f$var$actionText.textContent = "Don`t have account?";
        $a969998314c3f48f$var$usernameInput.removeAttribute("required");
        $a969998314c3f48f$var$authForm.reset();
        $a969998314c3f48f$var$isRegMode = false;
    } else {
        $a969998314c3f48f$var$btnChangeForm.textContent = "Log in";
        $a969998314c3f48f$var$btnChangeForm.setAttribute("data-action", "reg");
        $a969998314c3f48f$var$userNameForm.classList.remove("hiden");
        $a969998314c3f48f$var$title.textContent = "Registration";
        $a969998314c3f48f$var$actionText.textContent = "Already have account?";
        $a969998314c3f48f$var$authForm.reset();
        $a969998314c3f48f$var$isRegMode = true;
    }
}
$a969998314c3f48f$var$userButton.addEventListener("click", $a969998314c3f48f$export$a7f6cffb6b8ba11c);
$a969998314c3f48f$var$authForm.addEventListener("submit", $a969998314c3f48f$export$89c2621768820c8b);
$a969998314c3f48f$var$btnChangeForm.addEventListener("click", $a969998314c3f48f$var$changeForm);
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") $a969998314c3f48f$export$3f6fecd573f3fa48();
});
$a969998314c3f48f$var$authModal.addEventListener("click", function(event) {
    if (event.target === $a969998314c3f48f$var$authModal) $a969998314c3f48f$export$3f6fecd573f3fa48();
});



var $eJHP4 = parcelRequire("eJHP4");
parcelRequire("8cZNZ");
const $448c8bee6521701e$var$headerGroup = document.querySelector(".header__user__icons__group");
const $448c8bee6521701e$var$btnLogOut = document.querySelector(".btn__log__out");
(0, $eJHP4.db).auth().onAuthStateChanged((user)=>{
    if (user) {
        console.log(" USER =>", user);
        console.log("promise");
        setTimeout(()=>{
            (0, $9jwmw.setInCartOnload)();
            (0, $1080de6416cd3505$export$29284ae2149307d8)();
        }, 2000);
        (0, $iDdm1.setActualPriceIntoHeader)();
        console.log(" USER =>", user);
        document.querySelector(".header__user__user__name").textContent = user.displayName;
        $448c8bee6521701e$var$headerGroup.classList.add("visible");
        $448c8bee6521701e$var$btnLogOut.classList.add("visible");
        console.log(user.displayName);
    } else {
        $448c8bee6521701e$var$headerGroup.classList.remove("visible");
        $448c8bee6521701e$var$btnLogOut.classList.remove("visible");
    }
});
(0, $lGpGj.setThemeOnLoad)();
document.querySelector(".theme__switch").addEventListener("change", (0, $lGpGj.themeSwitch));
document.addEventListener("click", (0, $30aga.modalHandler));
$448c8bee6521701e$var$btnLogOut.addEventListener("click", ()=>{
    (0, $eJHP4.signOut)().then(()=>{
        (0, $eJHP4.db).auth().onAuthStateChanged((user)=>{
            if (!user) window.location.href = "index.html";
        });
    });
});
const $448c8bee6521701e$var$userButton = document.querySelector(".header__user__icon__user");
$448c8bee6521701e$var$userButton.addEventListener("click", (0, $a969998314c3f48f$export$a7f6cffb6b8ba11c));
const $448c8bee6521701e$var$list = document.querySelector(".favoritesList__list");
$448c8bee6521701e$var$list.addEventListener("click", $448c8bee6521701e$var$handleFavorites);
$448c8bee6521701e$var$list.addEventListener("click", (0, $9jwmw.handleCart));
function $448c8bee6521701e$var$handleAuthStateChanged(user) {
    if (user) {
        console.log("USER =>", user);
        console.log("db.auth().currentUser.uid", (0, $eJHP4.db).auth().currentUser.uid);
        (0, $eJHP4.db).firestore().collection("favorites").where("userId", "==", (0, $eJHP4.db).auth().currentUser.uid).onSnapshot((snapshot)=>{
            const favorites = snapshot.docs.map((doc)=>doc.data()) || [];
            console.log(favorites);
            if (favorites.length === 0) $448c8bee6521701e$var$emptyFavorites();
            else {
                $448c8bee6521701e$var$list.insertAdjacentHTML("afterbegin", (0, $j5HDT.default)(favorites));
                (0, $1080de6416cd3505$export$29284ae2149307d8)();
                (0, $9jwmw.setInCartOnload)();
            }
        }, (error)=>{
            console.log("Помилка отримання даних:", error);
        });
    }
}
(0, $eJHP4.db).auth().onAuthStateChanged($448c8bee6521701e$var$handleAuthStateChanged);
(0, $iDdm1.setActualPriceIntoHeader)();
function $448c8bee6521701e$var$emptyFavorites() {
    const favoritesList = document.querySelector(".favoritesList__list");
    favoritesList.innerHTML = (0, $928032db4a220b47$export$dba1ce2c92721fdf)();
}
async function $448c8bee6521701e$var$handleFavorites(event) {
    const heart = event.target;
    if (heart.classList.contains("sneaker__heart__button")) {
        const sneaker = heart.closest("li");
        if (heart.classList.contains("active")) {
            heart.classList.remove("active");
            const docId = await (0, $eJHP4.db).firestore().collection("favorites").get();
            docId.forEach(async (item)=>{
                const currentSneaker = item.data();
                if (currentSneaker.id === sneaker.id) await (0, $eJHP4.db).firestore().collection("favorites").doc(item.id).delete();
            });
            sneaker.remove();
            $448c8bee6521701e$var$list.innerHTML = "";
        }
    }
    (0, $eJHP4.db).firestore().collection("favorites").get().then((querySnapshot)=>{
        if (querySnapshot.empty) {
            console.log("Колекція порожня");
            $448c8bee6521701e$var$emptyFavorites();
        } else console.log("Колекція не порожня");
    }).catch((error)=>{
        console.log("Помилка при отриманні даних з колекції:", error);
    });
}
async function $9jwmw.handleCart(event) {
    const cart = event.target;
    if (cart.classList.contains("sneaker__add__button")) {
        const sneakerId = cart.parentNode.parentNode.id;
        const selectedSneaker = await (0, $9FS1E.getSneakerById)(sneakerId) || {};
        if (cart.classList.contains("active")) {
            cart.classList.remove("active");
            const docId = await (0, $eJHP4.db).firestore().collection("cart").get();
            docId.forEach(async (item)=>{
                const currentSneaker = item.data();
                if (currentSneaker.id === selectedSneaker.id) await (0, $eJHP4.db).firestore().collection("cart").doc(item.id).delete();
            });
            (0, $iDdm1.setActualPriceIntoHeader)();
            return;
        }
        await (0, $eJHP4.db).auth().onAuthStateChanged(async (user)=>{
            if (user) {
                cart.classList.add("active");
                await (0, $eJHP4.db).firestore().collection("cart").add({
                    ...selectedSneaker,
                    userId: (0, $eJHP4.db).auth().currentUser.uid
                });
                (0, $iDdm1.setActualPriceIntoHeader)();
            } else console.log("щоб додати у корзину - зареєструйся");
        });
    }
}

})();
//# sourceMappingURL=favorites.760c89a7.js.map
