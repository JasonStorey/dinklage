var Dinklage = function Dinklage(config) {
	this.img = config.img;
	this.manifest = this.img.getAttribute('data-manifest');
};

module.exports = Dinklage;