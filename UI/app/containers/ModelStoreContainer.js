var React = require('react');
var PropTypes = React.PropTypes;
var ModelStore = require('../components/ModelStore');

var ModelStoreContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			modelsList: [],
			categoriesList: [],
			message: ''
		};
	},
	componentWillMount: function() {
		this.getModels();
		this.getCategories();
	},
	getModels: function() {
		var xhr = new XMLHttpRequest();

		var onProgress = function(e) {
			this.setState({
				message: 'Loading ...'
			});
		}.bind(this);

		var onError = function(e) {
			this.setState({
				message: 'Failed to load list of models!'
			});
		}.bind(this);

		var onReady = function(e) {
			if(xhr.readyState == 4 && xhr.status == 200) {
				var response = JSON.parse(xhr.responseText);
				console.log('responseJSON', response);
				this.setState({
					modelsList: response
				});
				if(this.state.modelsList.length <= 0) {
					this.setState({
						message: 'Cannot find any models! Contribute one please!!.'
					});
				} else {
					localStorage.setItem('modelsList', JSON.stringify(this.state.modelsList));
				}
			}
		}.bind(this);

		var formData = new FormData();
		formData.append('modelID', '3a3b59d2-cfd0-4ab1-bce3-c64fce62f77d');
		xhr.open('get', 'http://deepc05.acis.ufl.edu:7070/getModel', true);
		xhr.addEventListener('error', onError, false);
		xhr.addEventListener('progress', onProgress, false);
		xhr.send(formData);
		xhr.addEventListener('readystatechange', onReady, false);
	},
	getCategories: function() {
		var xhr = new XMLHttpRequest();

		var onProgress = function(e) {
			this.setState({
				categoriesList: []
			});
		}.bind(this);

		var onError = function(e) {
			this.setState({
				categoriesList: ['Error']
			});
		}.bind(this);

		var onReady = function(e) {
			if(xhr.readyState === 4 && xhr.status === 200) {
				var response = JSON.parse(xhr.responseText);
				console.log('categories :: ', response);
				this.setState({
					categoriesList: response
				});
				if(this.state.categoriesList.length <= 0) {
					this.setState({
						categoriesList: 'No categories'
					});
				}
				localStorage.setItem('categoriesList', JSON.stringify(this.state.categoriesList));
			}
		}.bind(this);

		xhr.open('get', 'http://deepc05.acis.ufl.edu:7070/getCategories', true);
		xhr.addEventListener('error', onError, false);
		xhr.addEventListener('progress', onProgress, false);
		xhr.addEventListener('readystatechange', onReady, false);
		xhr.send();
	},
	componentDidMount: function() {
		$('select.dropdown').dropdown();
		$('.ui.rating').rating();
	},
	componentWillReceiveProps: function() {
	},
	render: function() {
		//if(this.state.modelsList.length > 0) {
			return(
				<ModelStore
					modelsList={this.state.modelsList}
					categoriesList={this.state.categoriesList} />
			);
		/*} else {
			return(
				<div>{this.state.message}</div>
			);
		}*/
	}
});

module.exports = ModelStoreContainer;
