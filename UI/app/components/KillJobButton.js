var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;
import RaisedButton from 'material-ui/RaisedButton';
var generalUtils = require('../utils/GeneralUtils.js');

function KillJobButton(props) {
	if(props.isDisabled) {
		return(
			<button
				className="ui red disabled button"
				onClick={props.onClickButton}>
				{generalUtils.capitalizeFirstLetter('Kill Job')}
			</button>
		);
	} else {
		return(
			<button
				className="ui red button"
				onClick={props.onClickButton}>
				{generalUtils.capitalizeFirstLetter('Kill Job')}
			</button>
		);
	}
}

KillJobButton.propTypes = {
	onClickButton: PropTypes.func.isRequired,
	isDisabled: PropTypes.bool.isRequired
};

module.exports = KillJobButton;
