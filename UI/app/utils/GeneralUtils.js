module.exports = {
	capitalizeFirstLetter: function(string) {
		if(string != '' && string != undefined && string != null) {
			return string[0].toUpperCase() + string.slice(1);
		} else {
			return string;
		}
	}
};
