const PubSub = require('../helpers/pub_sub.js');
const BeerView = require('./beer_view.js');

const BeerListView = function (container) {
  this.container = container;
};

BeerListView.prototype.bindEvents = function () {
  PubSub.subscribe('Beers:all-ready', event => {
    const beers = event.detail;
    this.render(beers);

    this.container.addEventListener('click', (event) => {
      const clickedBeerId = event.target.id;
      if (clickedBeerId === ""){
        return;
      }
      PubSub.publish('BeerView:beer-clicked', clickedBeerId);
      console.log(clickedBeerId);
    });
  });
};

BeerListView.prototype.render = function (beers) {
  this.container.innerHTML = '';
  beers.forEach(beer => {
    const beerListItem = new BeerView(this.container);
    beerListItem.render(beer);
  });
};



module.exports = BeerListView;
