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

var $9jwmw = parcelRequire("9jwmw");

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



var $iDdm1 = parcelRequire("iDdm1");
function $47dd2b1f0903dba9$export$2e2bcd8739ae039() {
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



var $lGpGj = parcelRequire("lGpGj");

var $eJHP4 = parcelRequire("eJHP4");
const $33990869035dc605$var$list = document.querySelector(".sneakersList__list");
const $33990869035dc605$var$headerGroup = document.querySelector(".header__user__icons__group");
const $33990869035dc605$var$btnLogOut = document.querySelector(".btn__log__out");
(0, $lGpGj.setThemeOnLoad)();
(0, $47dd2b1f0903dba9$export$2e2bcd8739ae039)();
setTimeout(()=>{
    (0, $9FS1E.getSneakers)().then((data)=>{
        $33990869035dc605$var$list.innerHTML = "";
        $33990869035dc605$var$list.insertAdjacentHTML("afterbegin", (0, $j5HDT.default)(data));
        $33990869035dc605$var$checkCurrentUser();
    });
}, 2000);
async function $33990869035dc605$var$checkCurrentUser() {
    await (0, $eJHP4.db).auth().onAuthStateChanged((user)=>{
        if (user) {
            console.log(" USER =>", user);
            console.log("promise");
            // setTimeout(() => {
            (0, $9jwmw.setInCartOnload)();
            (0, $1080de6416cd3505$export$29284ae2149307d8)();
            // setActualPriceIntoHeader();
            (0, $iDdm1.setActualPriceIntoHeader)();
            console.log(" USER =>", user);
            document.querySelector(".header__user__user__name").textContent = user.displayName;
            $33990869035dc605$var$headerGroup.classList.add("visible");
            $33990869035dc605$var$btnLogOut.classList.add("visible");
            console.log(user.displayName);
        } else {
            $33990869035dc605$var$btnLogOut.classList.remove("visible");
            $33990869035dc605$var$headerGroup.classList.remove("visible");
        // btnLogOut.classList.add('hidden');
        }
    });
}
document.querySelector(".sneakersList__list").addEventListener("click", (0, $1080de6416cd3505$export$4be896189efc8c9f));
document.querySelector(".sneakersList__list").addEventListener("click", (0, $9jwmw.handleCart));
document.querySelector(".theme__switch").addEventListener("change", (0, $lGpGj.themeSwitch));
document.querySelector(".btn__log__out").addEventListener("click", (0, $eJHP4.signOut));


parcelRequire("j5HDT");

var $j5HDT = parcelRequire("j5HDT");

var $9FS1E = parcelRequire("9FS1E");
function $41dfba78f78355f9$export$2e2bcd8739ae039() {
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




var $9jwmw = parcelRequire("9jwmw");
var $752efb17a5bb51b9$exports = {};
var $5721719246650e46$exports = {};
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
 */ function $5721719246650e46$var$isObject(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
}
$5721719246650e46$exports = $5721719246650e46$var$isObject;


var $196987ee540a7e50$exports = {};
var $355a297594c706b7$exports = {};
var $a5d144d0be2f7977$exports = {};
/** Detect free variable `global` from Node.js. */ var $a5d144d0be2f7977$var$freeGlobal = typeof $parcel$global == "object" && $parcel$global && $parcel$global.Object === Object && $parcel$global;
$a5d144d0be2f7977$exports = $a5d144d0be2f7977$var$freeGlobal;


/** Detect free variable `self`. */ var $355a297594c706b7$var$freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var $355a297594c706b7$var$root = $a5d144d0be2f7977$exports || $355a297594c706b7$var$freeSelf || Function("return this")();
$355a297594c706b7$exports = $355a297594c706b7$var$root;


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
 */ var $196987ee540a7e50$var$now = function() {
    return $355a297594c706b7$exports.Date.now();
};
$196987ee540a7e50$exports = $196987ee540a7e50$var$now;


var $644cbf4361d8480e$exports = {};
var $6a4ab52f0c34763e$exports = {};
var $4800f88f979fbc9d$exports = {};
/** Used to match a single whitespace character. */ var $4800f88f979fbc9d$var$reWhitespace = /\s/;
/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */ function $4800f88f979fbc9d$var$trimmedEndIndex(string) {
    var index = string.length;
    while(index-- && $4800f88f979fbc9d$var$reWhitespace.test(string.charAt(index)));
    return index;
}
$4800f88f979fbc9d$exports = $4800f88f979fbc9d$var$trimmedEndIndex;


/** Used to match leading whitespace. */ var $6a4ab52f0c34763e$var$reTrimStart = /^\s+/;
/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */ function $6a4ab52f0c34763e$var$baseTrim(string) {
    return string ? string.slice(0, $4800f88f979fbc9d$exports(string) + 1).replace($6a4ab52f0c34763e$var$reTrimStart, "") : string;
}
$6a4ab52f0c34763e$exports = $6a4ab52f0c34763e$var$baseTrim;



var $bfaf94ad080ee92a$exports = {};
var $99885e458f8e8ebe$exports = {};
var $6c2a83ea1523ecea$exports = {};

/** Built-in value references. */ var $6c2a83ea1523ecea$var$Symbol = $355a297594c706b7$exports.Symbol;
$6c2a83ea1523ecea$exports = $6c2a83ea1523ecea$var$Symbol;


var $000f1918f91bf441$exports = {};

/** Used for built-in method references. */ var $000f1918f91bf441$var$objectProto = Object.prototype;
/** Used to check objects for own properties. */ var $000f1918f91bf441$var$hasOwnProperty = $000f1918f91bf441$var$objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var $000f1918f91bf441$var$nativeObjectToString = $000f1918f91bf441$var$objectProto.toString;
/** Built-in value references. */ var $000f1918f91bf441$var$symToStringTag = $6c2a83ea1523ecea$exports ? $6c2a83ea1523ecea$exports.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */ function $000f1918f91bf441$var$getRawTag(value) {
    var isOwn = $000f1918f91bf441$var$hasOwnProperty.call(value, $000f1918f91bf441$var$symToStringTag), tag = value[$000f1918f91bf441$var$symToStringTag];
    try {
        value[$000f1918f91bf441$var$symToStringTag] = undefined;
        var unmasked = true;
    } catch (e) {}
    var result = $000f1918f91bf441$var$nativeObjectToString.call(value);
    if (unmasked) {
        if (isOwn) value[$000f1918f91bf441$var$symToStringTag] = tag;
        else delete value[$000f1918f91bf441$var$symToStringTag];
    }
    return result;
}
$000f1918f91bf441$exports = $000f1918f91bf441$var$getRawTag;


var $f7baf0202122c59c$exports = {};
/** Used for built-in method references. */ var $f7baf0202122c59c$var$objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var $f7baf0202122c59c$var$nativeObjectToString = $f7baf0202122c59c$var$objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */ function $f7baf0202122c59c$var$objectToString(value) {
    return $f7baf0202122c59c$var$nativeObjectToString.call(value);
}
$f7baf0202122c59c$exports = $f7baf0202122c59c$var$objectToString;


/** `Object#toString` result references. */ var $99885e458f8e8ebe$var$nullTag = "[object Null]", $99885e458f8e8ebe$var$undefinedTag = "[object Undefined]";
/** Built-in value references. */ var $99885e458f8e8ebe$var$symToStringTag = $6c2a83ea1523ecea$exports ? $6c2a83ea1523ecea$exports.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ function $99885e458f8e8ebe$var$baseGetTag(value) {
    if (value == null) return value === undefined ? $99885e458f8e8ebe$var$undefinedTag : $99885e458f8e8ebe$var$nullTag;
    return $99885e458f8e8ebe$var$symToStringTag && $99885e458f8e8ebe$var$symToStringTag in Object(value) ? $000f1918f91bf441$exports(value) : $f7baf0202122c59c$exports(value);
}
$99885e458f8e8ebe$exports = $99885e458f8e8ebe$var$baseGetTag;


var $5f4621a4171ab462$exports = {};
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
 */ function $5f4621a4171ab462$var$isObjectLike(value) {
    return value != null && typeof value == "object";
}
$5f4621a4171ab462$exports = $5f4621a4171ab462$var$isObjectLike;


/** `Object#toString` result references. */ var $bfaf94ad080ee92a$var$symbolTag = "[object Symbol]";
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
 */ function $bfaf94ad080ee92a$var$isSymbol(value) {
    return typeof value == "symbol" || $5f4621a4171ab462$exports(value) && $99885e458f8e8ebe$exports(value) == $bfaf94ad080ee92a$var$symbolTag;
}
$bfaf94ad080ee92a$exports = $bfaf94ad080ee92a$var$isSymbol;


/** Used as references for various `Number` constants. */ var $644cbf4361d8480e$var$NAN = 0 / 0;
/** Used to detect bad signed hexadecimal string values. */ var $644cbf4361d8480e$var$reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var $644cbf4361d8480e$var$reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var $644cbf4361d8480e$var$reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */ var $644cbf4361d8480e$var$freeParseInt = parseInt;
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
 */ function $644cbf4361d8480e$var$toNumber(value) {
    if (typeof value == "number") return value;
    if ($bfaf94ad080ee92a$exports(value)) return $644cbf4361d8480e$var$NAN;
    if ($5721719246650e46$exports(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = $5721719246650e46$exports(other) ? other + "" : other;
    }
    if (typeof value != "string") return value === 0 ? value : +value;
    value = $6a4ab52f0c34763e$exports(value);
    var isBinary = $644cbf4361d8480e$var$reIsBinary.test(value);
    return isBinary || $644cbf4361d8480e$var$reIsOctal.test(value) ? $644cbf4361d8480e$var$freeParseInt(value.slice(2), isBinary ? 2 : 8) : $644cbf4361d8480e$var$reIsBadHex.test(value) ? $644cbf4361d8480e$var$NAN : +value;
}
$644cbf4361d8480e$exports = $644cbf4361d8480e$var$toNumber;


/** Error message constants. */ var $752efb17a5bb51b9$var$FUNC_ERROR_TEXT = "Expected a function";
/* Built-in method references for those with the same name as other `lodash` methods. */ var $752efb17a5bb51b9$var$nativeMax = Math.max, $752efb17a5bb51b9$var$nativeMin = Math.min;
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
 */ function $752efb17a5bb51b9$var$debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") throw new TypeError($752efb17a5bb51b9$var$FUNC_ERROR_TEXT);
    wait = $644cbf4361d8480e$exports(wait) || 0;
    if ($5721719246650e46$exports(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? $752efb17a5bb51b9$var$nativeMax($644cbf4361d8480e$exports(options.maxWait) || 0, wait) : maxWait;
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
        return maxing ? $752efb17a5bb51b9$var$nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
        var time = $196987ee540a7e50$exports();
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
        return timerId === undefined ? result : trailingEdge($196987ee540a7e50$exports());
    }
    function debounced() {
        var time = $196987ee540a7e50$exports(), isInvoking = shouldInvoke(time);
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
$752efb17a5bb51b9$exports = $752efb17a5bb51b9$var$debounce;


const $1ed19c11baf902a7$var$list = document.querySelector(".sneakersList__list");
const $1ed19c11baf902a7$var$input = document.querySelector(".search__input");
async function $1ed19c11baf902a7$var$search(event) {
    const inputValue = $1ed19c11baf902a7$var$input.value.toLowerCase().trim();
    $1ed19c11baf902a7$var$list.innerHTML = "";
    try {
        const data = await (0, $9FS1E.findSneakers)(inputValue);
        if (data.length === 0) $1ed19c11baf902a7$var$list.insertAdjacentHTML("afterbegin", (0, $41dfba78f78355f9$export$2e2bcd8739ae039)());
        $1ed19c11baf902a7$var$list.insertAdjacentHTML("afterbegin", (0, $j5HDT.default)(data));
        (0, $1080de6416cd3505$export$29284ae2149307d8)();
        (0, $9jwmw.setInCartOnload)();
    } catch (error) {
        console.error("Error searching sneakers:", error);
    }
}
const $1ed19c11baf902a7$var$debouncedSearch = (0, (/*@__PURE__*/$parcel$interopDefault($752efb17a5bb51b9$exports)))($1ed19c11baf902a7$var$search, 500);
$1ed19c11baf902a7$var$input.addEventListener("input", $1ed19c11baf902a7$var$debouncedSearch);




parcelRequire("9jwmw");
parcelRequire("9FS1E");
parcelRequire("30aga");
parcelRequire("g33fn");
parcelRequire("103Hm");
parcelRequire("lGpGj");
parcelRequire("gq42V");
function $0ff4aedaabdabfe3$export$2e2bcd8739ae039(items) {
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
    if (curentUser) {
        console.log(curentUser);
        $a969998314c3f48f$var$userName.textContent = curentUser.displayName;
    } else console.log("user not found");
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

})();
//# sourceMappingURL=index.020f1140.js.map
