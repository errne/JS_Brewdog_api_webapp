const PubSub = require('../helpers/pub_sub.js');

const SelectView = function (element) {
  this.element = element;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Beers:options-ready', event => {
    const options = event.detail;
    this.populate(options);
  });

  this.element.addEventListener('change', (event) => {
    const selectedABV = event.target.value;
    PubSub.publish('SelectView:abv-selected', selectedABV);
  })
};

SelectView.prototype.populate = function (options) {
  options.forEach((abv) => {
    const option = document.createElement('option');
    option.textContent = abv;
    this.element.appendChild(option);
  });
};

module.exports = SelectView;
