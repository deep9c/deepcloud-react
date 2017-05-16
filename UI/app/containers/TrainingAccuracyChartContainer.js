var React = require('react');
var PropTypes = React.PropTypes;
var TrainingAccuracyChart = require('../components/TrainingAccuracyChart');
var Highcharts = require('highcharts');

var TrainingAccuracyChartContainer = React.createClass({
	getInitialState: function() {
		return {
			shouldRenderChart: this.props.shouldRenderChart,
			container: this.props.container,
			options: this.props.options,
			epochValues: this.props.epochValues,
			dataValues: this.props.dataValues
		};
	},
	componentDidMount: function() {
		if(this.props.shouldRenderChart === true) {
			this.setState({
				shouldRenderChart: this.props.shouldRenderChart,
				container: this.props.container,
				options: this.props.options,
				epochValues: this.props.epochValues,
				dataValues: this.props.dataValues
			});
			this.chart = new Highcharts[this.props.type || "Chart"](
				this.props.container,
				this.props.options
			);
		}
	},
	componentWillReceiveProps: function(nextProps) {
		if(nextProps.shouldRenderChart === true) {
			console.log('options', nextProps.options);
			this.setState({
				shouldRenderChart: nextProps.shouldRenderChart,
				container: nextProps.container,
				options: nextProps.options,
				epochValues: nextProps.epochValues,
				dataValues: nextProps.dataValues
			});
			this.chart = new Highcharts[this.props.type || "Chart"](
				nextProps.container,
				nextProps.options
			);
		} else {
			if(this.chart && nextProps.epochValues.length > 0 && nextProps.dataValues.length > 0) {
				if(this.state.epochValues.length < nextProps.epochValues.length) {
					var newPointsCount = nextProps.epochValues.length - this.state.epochValues.length;
					for(var i = 0; i < newPointsCount; i++) {
						var point = {
							x: nextProps.epochValues[this.state.epochValues.length + i],
							y: nextProps.dataValues[this.state.epochValues.length + i],
							marker: {
								enabled: true
							}
						};
						var series = this.chart.series[0];
						var shift = series.data.length > 50;
						//this.chart.series[0].addPoint(point, true, shift);
					}
					//this.chart.redraw();
					this.chart.xAxis[0].setCategories(nextProps.epochValues);			//Also works!
					this.chart.series[0].setData(nextProps.dataValues);
					this.setState({
						epochValues: nextProps.epochValues,
						dataValues: nextProps.dataValues
					});
				}
			}
		}
	},
	componentWillUnmount: function() {
		if(this.chart) {
			this.chart.destroy();
		}
	},
	render: function() {
		console.log('rendering chart');
		return(
			<TrainingAccuracyChart
				container = {this.state.container} />
		);
	}
});

module.exports = TrainingAccuracyChartContainer;
