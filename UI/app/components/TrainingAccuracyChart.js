var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;

function TrainingAccuracyChart(props) {
	return(
		<div id={props.container}></div>
	);
}

TrainingAccuracyChart.propTypes = {
	container: PropTypes.string.isRequired
};

module.exports = TrainingAccuracyChart;
