var React = require('react');
var PropTypes = React.PropTypes;
var SuspendResumeButton = require('../components/SuspendResumeButton');
var globalVars = require('../config/globalVars');

var SuspendResumeButtonContainer = React.createClass({
	getInitialState: function() {
		console.log('props',this.props);
		return {
			action: this.props.action,
			jobID: this.props.jobID,
			procID: this.props.procID,
			isDisabled: this.props.isDisabled
		};
	},
	handleClickButton: function(e) {
		e.preventDefault();
		var xhr = new XMLHttpRequest();
		var onReady = function(e) {
			if(xhr.readyState == 4 && xhr.status == 200) {
				console.log('Suspend/Resume successful');
				var jobStatus = this.state.action == 'suspend' ? 'Suspended' : 'Live';
				this.setState({
					action: this.state.action == 'suspend' ? 'resume' : 'suspend'
				});
				this.props.onSuspendResume(jobStatus);
			}
		}.bind(this);
		var onError = function(e) {
			this.handleErrorResponse();
		}.bind(this);
		var formData = new FormData();
		formData.append('job_id', this.state.jobID);
		formData.append('pid', this.state.procID);
		if(this.state.action == 'suspend') {
			xhr.open('post', globalVars.baseUrl+'suspendProcess', true);
		} else {
			xhr.open('post', globalVars.baseUrl+'resumeProcess', true);
		}
		xhr.addEventListener('error', onError, false);
		xhr.send(formData);
		xhr.addEventListener('readystatechange', onReady, false);
	},
	componentWillReceiveProps: function(nextProps) {
		console.log('isDisabled', nextProps.isDisabled);
		this.setState({
			isDisabled: nextProps.isDisabled
		});
	},
	render: function() {
		console.log('isDisabled in render', this.state.isDisabled);
		return(
			<SuspendResumeButton
				action={this.state.action}
				onClickButton={this.handleClickButton}
				isDisabled={this.state.isDisabled} />
		);
	}
});

module.exports = SuspendResumeButtonContainer;
