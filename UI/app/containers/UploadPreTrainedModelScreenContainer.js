var React = require('react');
var PropTypes = React.PropTypes;
var UploadPreTrainedModelScreen = require('../components/UploadPreTrainedModelScreen');
var globalVars = require('../config/globalVars');

var UploadPreTrainedModelScreenContainer = React.createClass({
	contextTypes: {
		router: PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			file: '',
			fileName: '',
			result: ''
		};
	},
	handleUpdateFile: function(e) {
		e.preventDefault();
		var reader = new FileReader();
		var file = e.target.files[0];
		var self = this;
		reader.onloadend = function() {
			self.setState({
				file: file,
				fileName: file.name
			});
		};
		reader.readAsDataURL(file);
	},
	handleSubmitData: function(e) {
		e.preventDefault();
		var self = this;
		this.setState({
			result: 'Working ...'
		});
		var xhr = new XMLHttpRequest();
		var onProgress = function(e) {
			if(e.lengthComputable) {
				var percentComplete = (e.loaded / e.total) * 100;
				console.log('percentComplete', percentComplete);
			}
		};
		var onReady = function(e) {
			if(xhr.readyState == 4 && xhr.status == 200) {
				self.handleServiceResponse(xhr.responseText);
			}
		};
		var onError = function(e) {
			self.handleErrorResponse();
		};
		var formData = new FormData();
		formData.append('upload', this.state.file);
		xhr.open('post', globalVars.baseUrl+'generalPredictorModelUpload', true);
		xhr.addEventListener('error', onError, false);
		xhr.addEventListener('progress', onProgress, false);
		xhr.send(formData);
		xhr.addEventListener('readystatechange', onReady, false);
	},
	handleServiceResponse: function(responseObject) {
		this.setState({
			result: 'The pre trained model ' + this.state.fileName + ' has been uploaded. You can now use it for prediction.'
		});
	},
	handleErrorResponse: function() {
		this.setState({
			result: 'The model could not be uploaded successfully'
		});
	},
	render: function() {
		return(
			<UploadPreTrainedModelScreen
				onSubmitData={this.handleSubmitData}
				onUpdateFile={this.handleUpdateFile}
				fileName={this.state.fileName}
				result={this.state.result} />
		);
	}
});

module.exports = UploadPreTrainedModelScreenContainer;
