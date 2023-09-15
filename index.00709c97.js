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

var $bEAY7 = parcelRequire("bEAY7");

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
        for (const { id: id } of favorites){
            const item = document.getElementById(id);
            if (!item) continue;
            const heartButton = item.querySelector(".sneaker__heart__button");
            heartButton.classList.add("active");
        }
    }, (error)=>{
        console.log("Помилка отримання даних:", error);
    });
}



var $d9MTO = parcelRequire("d9MTO");
function $529054fd081fcd1a$export$2e2bcd8739ae039() {
    const list = document.querySelector(".sneakersList__list");
    const skeletonMarkup = [
        ...new Array(6)
    ].map(()=>{
        return `
  <li class="skeleton__item">
    <div class="skeleton__img__wrapper"></div>
    <div class="skeleton__title__wrapper">
      <div class="skeleton__title__long"></div>
      <div class="skeleton__title__short"></div>
    </div>
    <div class="skeleton__price__container">
      <div class="skeleton__price__wrapper"></div>
      <div class="skeleton__add_button"></div>
    </div>
  </li>
  `;
    }).join(" ");
    list.insertAdjacentHTML("afterbegin", skeletonMarkup);
}



var $03Y6j = parcelRequire("03Y6j");

var $iqmmd = parcelRequire("iqmmd");
const $3df27706487cf5b3$var$list = document.querySelector(".sneakersList__list");
const $3df27706487cf5b3$var$headerGroup = document.querySelector(".header__user__icons__group");
const $3df27706487cf5b3$var$btnLogOut = document.querySelector(".btn__log__out");
(0, $03Y6j.setThemeOnLoad)();
(0, $529054fd081fcd1a$export$2e2bcd8739ae039)();
setTimeout(()=>{
    (0, $lDONj.getSneakers)().then((data)=>{
        $3df27706487cf5b3$var$list.innerHTML = "";
        $3df27706487cf5b3$var$list.insertAdjacentHTML("afterbegin", (0, $1iJ0s.default)(data));
        $3df27706487cf5b3$var$checkCurrentUser();
    });
}, 2000);
async function $3df27706487cf5b3$var$checkCurrentUser() {
    await (0, $iqmmd.db).auth().onAuthStateChanged((user)=>{
        if (user) {
            console.log(" USER =>", user);
            console.log("promise");
            // setTimeout(() => {
            (0, $bEAY7.setInCartOnload)();
            (0, $36a0ee730425f3c7$export$29284ae2149307d8)();
            // setActualPriceIntoHeader();
            (0, $d9MTO.setActualPriceIntoHeader)();
            console.log(" USER =>", user);
            document.querySelector(".header__user__user__name").textContent = user.displayName;
            $3df27706487cf5b3$var$headerGroup.classList.add("visible");
            $3df27706487cf5b3$var$btnLogOut.classList.add("visible");
            console.log(user.displayName);
        } else {
            $3df27706487cf5b3$var$btnLogOut.classList.remove("visible");
            $3df27706487cf5b3$var$headerGroup.classList.remove("visible");
        // btnLogOut.classList.add('hidden');
        }
    });
}
document.querySelector(".sneakersList__list").addEventListener("click", (0, $36a0ee730425f3c7$export$4be896189efc8c9f));
document.querySelector(".sneakersList__list").addEventListener("click", (0, $bEAY7.handleCart));
document.querySelector(".theme__switch").addEventListener("change", (0, $03Y6j.themeSwitch));
document.querySelector(".btn__log__out").addEventListener("click", (0, $iqmmd.signOut));


parcelRequire("1iJ0s");

var $1iJ0s = parcelRequire("1iJ0s");

var $lDONj = parcelRequire("lDONj");
function $e7edab6dd16ff014$export$2e2bcd8739ae039() {
    return `<div class="emptyContent__wrapper" >
    <div class="emptyContent__img">
    </div>
    <h3 class="emptyContent__title">No result found</h3>
    <p class="emptyContent__text">Please, try again with another keyword</p>
    <div class="emptyContent__container__button">
    <a href="index.html"  class="emptyContent__button">Return</a>
  </div>
    </div>`;
}




var $bEAY7 = parcelRequire("bEAY7");
var $64c53e9e90f3fd38$exports = {};
var $dece21280c5e548e$exports = {};
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function $dece21280c5e548e$var$isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
}
$dece21280c5e548e$exports = $dece21280c5e548e$var$isObject;


var $5151486ecb2eed46$exports = {};
var $5d692988e06b59a0$exports = {};
var $ea4ae1e05fac2b77$exports = {};
/** Detect free variable `global` from Node.js. */ var $ea4ae1e05fac2b77$var$freeGlobal = typeof $parcel$global == "object" && $parcel$global && $parcel$global.Object === Object && $parcel$global;
$ea4ae1e05fac2b77$exports = $ea4ae1e05fac2b77$var$freeGlobal;


/** Detect free variable `self`. */ var $5d692988e06b59a0$var$freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var $5d692988e06b59a0$var$root = $ea4ae1e05fac2b77$exports || $5d692988e06b59a0$var$freeSelf || Function("return this")();
$5d692988e06b59a0$exports = $5d692988e06b59a0$var$root;


/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */ var $5151486ecb2eed46$var$now = function() {
    return $5d692988e06b59a0$exports.Date.now();
};
$5151486ecb2eed46$exports = $5151486ecb2eed46$var$now;


var $c63a992535c6decb$exports = {};
var $4debfa1e1b5e190a$exports = {};
var $31ad9ca17a2f5335$exports = {};
/** Used to match a single whitespace character. */ var $31ad9ca17a2f5335$var$reWhitespace = /\s/;
/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */ function $31ad9ca17a2f5335$var$trimmedEndIndex(string) {
    var index = string.length;
    while(index-- && $31ad9ca17a2f5335$var$reWhitespace.test(string.charAt(index)));
    return index;
}
$31ad9ca17a2f5335$exports = $31ad9ca17a2f5335$var$trimmedEndIndex;


/** Used to match leading whitespace. */ var $4debfa1e1b5e190a$var$reTrimStart = /^\s+/;
/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */ function $4debfa1e1b5e190a$var$baseTrim(string) {
    return string ? string.slice(0, $31ad9ca17a2f5335$exports(string) + 1).replace($4debfa1e1b5e190a$var$reTrimStart, "") : string;
}
$4debfa1e1b5e190a$exports = $4debfa1e1b5e190a$var$baseTrim;



var $d825102d0760c32f$exports = {};
var $f1e35466294f4b00$exports = {};
var $678398cd8a3be314$exports = {};

/** Built-in value references. */ var $678398cd8a3be314$var$Symbol = $5d692988e06b59a0$exports.Symbol;
$678398cd8a3be314$exports = $678398cd8a3be314$var$Symbol;


var $49399615d22d7b1c$exports = {};

/** Used for built-in method references. */ var $49399615d22d7b1c$var$objectProto = Object.prototype;
/** Used to check objects for own properties. */ var $49399615d22d7b1c$var$hasOwnProperty = $49399615d22d7b1c$var$objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var $49399615d22d7b1c$var$nativeObjectToString = $49399615d22d7b1c$var$objectProto.toString;
/** Built-in value references. */ var $49399615d22d7b1c$var$symToStringTag = $678398cd8a3be314$exports ? $678398cd8a3be314$exports.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */ function $49399615d22d7b1c$var$getRawTag(value) {
    var isOwn = $49399615d22d7b1c$var$hasOwnProperty.call(value, $49399615d22d7b1c$var$symToStringTag), tag = value[$49399615d22d7b1c$var$symToStringTag];
    try {
        value[$49399615d22d7b1c$var$symToStringTag] = undefined;
        var unmasked = true;
    } catch (e) {}
    var result = $49399615d22d7b1c$var$nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) value[$49399615d22d7b1c$var$symToStringTag] = tag;
        else delete value[$49399615d22d7b1c$var$symToStringTag];
    }
    return result;
}
$49399615d22d7b1c$exports = $49399615d22d7b1c$var$getRawTag;


var $326339dfd4cff539$exports = {};
/** Used for built-in method references. */ var $326339dfd4cff539$var$objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var $326339dfd4cff539$var$nativeObjectToString = $326339dfd4cff539$var$objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */ function $326339dfd4cff539$var$objectToString(value) {
    return $326339dfd4cff539$var$nativeObjectToString.call(value);
}
$326339dfd4cff539$exports = $326339dfd4cff539$var$objectToString;


/** `Object#toString` result references. */ var $f1e35466294f4b00$var$nullTag = "[object Null]", $f1e35466294f4b00$var$undefinedTag = "[object Undefined]";
/** Built-in value references. */ var $f1e35466294f4b00$var$symToStringTag = $678398cd8a3be314$exports ? $678398cd8a3be314$exports.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ function $f1e35466294f4b00$var$baseGetTag(value) {
    if (value == null) return value === undefined ? $f1e35466294f4b00$var$undefinedTag : $f1e35466294f4b00$var$nullTag;
    return $f1e35466294f4b00$var$symToStringTag && $f1e35466294f4b00$var$symToStringTag in Object(value) ? $49399615d22d7b1c$exports(value) : $326339dfd4cff539$exports(value);
}
$f1e35466294f4b00$exports = $f1e35466294f4b00$var$baseGetTag;


var $b5cc5dd8f121853d$exports = {};
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function $b5cc5dd8f121853d$var$isObjectLike(value) {
    return value != null && typeof value == "object";
}
$b5cc5dd8f121853d$exports = $b5cc5dd8f121853d$var$isObjectLike;


/** `Object#toString` result references. */ var $d825102d0760c32f$var$symbolTag = "[object Symbol]";
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function $d825102d0760c32f$var$isSymbol(value) {
    return typeof value == "symbol" || $b5cc5dd8f121853d$exports(value) && $f1e35466294f4b00$exports(value) == $d825102d0760c32f$var$symbolTag;
}
$d825102d0760c32f$exports = $d825102d0760c32f$var$isSymbol;


/** Used as references for various `Number` constants. */ var $c63a992535c6decb$var$NAN = 0 / 0;
/** Used to detect bad signed hexadecimal string values. */ var $c63a992535c6decb$var$reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var $c63a992535c6decb$var$reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var $c63a992535c6decb$var$reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */ var $c63a992535c6decb$var$freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function $c63a992535c6decb$var$toNumber(value) {
    if (typeof value == "number") return value;
    if ($d825102d0760c32f$exports(value)) return $c63a992535c6decb$var$NAN;
    if ($dece21280c5e548e$exports(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = $dece21280c5e548e$exports(other) ? other + "" : other;
    }
    if (typeof value != "string") return value === 0 ? value : +value;
    value = $4debfa1e1b5e190a$exports(value);
    var isBinary = $c63a992535c6decb$var$reIsBinary.test(value);
    return isBinary || $c63a992535c6decb$var$reIsOctal.test(value) ? $c63a992535c6decb$var$freeParseInt(value.slice(2), isBinary ? 2 : 8) : $c63a992535c6decb$var$reIsBadHex.test(value) ? $c63a992535c6decb$var$NAN : +value;
}
$c63a992535c6decb$exports = $c63a992535c6decb$var$toNumber;


/** Error message constants. */ var $64c53e9e90f3fd38$var$FUNC_ERROR_TEXT = "Expected a function";
/* Built-in method references for those with the same name as other `lodash` methods. */ var $64c53e9e90f3fd38$var$nativeMax = Math.max, $64c53e9e90f3fd38$var$nativeMin = Math.min;
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */ function $64c53e9e90f3fd38$var$debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") throw new TypeError($64c53e9e90f3fd38$var$FUNC_ERROR_TEXT);
    wait = $c63a992535c6decb$exports(wait) || 0;
    if ($dece21280c5e548e$exports(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? $64c53e9e90f3fd38$var$nativeMax($c63a992535c6decb$exports(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
        return maxing ? $64c53e9e90f3fd38$var$nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
        var time = $5151486ecb2eed46$exports();
        if (shouldInvoke(time)) return trailingEdge(time);
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = undefined;
        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) return invokeFunc(time);
        lastArgs = lastThis = undefined;
        return result;
    }
    function cancel() {
        if (timerId !== undefined) clearTimeout(timerId);
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge($5151486ecb2eed46$exports());
    }
    function debounced() {
        var time = $5151486ecb2eed46$exports(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) return leadingEdge(lastCallTime);
            if (maxing) {
                // Handle invocations in a tight loop.
                clearTimeout(timerId);
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) timerId = setTimeout(timerExpired, wait);
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}
$64c53e9e90f3fd38$exports = $64c53e9e90f3fd38$var$debounce;


const $72a2265e6e4011ce$var$list = document.querySelector(".sneakersList__list");
const $72a2265e6e4011ce$var$input = document.querySelector(".search__input");
async function $72a2265e6e4011ce$var$search(event) {
    const inputValue = $72a2265e6e4011ce$var$input.value.toLowerCase().trim();
    $72a2265e6e4011ce$var$list.innerHTML = "";
    try {
        const data = await (0, $lDONj.findSneakers)(inputValue);
        if (data.length === 0) $72a2265e6e4011ce$var$list.insertAdjacentHTML("afterbegin", (0, $e7edab6dd16ff014$export$2e2bcd8739ae039)());
        $72a2265e6e4011ce$var$list.insertAdjacentHTML("afterbegin", (0, $1iJ0s.default)(data));
        (0, $36a0ee730425f3c7$export$29284ae2149307d8)();
        (0, $bEAY7.setInCartOnload)();
    } catch (error) {
        console.error("Error searching sneakers:", error);
    }
}
const $72a2265e6e4011ce$var$debouncedSearch = (0, (/*@__PURE__*/$parcel$interopDefault($64c53e9e90f3fd38$exports)))($72a2265e6e4011ce$var$search, 500);
$72a2265e6e4011ce$var$input.addEventListener("input", $72a2265e6e4011ce$var$debouncedSearch);




parcelRequire("bEAY7");
parcelRequire("lDONj");
parcelRequire("2wACO");
parcelRequire("j5Pfr");
parcelRequire("ZMfkQ");
parcelRequire("03Y6j");
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


function $bda1df280237c685$export$2e2bcd8739ae039(items) {
    const markup = items.map(({ order: order, createdAt: createdAt })=>{
        console.log(createdAt);
        const normalDate = new Date(createdAt.toDate()).toLocaleString("en-GB", {
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            month: "long",
            year: "numeric"
        });
        return `
    <li class="purchasesList__item">
    <p class="purchasesItem__date">${normalDate}</p>
    <ul class="purchasesItem__sneakers"> ${order.map(({ title: title, images: images, price: price, id: id })=>{
            const formatedTitle = title.slice(0, 20) + "...";
            return `
      <li class='sneaker__InPurchases__item'id=${id}>
      <img class='sneaker__InPurchases__img' src="${images[0]}" alt="${formatedTitle}">
      <div class='sneaker__InPurchases__description'>
          <h3>${formatedTitle}</h3>
          <p>${price} UAH</p>
      </div>
  </li>`;
        }).join(" ")}
    </ul>
  </li>`;
    }).join(" ");
    return markup;
} //  const markup = orders.map(({order, createdAt}) => {
 //   return `
 //   <li>
 //   <p>10.06</p>
 //   <ul> ${order.map(({title}) => `<li>${title}</li>`)}
 //   </ul>
 // </li>`
 // })



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
        const currentPath = window.location.pathname;
        const basePath = currentPath.endsWith("/index.html") ? currentPath.slice(0, -11) : currentPath;
        const newURL = `${window.location.origin}${basePath}/purchases.html`;
        const finalURL = newURL.replace("/favorites.html", "");
        window.location.replace(finalURL);
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


//# sourceMappingURL=index.00709c97.js.map
