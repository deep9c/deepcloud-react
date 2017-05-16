var React = require('react');
var ReactRouter = require('react-router');
var NavBar = require('./NavBar');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

var Main = React.createClass({
  render: function() {
    return(
		<MuiThemeProvider>
			<div>
			  <div className='main-container'>
				{this.props.children}
			  </div>
			</div>
		</MuiThemeProvider>
    )
  }
});

module.exports = Main;
