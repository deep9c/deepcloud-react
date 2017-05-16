var React = require('react');
var PropTypes = React.PropTypes;
var Results = require('../components/Results');

var ResultsContainer = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  render: function() {
    <Results />
  }
});

module.exports = ResultsContainer;
