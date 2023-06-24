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

var $1iJ0s = parcelRequire("1iJ0s");

var $lDONj = parcelRequire("lDONj");

var $iqmmd = parcelRequire("iqmmd");
parcelRequire("lo6ue");

var $cm2nk = parcelRequire("cm2nk");
async function $36a0ee730425f3c7$export$4be896189efc8c9f(event) {
    const heart = event.target;
    // console.log('heart', heart);
    if (heart.classList.contains("sneaker__heart__button")) {
        console.log("heart", heart);
        await (0, $iqmmd.db).auth().onAuthStateChanged(async (user)=>{
            if (user) {
                const sneaker = heart.closest("li");
                const selectedSneaker = await (0, $lDONj.getSneakerById)(sneaker.id) || {};
                // const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                if (heart.classList.contains("active")) {
                    // const updatedFavorites = favorites.filter(({ id }) => id !== sneaker.id);
                    // localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                    heart.classList.remove("active");
                    // work with FIREBASE
                    const docId = await (0, $iqmmd.db).firestore().collection("favorites").get();
                    docId.forEach(async (item)=>{
                        const currentSneaker = item.data();
                        if (currentSneaker.id === selectedSneaker.id) await (0, $iqmmd.db).firestore().collection("favorites").doc(item.id).delete();
                    });
                    return;
                }
                heart.classList.add("active");
                // favorites.push(selectedSneaker);
                // localStorage.setItem('favorites', JSON.stringify(favorites));
                // add sneakers to FIREBASE
                await (0, $iqmmd.db).firestore().collection("favorites").add({
                    ...selectedSneaker,
                    userId: (0, $iqmmd.db).auth().currentUser.uid
                });
            } else {
                console.log("зареєструйся");
                (0, (/*@__PURE__*/$parcel$interopDefault($cm2nk))).fire("Please log in");
            }
        });
    }
}
function $36a0ee730425f3c7$export$29284ae2149307d8() {
    const currentUser = (0, $iqmmd.db).auth().currentUser;
    if (!currentUser) return;
    (0, $iqmmd.db).firestore().collection("favorites").where("userId", "==", currentUser.uid).onSnapshot((snapshot)=>{
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
const $af2a72dd55787b74$var$navToggle = document.querySelector("#navToggle");
const $af2a72dd55787b74$var$navClosedIcon = document.querySelector("#navClosed");
const $af2a72dd55787b74$var$navOpenIcon = document.querySelector("#navOpen");
const $af2a72dd55787b74$var$navIcon = document.querySelectorAll(".navIcon");
const $af2a72dd55787b74$var$nav = document.querySelector("nav");
$af2a72dd55787b74$var$navToggle.addEventListener("click", ()=>{
    $af2a72dd55787b74$var$nav.classList.toggle("open");
    document.body.style.overflow = $af2a72dd55787b74$var$nav.classList.contains("open") ? "hidden" : "auto";
    $af2a72dd55787b74$var$navIcon.forEach((icon)=>{
        icon.classList.toggle("hidden");
    });
});
window.addEventListener("resize", ()=>{
    if (document.body.clientWidth > 1200) {
        $af2a72dd55787b74$var$nav.classList.remove("open");
        $af2a72dd55787b74$var$navIcon.forEach((icon)=>{
            icon.classList.remove("hidden");
        });
        $af2a72dd55787b74$var$navOpenIcon.classList.add("hidden");
        document.body.style.overflow = "auto";
    }
}, {
    passive: false
});



var $iqmmd = parcelRequire("iqmmd");
const $3f77bd57f4711a86$var$userButton = document.querySelector(".header__user__icon__user");
const $3f77bd57f4711a86$var$authModal = document.querySelector(".modal-auth__backdrop");
const $3f77bd57f4711a86$var$closeButton = document.querySelector(".close");
const $3f77bd57f4711a86$var$authForm = document.querySelector(".auth__form");
const $3f77bd57f4711a86$var$userNameForm = document.querySelector(".username__form");
const $3f77bd57f4711a86$var$usernameInput = $3f77bd57f4711a86$var$userNameForm.querySelector('input[name="name"]');
const $3f77bd57f4711a86$var$actionText = document.querySelector(".action__text");
const $3f77bd57f4711a86$var$btnChangeForm = document.querySelector(".btn__change__form");
const $3f77bd57f4711a86$var$title = document.querySelector(".form__title");
let $3f77bd57f4711a86$var$isRegMode = true;
const $3f77bd57f4711a86$var$identificateForm = document.querySelector("[data-action]");
const $3f77bd57f4711a86$var$actionValue = $3f77bd57f4711a86$var$identificateForm.dataset.action;
const $3f77bd57f4711a86$var$userName = document.querySelector(".header__user__user__name");
const $3f77bd57f4711a86$var$btnLogOut = document.querySelector(".btn__log__out");
console.log($3f77bd57f4711a86$var$actionValue);
async function $3f77bd57f4711a86$export$89c2621768820c8b(event) {
    event.preventDefault();
    const formData = [
        ...$3f77bd57f4711a86$var$authForm.elements
    ].reduce((formData, element)=>{
        if (element.name) formData[element.name] = element.value;
        return formData;
    }, {});
    if ($3f77bd57f4711a86$var$isRegMode) {
        await (0, $iqmmd.createUser)(formData);
        console.log("rege");
        await (0, $iqmmd.signIn)(formData);
    } else if (!$3f77bd57f4711a86$var$isRegMode) {
        await (0, $iqmmd.signIn)(formData);
        console.log("log_in");
    }
    $3f77bd57f4711a86$var$authForm.reset();
    const curentUser = await (0, $iqmmd.db).auth().currentUser;
    console.log(curentUser);
    $3f77bd57f4711a86$var$userName.textContent = curentUser.displayName;
    $3f77bd57f4711a86$export$3f6fecd573f3fa48();
}
function $3f77bd57f4711a86$export$a7f6cffb6b8ba11c() {
    console.log("openModal1");
    const currentUser = (0, $iqmmd.db).auth().currentUser;
    if (currentUser) {
        window.location.replace(`${window.location.origin}/sneakers-store-project/purchases.html`);
        console.log("window.location");
        console.log(window.location);
        return;
    }
    $3f77bd57f4711a86$var$authModal.classList.add("open");
    $3f77bd57f4711a86$var$closeButton.addEventListener("click", $3f77bd57f4711a86$export$3f6fecd573f3fa48);
    $3f77bd57f4711a86$var$userButton.removeEventListener("click", $3f77bd57f4711a86$export$a7f6cffb6b8ba11c);
    document.body.style.overflow = "hidden";
}
function $3f77bd57f4711a86$export$3f6fecd573f3fa48() {
    $3f77bd57f4711a86$var$authModal.classList.remove("open");
    $3f77bd57f4711a86$var$closeButton.removeEventListener("click", $3f77bd57f4711a86$export$3f6fecd573f3fa48);
    $3f77bd57f4711a86$var$userButton.addEventListener("click", $3f77bd57f4711a86$export$a7f6cffb6b8ba11c);
    document.body.style.overflow = "visible";
}
function $3f77bd57f4711a86$var$changeForm() {
    if ($3f77bd57f4711a86$var$isRegMode) {
        $3f77bd57f4711a86$var$btnChangeForm.textContent = "Registration";
        $3f77bd57f4711a86$var$userNameForm.classList.add("hiden");
        $3f77bd57f4711a86$var$btnChangeForm.setAttribute("data-action", "log_in");
        $3f77bd57f4711a86$var$title.textContent = "Log in";
        $3f77bd57f4711a86$var$actionText.textContent = "Don`t have account?";
        $3f77bd57f4711a86$var$usernameInput.removeAttribute("required");
        $3f77bd57f4711a86$var$authForm.reset();
        $3f77bd57f4711a86$var$isRegMode = false;
    } else {
        $3f77bd57f4711a86$var$btnChangeForm.textContent = "Log in";
        $3f77bd57f4711a86$var$btnChangeForm.setAttribute("data-action", "reg");
        $3f77bd57f4711a86$var$userNameForm.classList.remove("hiden");
        $3f77bd57f4711a86$var$title.textContent = "Registration";
        $3f77bd57f4711a86$var$actionText.textContent = "Already have account?";
        $3f77bd57f4711a86$var$authForm.reset();
        $3f77bd57f4711a86$var$isRegMode = true;
    }
}
$3f77bd57f4711a86$var$userButton.addEventListener("click", $3f77bd57f4711a86$export$a7f6cffb6b8ba11c);
$3f77bd57f4711a86$var$authForm.addEventListener("submit", $3f77bd57f4711a86$export$89c2621768820c8b);
$3f77bd57f4711a86$var$btnChangeForm.addEventListener("click", $3f77bd57f4711a86$var$changeForm);
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") $3f77bd57f4711a86$export$3f6fecd573f3fa48();
});
$3f77bd57f4711a86$var$authModal.addEventListener("click", function(event) {
    if (event.target === $3f77bd57f4711a86$var$authModal) $3f77bd57f4711a86$export$3f6fecd573f3fa48();
});



var $iqmmd = parcelRequire("iqmmd");
parcelRequire("lo6ue");
const $ac329baf2538dd87$var$headerGroup = document.querySelector(".header__user__icons__group");
const $ac329baf2538dd87$var$btnLogOut = document.querySelector(".btn__log__out");
(0, $iqmmd.db).auth().onAuthStateChanged((user)=>{
    if (user) {
        console.log(" USER =>", user);
        console.log("promise");
        setTimeout(()=>{
            (0, $bEAY7.setInCartOnload)();
            (0, $36a0ee730425f3c7$export$29284ae2149307d8)();
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
$ac329baf2538dd87$var$userButton.addEventListener("click", (0, $3f77bd57f4711a86$export$a7f6cffb6b8ba11c));
const $ac329baf2538dd87$var$list = document.querySelector(".favoritesList__list");
$ac329baf2538dd87$var$list.addEventListener("click", $ac329baf2538dd87$var$handleFavorites);
$ac329baf2538dd87$var$list.addEventListener("click", (0, $bEAY7.handleCart));
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
                (0, $36a0ee730425f3c7$export$29284ae2149307d8)();
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
async function $bEAY7.handleCart(event) {
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


//# sourceMappingURL=favorites.4a7e32ee.js.map
