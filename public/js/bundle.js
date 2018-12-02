/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Beers = __webpack_require__(/*! ./models/beers.js */ \"./src/models/beers.js\");\nconst BeerListView = __webpack_require__(/*! ./views/beer_list_view.js */ \"./src/views/beer_list_view.js\");\nconst BeerView = __webpack_require__(/*! ./views/beer_view.js */ \"./src/views/beer_view.js\");\nconst ErrorView = __webpack_require__(/*! ./views/error_view.js */ \"./src/views/error_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const beers = new Beers();\n  beers.getData();\n\n  const beersList = document.querySelector('div#beers-container');\n  const beerListView = new BeerListView(beersList);\n  beerListView.bindEvents();\n\n  const errorView = new ErrorView(beersList);\n  errorView.bindEvents();\n\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request.js":
/*!********************************!*\
  !*** ./src/helpers/request.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function (url) {\n  this.url = url;\n};\n\nRequest.prototype.get = function () {\n  return fetch(this.url)\n    .then(res => res.json());\n};\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./src/helpers/request.js?");

/***/ }),

/***/ "./src/models/beers.js":
/*!*****************************!*\
  !*** ./src/models/beers.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Request = __webpack_require__(/*! ../helpers/request.js */ \"./src/helpers/request.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst Beers = function () {\n  this.beerList = null;\n  this.beer = null;\n};\n\nBeers.prototype.bindEvents = function () {\n  PubSub.subscribe('BeerView:beer-clicked', event => {\n    const beer = event.detail;\n    this.getDataId(beer);\n  });\n};\n\nBeers.prototype.getData = function () {\nconst url = `https://api.punkapi.com/v2/beers?per_page=50`;\n  const request = new Request(url);\n  request.get()\n    .then((beers) => {\n      this.beerList = beers;\n      PubSub.publish('Beers:all-ready', this.beerList);\n    })\n    .catch((err) => {\n      PubSub.publish('Beers:error', err);\n    });\n};\n\nBeers.prototype.getDataId = function (id) {\nconst url = `https://api.punkapi.com/v2/beers/${id}`;\n  const request = new Request(url);\n  request.get()\n    .then((beer) => {\n      this.beer = beer;\n      PubSub.publish('Beers:bearInfo-ready', this.beer);\n    })\n    .catch((err) => {\n      PubSub.publish('Beers:error', err);\n    });\n};\n\n\n\nmodule.exports = Beers;\n\n\n//# sourceURL=webpack:///./src/models/beers.js?");

/***/ }),

/***/ "./src/views/beer_list_view.js":
/*!*************************************!*\
  !*** ./src/views/beer_list_view.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst BeerView = __webpack_require__(/*! ./beer_view.js */ \"./src/views/beer_view.js\");\n\nconst BeerListView = function (container) {\n  this.container = container;\n};\n\nBeerListView.prototype.bindEvents = function () {\n  PubSub.subscribe('Beers:all-ready', event => {\n    const beers = event.detail;\n    this.render(beers);\n\n    this.container.addEventListener('click', (event) => {\n      const clickedBeerId = event.target.id;\n      if (clickedBeerId === \"\"){\n        return;\n      }\n      PubSub.publish('BeerView:beer-clicked', clickedBeerId);\n      console.log(clickedBeerId);\n    });\n  });\n};\n\nBeerListView.prototype.render = function (beers) {\n  this.container.innerHTML = '';\n  beers.forEach(beer => {\n    const beerListItem = new BeerView(this.container);\n    beerListItem.render(beer);\n  });\n};\n\n\n\nmodule.exports = BeerListView;\n\n\n//# sourceURL=webpack:///./src/views/beer_list_view.js?");

/***/ }),

/***/ "./src/views/beer_view.js":
/*!********************************!*\
  !*** ./src/views/beer_view.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst BeerView = function (container) {\n  this.parentContainer = container;\n};\n\nBeerView.prototype.render = function (beer) {\n  const container = document.createElement('div');\n  container.classList.add('beer');\n  const link = document.createElement('a');\n  const beerName = document.createElement('h2');\n  beerName.textContent = beer.name || beer.error;\n  beerName.setAttribute('id', `${beer.id}`);\n  link.appendChild(beerName);\n  container.appendChild(link);\n  const beerDescription = document.createElement('p');\n  beerDescription.textContent = beer.description || beer.error;\n  container.appendChild(beerDescription);\n  const beerABV = document.createElement('p');\n  beerABV.textContent = `alc/vol: ${beer.abv || beer.error}`;\n  container.appendChild(beerABV);\n  const beerDate = document.createElement('p');\n  beerDate.textContent = `First brewed: ${beer.first_brewed || beer.error}`;\n  container.appendChild(beerDate);\n\n  this.parentContainer.appendChild(container);\n};\n\nmodule.exports = BeerView;\n\n\n//# sourceURL=webpack:///./src/views/beer_view.js?");

/***/ }),

/***/ "./src/views/error_view.js":
/*!*********************************!*\
  !*** ./src/views/error_view.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst ErrorView = function (container) {\n  this.container = container;\n};\n\nErrorView.prototype.bindEvents = function () {\n  PubSub.subscribe('Activity:error', (evt) => {\n    const err = evt.detail;\n    this.render(err);\n  });\n};\n\n\nErrorView.prototype.render = function (err) {\n  console.error(err);\n\n  this.container.innerHTML = '';\n  const errorMessage = document.createElement('p');\n  errorMessage.textContent = 'Oops! Something seems to have gone wrong.';\n  this.container.appendChild(errorMessage);\n};\n\nmodule.exports = ErrorView;\n\n\n//# sourceURL=webpack:///./src/views/error_view.js?");

/***/ })

/******/ });