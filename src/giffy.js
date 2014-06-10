var Giffy = function Giffy(config) {
	this.img = config.img;
	this.manifest = this.img.getAttribute('data-manifest');
};

module.exports = Giffy;