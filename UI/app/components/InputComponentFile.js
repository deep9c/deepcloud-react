var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;

function InputComponentFile (props) {
    return(
        <div className="field">
            <div className="ui left action input">
                <label htmlFor="file" className="ui icon button">
                    <i className="attach icon"></i>
                    {props.text}
                </label>
                <input
                    type="file"
                    id="file"
                    name={props.name}
                    multiple="multiple"
                    style={styles.invisible}
                    onChange={props.onUpdateFile} />
                <input
                    type="text"
                    readOnly
                    value={props.fileName} />
            </div>
        </div>
    )
}

InputComponentFile.propTypes = {
	name: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	fileName: PropTypes.string.isRequired,
    onUpdateFile: PropTypes.func.isRequired
};

module.exports = InputComponentFile;
