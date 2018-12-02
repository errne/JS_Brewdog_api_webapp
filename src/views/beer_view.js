const PubSub = require('../helpers/pub_sub.js');

const BeerView = function (container) {
  this.parentContainer = container;
};

BeerView.prototype.render = function (beer) {
  const container = document.createElement('div');
  container.classList.add('beer');
  const beerName = document.createElement('h2');
  beerName.textContent = beer.name || beer.error;
  beerName.setAttribute('id', `${beer.id}`);
  container.appendChild(beerName);
  
  const beerDescription = document.createElement('p');
  beerDescription.textContent = beer.description || beer.error;
  container.appendChild(beerDescription);
  const beerABV = document.createElement('p');
  beerABV.textContent = `alc/vol: ${beer.abv || beer.error}`;
  container.appendChild(beerABV);
  const beerDate = document.createElement('p');
  beerDate.textContent = `First brewed: ${beer.first_brewed || beer.error}`;
  container.appendChild(beerDate);
  const beerImage = document.createElement('img');
  beerImage.setAttribute('src', beer.image_url|| beer.error);
  beerImage.classList.add('image');
  container.appendChild(beerImage);

  this.parentContainer.appendChild(container);
};

module.exports = BeerView;
