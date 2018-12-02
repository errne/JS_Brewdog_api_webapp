const Beers = require('./models/beers.js');
const BeerListView = require('./views/beer_list_view.js');
const BeerView = require('./views/beer_view.js');
const ErrorView = require('./views/error_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const beers = new Beers();
  beers.getData();

  const beersList = document.querySelector('div#beers-container');
  const beerListView = new BeerListView(beersList);
  beerListView.bindEvents();

  const errorView = new ErrorView(beersList);
  errorView.bindEvents();

});
