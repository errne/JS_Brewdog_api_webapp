const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Beers = function () {
  this.beerList = null;
  this.beer = null;
};

Beers.prototype.bindEvents = function () {
  PubSub.subscribe('BeerView:beer-clicked', event => {
    const beer = event.detail;
    this.getDataId(beer);
  });
};

Beers.prototype.getData = function () {
const url = `https://api.punkapi.com/v2/beers?per_page=50`;
  const request = new Request(url);
  request.get()
    .then((beers) => {
      this.beerList = beers;
      PubSub.publish('Beers:all-ready', this.beerList);
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



module.exports = Beers;
