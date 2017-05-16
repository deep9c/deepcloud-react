var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;

function InputComponentSubmitButton (props) {
	return(
		<div>
			<button className="ui primary button" type="submit">{props.text}</button>
		</div>
	);
}

InputComponentSubmitButton.propTypes = {
	name: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired
};

module.exports = InputComponentSubmitButton;
