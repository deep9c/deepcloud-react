var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Link = ReactRouter.Link;
var firebaseUtils = require('../utils/firebaseUtils');
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

var NavBar=React.createClass( {
 getInitialState: function(){
    return {
      loggedIn: firebaseUtils.isLoggedIn()
    }
  },
  handleLogout: function(loggedIn){
    this.setState({
      loggedIn: loggedIn,
	  open: false
    });
  },
  componentWillMount: function(){
    firebaseUtils.onChange = this.handleLogout;
  },
  processLogout:function(){
	firebaseUtils.logout();
  },

 render:function() {
	var loginOrOut;
    var register;
	var handleTouchTap = function() {
		location.href = '#';
	};
	var toggleDrawer = function() {
		this.setState({
			open: !this.state.open
		});
	}.bind(this);
	var handleClose = function() {
		this.setState({
			open: false
		});
	}.bind(this);
    if(this.state.loggedIn){
      loginOrOut =  <Link to="/"className="active" onClick={this.processLogout}>
	  					<RaisedButton
							label='Logout'
							style={styles.loginButton} />
					</Link>;
      register = null
    } else {
      loginOrOut =  <Link to="/login" className="active">
	  					<RaisedButton
							label='Login'
							style={styles.loginButton} />
					</Link>;
      register = <Link to="/register" style={styles.menuItemLink} onTouchTap={handleClose}>Register</Link>;
    }
	return(
		<div>
			<AppBar
				style={styles.mainAppBarStyle}
				title="Home"
				showMenuIconButton={true}
				iconElementRight={loginOrOut}
				onTitleTouchTap={handleTouchTap}
				onLeftIconButtonTouchTap={toggleDrawer} />
			<Drawer
				docked={false}
				width={200}
				open={this.state.open}
				onRequestChange={(open) => this.setState({open: open})} >
				<MenuItem><Link to="/dashboard" style={styles.menuItemLink} onTouchTap={handleClose}>Dashboard</Link></MenuItem>
				<MenuItem>
					<a href="http://deepc05.acis.ufl.edu:9999/" style={styles.menuItemLink} onTouchTap={handleClose} target="_blank">
						Jupyter Notebook
					</a>
				</MenuItem>
				<MenuItem>{register}</MenuItem>
				<MenuItem><Link to='/Contact' style={styles.menuItemLink}  onTouchTap={handleClose}>Contact Us</Link></MenuItem>
			</Drawer>
		</div>
    /*<div className="navbar navbar-default navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-ex-collapse">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a href="#" className="navbar-brand"><span>Home</span></a>
        </div>
        <div className="collapse navbar-collapse" id="navbar-ex-collapse">
          <ul className="nav navbar-nav navbar-right">
		  <li><Link to="/dashboard" className="active"> Dashboard </Link></li>
		  {loginOrOut}
		  {register}
            <li>
              <Link to='/Contact'>Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>*/
  )
}});

module.exports = NavBar;
