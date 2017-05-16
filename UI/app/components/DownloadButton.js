var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;

function DownloadButton(props) {
	return(
		<button
			className="ui positive button" onClick={props.onClickDownload}>
			Download Model
		</button>
	);
}

DownloadButton.propTypes = {
	onClickDownload: PropTypes.func.isRequired
};

module.exports = DownloadButton;
