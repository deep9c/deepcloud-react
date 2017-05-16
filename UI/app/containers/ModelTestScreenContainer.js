var React = require('react');
var PropTypes = React.PropTypes;
var ModelTestScreen = require('../components/ModelTestScreen');
var globalVars = require('../config/globalVars');

var ModelTestScreenContainer = React.createClass({
	contextTypes: {
		router: PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			inputComponents: [],
			outputComponents: [],
			file: '',
			fileName: ''
		};
	},
	componentWillMount: function () {
		var ui = {
			"input-components" : [
				{
					"name" : "file-upload",
					"type" : "file",
					"text" : "Choose File"
				},
				{
					"name" : "submit-button",
					"type" : "button",
					"button-type": "submit",
					"text" : "Predict"
				}
			],
			"output-components": [
				{
					"name" : "result",
					"type" : "div"
				}
			]
		};

		this.setState({
			inputComponents: ui["input-components"],
			outputComponents: ui["output-components"]
		});
	},
	handleChooseFile: function (file, fileName) {
		this.setState({
			file: file,
			fileName: fileName
		});
	},
	handleClickSubmit: function () {
		//TODO: Make this dynamic
		e.preventDefault();
		var self = this;
		this.setState({
			result: 'Working ...'
		});
		var xhr = new window.XMLHttpRequest();
		var onReady = function (e) {
			if(xhr.readyState === 4 && xhr.status === 200) {
				var response = JSON.parse(xhr.responseText);
				self.handleServiceResponse(response);
			}
		};
		var onError = function (e) {
			self.handleErrorResponse();
		};
		var formData = new window.FormData();
		formData.append('upload', this.state.file);
		xhr.open('post', globalVars.baseUrl+'generalPredictorImageUpload', true);
		xhr.addEventListener('error', onError, false);
		xhr.send(formData);
		xhr.addEventListener('readystatechange', onReady, false);
	},
	handleServiceResponse: function (responseObject) {
		this.setState({
			result: 'The number in the image is: ' + responseObject.Prediction
		});
	},
	handleErrorResponse: function () {
		this.setState({
			result: 'The prediction service failed!'
		});
	},
	render: function () {
		return(
			<ModelTestScreen
			inputComponents={this.state.inputComponents}
			outputComponents={this.state.outputComponents}
			onChooseFile={this.handleChooseFile}
			onClickSubmit={this.handleClickSubmit} />
		)
	}
})

module.exports = ModelTestScreenContainer;
