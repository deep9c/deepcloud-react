var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;
import RaisedButton from 'material-ui/RaisedButton';
var generalUtils = require('../utils/GeneralUtils.js');

function SuspendResumeButton(props) {
	if(props.isDisabled) {
		return(
			<button
				className="ui primary disabled button"
				onClick={props.onClickButton}>
				{generalUtils.capitalizeFirstLetter(props.action)}
			</button>
		);
	} else {
		return(
			<button
				className="ui primary button"
				onClick={props.onClickButton}>
				{generalUtils.capitalizeFirstLetter(props.action)}
			</button>
		);
	}
}

SuspendResumeButton.propTypes = {
	action: PropTypes.string.isRequired,
	onClickButton: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool.isRequired
};

module.exports = SuspendResumeButton;
