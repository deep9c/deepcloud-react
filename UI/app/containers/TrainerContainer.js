var React = require('react');
var PropTypes = React.PropTypes;
var TrainerScreen = require('../components/TrainerScreen');
var globalVars = require('../config/globalVars');

var TrainerContainer = React.createClass({
	contextTypes: {
		router: PropTypes.object.isRequired
	},
	getInitialState: function () {
		return {
			modelfile:'',
			modelfileName:'',
      		epoch: '',
	  		parameter:'',
	  		batchsize:'',
	  		training:'',
	  		validation:'',
	  		dropoutlastlayer:'',
	  		weightsinit:'',
	  		optimizer:'',
	  		learningrate:'',
	  		rho:'',
	  		ajaxPollTimer:{}
		};
	},

  onUpdateModelfile:function(e){
  	e.preventDefault();
		var reader = new FileReader();
		var file = e.target.files[0];
		var self = this;
		reader.onloadend = function () {
			self.setState({
				modelfile: file,
				modelfileName: file.name
			});
			$("#train-model-button").removeClass('disabled');
		};
		reader.readAsDataURL(file);
  },
  onUpdateEpoch:function(e){
  this.setState({
	epoch:e.target.value
  });
  },
  onUpdateParameter:function(e){
	this.setState({
		parameter:e.target.value
	});
  },
   onUpdateBatchsize:function(e){
	this.setState({
		batchsize:e.target.value
	});
  },
  onUpdateTraining:function(e){
	this.setState({
		training:e.target.value
	});
  },
  onUpdateValidation:function(e){
	this.setState({
		validation:e.target.value
	});
  },
  onUpdateDropoutlastlayer:function(e){
	this.setState({
		dropoutlastlayer:e.target.value
	});
  },
  onUpdateWeightsinit:function(e){
	this.setState({
		weightsinit:e.target.value
	});
  },
  onUpdateOptimizer:function(e){
	this.setState({
		optimizer:e.target.value
	});
  },
  onUpdateLearningrate:function(e){
	this.setState({
		learningrate:e.target.value
	});
  },
  onUpdateRho:function(e){
	this.setState({
		rho:e.target.value
	});
  },

  /*
	handleUpdateImageWidth: function (e) {
		this.setState({
			imageWidth: e.target.value
		});
	},
	handleUpdateImageHeight: function (e) {
		this.setState({
			imageHeight: e.target.value
		});
	},
	handleUpdateClassNum: function (e) {
		this.setState({
			classNum: e.target.value
		});
	},
	handleUpdateLearningRate: function (e) {
		this.setState({
			learningRate: e.target.value
		});
	},
	handleUpdateFile: function (e) {
		e.preventDefault();
		var reader = new FileReader();
		var file = e.target.files[0];
		var self = this;
		reader.onloadend = function () {
			self.setState({
				file: file,
				fileName: file.name
			});
			$("#train-model-button").removeClass('disabled');
		};
		reader.readAsDataURL(file);
	},
	*/

	handleSubmitData: function (e) {
		var self = this;
		$('.ui.modal').modal('destroy');
		$('.ui.modal')
			.modal({
				closable: false,
				onDeny: function () {

				},
				onApprove: function () {
					self.setState({
						result: 'Uploading and training ...'
					});
					e.preventDefault();
					var xhr = new XMLHttpRequest();
					var prevDataLength = 0;
					var nextReadPosition = 0;
					var isChartDrawn = false;
					var onProgress = function (e) {
						if (e.lengthComputable) {
							var percentComplete = (e.loaded / e.total) * 100;
							console.log('percentComplete', percentComplete);
						}
					};
					/*var onReady = function(e) {
							if(xhr.readyState == 4 && xhr.status == 200) {
								console.log('unparsed response', xhr.responseText);
								var response = JSON.parse(xhr.responseText);
								console.log('response', response);
								self.handleServiceResponse(response);
							}
					};*/
					var onError = function (e) {
						self.handleErrorResponse();
					};
					var formData = new FormData();
					formData.append('upload', self.state.modelfile);
					formData.append('epoch', self.state.epoch);
					formData.append('nClass', self.state.classNum);
					formData.append('parameter', self.state.parameter);
					formData.append('batchsize', self.state.batchsize);
					formData.append('training', self.state.training);
					formData.append('validation', self.state.validation);
					formData.append('dropoutlastlayer', self.state.dropoutlastlayer);
					formData.append('weightsinit', self.state.weightsinit);
					formData.append('optimizer', self.state.optimizer);
					formData.append('learningrate', self.state.learningrate);
					formData.append('rho', self.state.rho);
					xhr.open('post', globalVars.baseUrl+'uploadtrainingfile', true);
					xhr.addEventListener('error', onError, false);
					xhr.addEventListener('progress', onProgress, false);
					xhr.send(formData);
					//xhr.addEventListener('readystatechange', onReady, false);
					var pollTimer = setInterval(function () {
						var unprocessedResponseLength = xhr.responseText.length;
						var unprocessedResponse = xhr.responseText;
						if (prevDataLength != unprocessedResponseLength) {
							console.log('unparsed continuous response :: ', unprocessedResponse);
							prevDataLength = unprocessedResponseLength;
							var response = unprocessedResponse.substring(nextReadPosition, unprocessedResponseLength);
							console.log('response :: ', response);
							nextReadPosition = unprocessedResponseLength;
							var processedResponse = JSON.parse(response);
							console.log('processedResponse :: ', processedResponse);
							/*if (!isChartDrawn) {
								self.handleServiceResponse(processedResponse);
								isChartDrawn = true;
							} else {
								self.handleUpdateChart(processedResponse);
							}*/
						}
						if (xhr.readyState == 4 && prevDataLength == unprocessedResponseLength) {
							clearInterval(pollTimer);
						}
					}, 100);
					self.setState({
						ajaxPollTimer: pollTimer
					});
				}
			})
			.modal('show');
	},
	/*handleServiceResponse: function (responseObject) {
		var accuracyList = JSON.parse(responseObject.Accuracy);
		var epochValues = [];
		var dataValues = [];
		for (var i = 0; i < accuracyList.length; i++) {
			epochValues[i] = parseInt(accuracyList[i].Epoch);
			dataValues[i] = parseFloat(accuracyList[i].Accuracy) * 100;
		}
		var optionValues = {
			title: {
				text: 'Accuracy vs. Epoch'
			},
			xAxis: {
				title: {
					text: 'Epoch'
				},
				categories: epochValues
			},
			yAxis: {
				title: {
					text: 'Accuracy (%)'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: 'Accuracy',
				data: dataValues
			}]
		};
		this.setState({
			result: 'Model successfully trained with accuracy: ' + (accuracyList[accuracyList.length - 1].Accuracy * 100).toFixed(2) + '%',
			modelDownloadLink: responseObject.trainedModel,
			shouldDisplayButton: true,
			shouldRenderChart: true,
			container: 'accuracy-epoch-chart',
			options: optionValues
		});
	},*/
	/*
	handleUpdateChart: function (responseObject) {
		var accuracyList = JSON.parse(responseObject.Accuracy);
		var latestEpochValues = [];
		var latestDataValues = [];
		for (var i = 0; i < accuracyList.length; i++) {
			latestEpochValues[i] = parseInt(accuracyList[i].Epoch);
			latestDataValues[i] = parseFloat(accuracyList[i].Accuracy) * 100;
		}
		this.setState({
			result: 'Model successfully trained with accuracy: ' + (accuracyList[accuracyList.length - 1].Accuracy * 100).toFixed(2) + '%',
			modelDownloadLink: responseObject.trainedModel,
			shouldDisplayButton: true,
			shouldRenderChart: false,
			epochValues: latestEpochValues,
			dataValues: latestDataValues
		});
	},*/
	handleErrorResponse: function () {
		this.setState({
			result: 'Model could not be trained successfully!',
			modelDownloadLink: '',
			shouldDisplayButton: false,
			shouldRenderChart: false,
			container: 'accuracy-epoch-chart',
			options: {}
		});
	},
	/*
	handleUpdateModelName: function (e) {
		this.setState({
			modelName: e.target.value
		});
	},
	handleUpdateOneLineDesc: function (e) {
		this.setState({
			oneLineDesc: e.target.value
		});
	},
	handleUpdateDescription: function (e) {
		this.setState({
			description: e.target.value
		});
	},
	handleUpdateCitationCount: function (e) {
		this.setState({
			citationCount: e.target.value
		});
	},
	handleUpdateAssociatedPaper: function (e) {
		this.setState({
			associatedPaper: e.target.value
		});
	},
	*/
	componentWillUnmount: function () {
		clearInterval(this.state.ajaxPollTimer);
	},
	componentDidMount: function () {
	},
	render: function () {
		return (
			<TrainerScreen				
				onSubmitData={this.handleSubmitData}
				onUpdateModelfile={this.onUpdateModelfile}
				modelfileName={this.state.modelfileName}
				epoch={this.state.epoch}
				onUpdateEpoch={this.onUpdateEpoch}
				parameter={this.state.parameter}
				onUpdateParameter={this.onUpdateParameter}
				batchsize={this.state.batchsize}
				onUpdateBatchsize={this.onUpdateBatchsize}
				training={this.state.training}
				onUpdateTraining={this.onUpdateTraining}
				validation={this.state.validation}
				onUpdateValidation={this.onUpdateValidation}
				dropoutlastlayer={this.state.dropoutlastlayer}
				onUpdateDropoutlastlayer={this.onUpdateDropoutlastlayer}
				weightsinit={this.state.weightsinit}
				onUpdateWeightsinit={this.onUpdateWeightsinit}
				optimizer={this.state.optimizer}
				onUpdateOptimizer={this.onUpdateOptimizer}
				learningrate={this.state.learningrate}
				onUpdateLearningrate={this.onUpdateLearningrate}
				rho={this.state.rho}
				onUpdateRho={this.onUpdateRho} />
		);
	}
});

module.exports = TrainerContainer;
