const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Beers = function () {
  this.beerList = null;
  this.beer = null;
};

Beers.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:abv-selected', event => {
    const selectedAbv = event.detail;
    const beersByAbv = this.getBeersByAbv(selectedAbv);
    console.log(beersByAbv);
    PubSub.publish('Beers:all-ready', beersByAbv);
  });
};

Beers.prototype.getData = function () {
const url = `https://api.punkapi.com/v2/beers?per_page=50`;
  const request = new Request(url);
  request.get()
    .then((beers) => {
      this.beerList = beers;
      const optionsList = this.getListOfAbvs();
      optionsList.sort(function(a,b) { return a - b;});;
      console.log(optionsList);
      PubSub.publish('Beers:all-ready', this.beerList);
      PubSub.publish('Beers:options-ready', optionsList)
    })
    .catch((err) => {
      PubSub.publish('Beers:error', err);
    });
};

Beers.prototype.getDataId = function (id) {
const url = `https://api.punkapi.com/v2/beers/${id}`;
  const request = new Request(url);
  request.get()
    .then((beer) => {
      this.beer = beer;
      PubSub.publish('Beers:bearInfo-ready', this.beer);
    })
    .catch((err) => {
      PubSub.publish('Beers:error', err);
    });
};

Beers.prototype.getListOfAbvs = function () {
  return this.beerList
  .map(beer => parseFloat(beer.abv))
  .filter((abv, index, beerList) => beerList.indexOf(abv) === index);
};

Beers.prototype.getBeersByAbv = function (abv) {
  const newAbv = parseFloat(abv);
  return this.beerList.filter(beer => beer.abv === newAbv);
};

// TODO expand
// Beers.prototype.bindEvents = function () {
//   PubSub.subscribe('BeerView:beer-clicked', event => {
//     const beer = event.detail;
//     this.getDataId(beer);
//   });
// };

module.exports = Beers;
