var React = require('react');
var PropTypes = React.PropTypes;
var InputComponentSubmitButton = require('../components/InputComponentSubmitButton');

var InputComponentSubmitButtonContainer = React.createClass({
	propTypes: {
		name: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		onClickSubmit: PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			name: this.props.name,
			text: this.props.text
		};
	},
	render: function () {
		return (
			<InputComponentSubmitButton
			name={this.state.name}
			text={this.state.text} />
		);
	}
});

module.exports = InputComponentSubmitButtonContainer;
