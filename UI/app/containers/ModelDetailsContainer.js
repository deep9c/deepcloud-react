var React = require('react');
var PropTypes = React.PropTypes;
var ModelDetails = require('../components/ModelDetails');

var ModelDetailsContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			modelReview: '',
			modelRating: 3
		};
	},
	handleAddReview: function() {
		var self = this;
		var rating = $('#set-rating').rating('get rating');
		this.setState({
			modelRating: rating
		});
		var xhr = new XMLHttpRequest();
		var onError = function (e) {
			self.handleErrorResponse();
		};
		var onReady = function(e) {
			if(xhr.readyState == 4 && xhr.status == 200) {
				self.handleSuccessSubmit();
			}
		};
		var formData = new FormData();
		formData.append('review', this.state.modelReview);
		formData.append('rating', this.state.rating);
		xhr.open('post', 'http://deepc05.acis.ufl.edu:7070/addReview', true);
		xhr.addEventListener('error', onError, false);
		xhr.send(formData);
	},
	handleErrorResponse: function() {
		$('.ui.basic.modal')
			.modal('show');
	},
	handleSuccessSubmit: function() {

	},
	handleUpdateModelReview: function(e) {
		this.setState({
			modelReview: e.target.value
		});
	},
	componentDidMount: function () {
		//$('select.dropdown').dropdown();
		$('.ui.rating').rating();
		$('.ui.button').button();
	},
	componentWillReceiveProps: function () {
	},
	render: function () {
		return (
			<ModelDetails
				onAddReview={this.handleAddReview}
				modelReview={this.state.modelReview}
				onUpdateModelReview={this.handleUpdateModelReview}
				message={this.message} />
		);
	}
});

module.exports = ModelDetailsContainer;
