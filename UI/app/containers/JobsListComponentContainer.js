var React = require('react');
var PropTypes = React.PropTypes;
var JobsListComponent = require('../components/JobsListComponent');
var globalVars = require('../config/globalVars');
import cookie from "react-cookie";

var JobsListComponentContainer = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			jobsList: [],
			message: ''
		};
	},
	componentDidMount: function() {
		var xhr = new XMLHttpRequest();

		var onProgress = function(e) {
			this.setState({
				message: 'Loading ...'
			});
		}.bind(this);

		var onError = function(e) {
			this.setState({
				message: 'Failed to load list of jobs!'
			});
		}.bind(this);

		var onReady = function(e) {
			if(xhr.readyState == 4 && xhr.status == 200) {
				var response = JSON.parse(xhr.responseText);
				console.log('responseJSON', response);
				this.setState({
					jobsList: response.rows
				});
				if(this.state.jobsList.length <= 0) {
					this.setState({
						message: 'You have no current or historical jobs.'
					});
				} else {
					localStorage.setItem('jobsList', JSON.stringify(this.state.jobsList));
				}
			}
		}.bind(this);

		xhr.open('get', globalVars.baseUrl+'getDashboard', true);
		xhr.withCredentials = true;
		xhr.addEventListener('error', onError, false);
		xhr.addEventListener('progress', onProgress, false);
		xhr.send();
		xhr.addEventListener('readystatechange', onReady, false);
	},
	componentWillReceiveProps: function() {

	},
	render: function() {
		if(this.state.jobsList.length > 0) {
			return(
				<JobsListComponent
					jobsList={this.state.jobsList} />
			);
		} else {
			return(
				<div>{this.state.message}</div>
			);
		}
	}
});

module.exports = JobsListComponentContainer;
