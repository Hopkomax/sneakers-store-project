function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},a={},i=n.parcelRequire7084;function s(e){return e.map((({title:e,images:t,price:n,id:r})=>{const a=e.slice(0,23)+"...";return`<li class='sneaker__item' id = "${r}">\n    <div class='sneaker__img__wrapper'>\n    <div class='sneaker__heart__button'>\n</div>\n    <img src="${t[0]}" alt="${e}">\n</div>\n<h4 class='sneaker__title'>${a}</h4>\n<div class='sneaker__price__container'>\n    <div class='sneaker__price__wrapper'>\n        <p class='sneaker__price__label'>Price</p>\n        <p class='sneaker__price'>${n}</p>\n    </div>\n    <div class='sneaker__add__button'>\n        <span class='sneaker__plus__span'></span>\n    </div>\n</div>\n</li>`})).join(" ")}null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in a){var t=a[e];delete a[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){a[e]=t},n.parcelRequire7084=i),i.register("gVub0",(function(t,n){e(t.exports,"getSneakers",(function(){return a})),e(t.exports,"findSneakers",(function(){return i})),e(t.exports,"getSneakerById",(function(){return s}));const r="https://sneakers-store-project.onrender.com",a=async()=>(await fetch(`${r}/sneakers`)).json(),i=async e=>(await fetch(`${r}/sneakers?title_like=${e}`)).json(),s=async e=>(await fetch(`${r}/sneakers/${e}`)).json()}));var o=i("gVub0"),c=i("te3Zi");o=i("gVub0");function l(){const e=JSON.parse(localStorage.getItem("inCart"))||[];document.querySelectorAll(".sneaker__add__button.active").forEach((e=>e.classList.remove("active")));for(const{id:t}of e){const e=document.getElementById(t);if(!e)continue;e.querySelector(".sneaker__add__button").classList.add("active")}}var d=i("l1ee7");c=i("te3Zi");const _=document.querySelector(".theme__switch");const u=document.querySelector(".sneakersList__list");!function(){const e=document.querySelector(".sneakersList__list"),t=[...new Array(6)].map((()=>'\n  <li class="skeleton__item">\n    <div class="skeleton__img__wrapper"></div>\n    <div class="skeleton__title__wrapper">\n      <div class="skeleton__title__long"></div>\n      <div class="skeleton__title__short"></div>\n    </div>\n    <div class="skeleton__price__container">\n      <div class="skeleton__price__wrapper"></div>\n      <div class="skeleton__add_button"></div>\n    </div>\n  </li>\n  ')).join(" ");e.insertAdjacentHTML("afterbegin",t)}(),setTimeout((()=>{(0,o.getSneakers)().then((e=>{u.innerHTML="",u.insertAdjacentHTML("afterbegin",s(e)),l(),(0,d.setFavoritesOnload)()}))}),2e3),document.querySelector(".sneakersList__list").addEventListener("click",d.handleFavorites),document.querySelector(".sneakersList__list").addEventListener("click",(async function(e){const t=e.target;if(console.log(t),t.classList.contains("sneaker__add__button")){const e=t.parentNode.parentNode.id,n=await(0,o.getSneakerById)(e)||{},r=JSON.parse(localStorage.getItem("inCart"))||[];if(console.log(r),t.classList.contains("active")){const n=r.filter((({id:t})=>t!==e));return console.log(n),localStorage.setItem("inCart",JSON.stringify(n)),t.classList.remove("active"),console.log(t),void(0,c.setActualPriceIntoHeader)()}t.classList.add("active"),r.push(n),localStorage.setItem("inCart",JSON.stringify(r)),(0,c.setActualPriceIntoHeader)()}})),document.querySelector(".theme__switch").addEventListener("change",(function(){console.log(_.checked),_.checked?(document.body.classList.add("dark"),localStorage.setItem("theme","dark")):(document.body.classList.remove("dark"),localStorage.setItem("theme","light"))})),(0,c.setActualPriceIntoHeader)(),function(){const e=localStorage.getItem("theme");document.body.classList.add(e),"dark"===e&&(_.checked=!0)}();o=i("gVub0");d=i("l1ee7");var v,p={};p=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)};var f,m={},g={};f="object"==typeof n&&n&&n.Object===Object&&n;var y="object"==typeof self&&self&&self.Object===Object&&self,b=f||y||Function("return this")();m=function(){return g.Date.now()};var k={},h={},S={},L=/\s/;S=function(e){for(var t=e.length;t--&&L.test(e.charAt(t)););return t};var O=/^\s+/;h=function(e){return e?e.slice(0,S(e)+1).replace(O,""):e};var w,C={},j={};w=(g=b).Symbol;var T={},I=Object.prototype,q=I.hasOwnProperty,x=I.toString,A=w?w.toStringTag:void 0;T=function(e){var t=q.call(e,A),n=e[A];try{e[A]=void 0;var r=!0}catch(e){}var a=x.call(e);return r&&(t?e[A]=n:delete e[A]),a};var H={},$=Object.prototype.toString;H=function(e){return $.call(e)};var M="[object Null]",N="[object Undefined]",E=w?w.toStringTag:void 0;j=function(e){return null==e?void 0===e?N:M:E&&E in Object(e)?T(e):H(e)};var P={};P=function(e){return null!=e&&"object"==typeof e};var J="[object Symbol]";C=function(e){return"symbol"==typeof e||P(e)&&j(e)==J};var U=NaN,V=/^[-+]0x[0-9a-f]+$/i,F=/^0b[01]+$/i,R=/^0o[0-7]+$/i,Z=parseInt;k=function(e){if("number"==typeof e)return e;if(C(e))return U;if(p(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=p(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=h(e);var n=F.test(e);return n||R.test(e)?Z(e.slice(2),n?2:8):V.test(e)?U:+e};var D="Expected a function",B=Math.max,W=Math.min;v=function(e,t,n){var r,a,i,s,o,c,l=0,d=!1,_=!1,u=!0;if("function"!=typeof e)throw new TypeError(D);function v(t){var n=r,i=a;return r=a=void 0,l=t,s=e.apply(i,n)}function f(e){var n=e-c;return void 0===c||n>=t||n<0||_&&e-l>=i}function g(){var e=m();if(f(e))return y(e);o=setTimeout(g,function(e){var n=t-(e-c);return _?W(n,i-(e-l)):n}(e))}function y(e){return o=void 0,u&&r?v(e):(r=a=void 0,s)}function b(){var e=m(),n=f(e);if(r=arguments,a=this,c=e,n){if(void 0===o)return function(e){return l=e,o=setTimeout(g,t),d?v(e):s}(c);if(_)return clearTimeout(o),o=setTimeout(g,t),v(c)}return void 0===o&&(o=setTimeout(g,t)),s}return t=k(t)||0,p(n)&&(d=!!n.leading,i=(_="maxWait"in n)?B(k(n.maxWait)||0,t):i,u="trailing"in n?!!n.trailing:u),b.cancel=function(){void 0!==o&&clearTimeout(o),l=0,r=c=a=o=void 0},b.flush=function(){return void 0===o?s:y(m())},b};const X=document.querySelector(".sneakersList__list"),Y=document.querySelector(".search__input");const K=t(v)((async function(e){const t=Y.value.toLowerCase().trim();X.innerHTML="";try{const e=await(0,o.findSneakers)(t);0===e.length&&X.insertAdjacentHTML("afterbegin",'<div class="emptyContent__wrapper" >\n    <div class="emptyContent__img">\n    </div>\n    <h3 class="emptyContent__title">No result found</h3>\n    <p class="emptyContent__text">Please, try again with another keyword</p>\n    <div class="emptyContent__container__button">\n    <a href="index.html"  class="emptyContent__button">Return</a>\n  </div>\n    </div>'),X.insertAdjacentHTML("afterbegin",s(e)),(0,d.setFavoritesOnload)(),l()}catch(e){console.error("Error searching sneakers:",e)}}),500);Y.addEventListener("input",K),i("l1ee7"),i("gVub0");c=i("te3Zi");var z=i("3kuOs");function G(){const e=localStorage.getItem("inCart");let t=localStorage.getItem("purchases");if(t=t?JSON.parse(t):[],e){const n=t.concat(JSON.parse(e));localStorage.setItem("purchases",JSON.stringify(n))}localStorage.removeItem("inCart"),document.querySelector(".cartList__container").innerHTML='\n    <div class="emptyContentOrder__wrapper" >\n    <div class="emptyContentOrder__img"></div>\n    <h3 class="emptyContentOrder__title">Order is processed!</h3>\n    <p class="emptyContentOrder__text">Your order will be delivered to courier soon</p>\n    <div class=\'emptyContentOrder__container__button\'>\n    <a href="index.html" class="emptyContentOrder__button">Return</a>\n    </div>\n    </div>'}function Q(){document.querySelector(".cartList").innerHTML='\n  <div class="cartList__container">\n    <div class="cart__container__top__blok">\n    <h2 class="cartList__title">Cart</h2>\n    <ul class="cartList__list"></ul>\n</div>\n    <div class="cart__container__bottom__blok">\n      <div class="sneaker__inCart__totalAmount">\n        <p>Total</p>\n        <span></span>\n        <p>UAH</p>\n      </div>\n      <div class="sneaker__inCart__taxes">\n        <p>VAT 5%</p>\n        <span></span>\n        <p>UAH</p>\n      </div>\n      <div class="cart__container__button__blok">\n        <button class="cart__container__button">Make order</button>\n      </div>\n    </div>\n  </div>';const e=document.querySelector(".cartList__list"),t=document.querySelector(".cart__container__button");e.addEventListener("click",z.handleDelete),t.addEventListener("click",G)}var ee=i("rXRcA");let te=null;const ne=document.querySelector("#modal-backdrop"),re=document.querySelector(".cartList");document.addEventListener("click",(function(e){const t=JSON.parse(localStorage.getItem("inCart"))||[];if(e.target.closest(".header__user__icon__cart"))if(Q(),te=document.querySelector(".cartList__list"),re.classList.add("active"),ne.classList.remove("hidden"),document.body.style.overflow="hidden",(0,c.setActualPriceIntoCart)(),0===t.length){document.querySelector(".cartList__container").innerHTML=(0,ee.default)()}else te.innerHTML=t.map((({title:e,images:t,price:n,id:r})=>`\n      <li class='sneaker__inCart__item'id=${r}>\n      <img class='sneaker__inCart__img' src="${t[0]}" alt="${e}">\n      <div class='sneaker__inCart__description'>\n          <h3>${e}</h3>\n          <p>${n} UAH</p>\n      </div>\n      <div class='sneaker__inCart__button'>\n          <span class='sneaker__inCart__button-span'>x</span>\n      </div>\n  </li>`)).join(" ");e.target.matches("#modal-backdrop")&&(te.innerHTML="",function(e){e.classList.remove("active"),ne.classList.add("hidden"),document.body.style.overflow="visible"}(re),(0,c.setActualPriceIntoHeader)(),l())})),i("3oIZ9"),i("YKZfX");
//# sourceMappingURL=index.c174ab93.js.map
