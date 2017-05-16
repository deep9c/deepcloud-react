var React = require('react');
var PropTypes = React.PropTypes;

var NotebookContainer = React.createClass({
	componentDidMount: function() {
		$(document).ready(function() {
			$("#myIFrame").attr('src', 'http://localhost:8000');
		});
	},
	render: function () {
		return(
			<iframe id="myIFrame" src="" />
		);
	}
});

module.exports = NotebookContainer;
