var React = require('react');
var PropTypes = React.PropTypes;
var PredictScreen = require('../components/PredictScreen');
var globalVars = require('../config/globalVars');

var PredictScreenContainer = React.createClass({
	contextTypes: {
		router: PropTypes.object.isRequired
	},
	getInitialState: function() {
		return {
			file: '',
			fileName: '',
			result: '',
			imagePreviewUrl: '',
			loadModelsList: false,
			pretrainedModel: ''
		};
	},
	handleUpdateFile: function(e) {
		e.preventDefault();
		var reader = new FileReader();
		var file = e.target.files[0];
		var self = this;
		var fileType = file.name.split('.').pop();
		if(fileType != 'jpeg' && fileType != 'png' && fileType != 'jpg') {
			alert('Please upload a PNG or JPEG file.');
			return false;
		}
		reader.onloadend = function() {
			self.setState({
				file: file,
				fileName: file.name,
				imagePreviewUrl: reader.result
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
				var response = JSON.parse(xhr.responseText);
				self.handleServiceResponse(response);
			}
		};
		var onError = function(e) {
			self.handleErrorResponse();
		};
		var formData = new FormData();
		formData.append('upload', this.state.file);
		if(this.state.loadModelsList) {
			formData.append('job_id', this.state.pretrainedModel);
			xhr.open('post', globalVars.baseUrl+'testTrainedOnline', true);
		} else {
			xhr.open('post', globalVars.baseUrl+'generalPredictorImageUpload', true);
		}
		xhr.addEventListener('error', onError, false);
		xhr.addEventListener('progress', onProgress, false);
		xhr.send(formData);
		xhr.addEventListener('readystatechange', onReady, false);
	},
	handleServiceResponse: function(responseObject) {
		this.setState({
			result: 'The number in the image is: ' + responseObject.Prediction
		});
	},
	handleErrorResponse: function() {
		this.setState({
			result: 'The prediction service failed!'
		});
	},
	handleModelSelectionChange: function(checkboxValue) {
		console.log("checkboxValue ", checkboxValue);
		this.setState({
			loadModelsList: checkboxValue == 'on' ? true : false
		});
	},
	handleModelSelection: function(e) {
		console.log('handleModelSelection', e.target.value);
		this.setState({
			pretrainedModel: e.target.value
		});
	},
	render: function() {
		return(
			<PredictScreen
				onSubmitData={this.handleSubmitData}
				onUpdateFile={this.handleUpdateFile}
				fileName={this.state.fileName}
				result={this.state.result}
				imagePreviewUrl={this.state.imagePreviewUrl}
				onModelSelectionChange={this.handleModelSelectionChange}
				loadModelsList={this.state.loadModelsList}
				onModelSelection={this.handleModelSelection} />
		);
	}
});

module.exports = PredictScreenContainer;
