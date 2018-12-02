const Beers = require('./models/beers.js');
const BeerListView = require('./views/beer_list_view.js');
const BeerView = require('./views/beer_view.js');
const ErrorView = require('./views/error_view.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const beers = new Beers();
  beers.bindEvents();
  beers.getData();

  const beersList = document.querySelector('div#beers-container');
  const beerListView = new BeerListView(beersList);
  beerListView.bindEvents();

  const errorView = new ErrorView(beersList);
  errorView.bindEvents();

  const optionsSelect = document.querySelector('#options');
  const selectView = new SelectView(optionsSelect);
  selectView.bindEvents();

});
