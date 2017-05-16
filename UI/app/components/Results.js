var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;

function Results(props) {
  return(
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center" style={styles.transparentBg}>
      <h1>{props.header}</h1>
      <div className="results-row-header">
        <div className="col-sm-6"><h4>Test Image</h4></div>
        <div className="col-sm-6"><h4>Predictions</h4></div>
      </div>
      <div className="results-row-header">
        <div className="col-sm-6"></div>
        <div className="col-sm-6"></div>
      </div>
      <div className="row">
        <div className="col-sm-4">Layer</div>
        <div className="col-sm-4">Activations</div>
        <div className="col-sm-4">Weights</div>
      </div>
    </div>
  );
}

module.exports = Results;
