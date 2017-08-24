var React = require('react');
var styles = require('../styles/styles');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var DashboardContent = require('./DashboardContent.js');
var ReactSidebar = require('react-sidebar').default;
var TopMenu = require('./TopMenu');
var globalVars = require('../config/globalVars');

var Dashboard = React.createClass({
	contextTypes: {
      router: React.PropTypes.object.isRequired
    },
	getInitialState: function() {
		return {
			sidebarOpen: true,
			sidebarDocked: true
		};
	},
	onSetSidebarOpen: function(open) {
		this.setState({sidebarOpen: open});
	},
	componentWillMount: function() {
		var mql = window.matchMedia(`(min-width: 800px)`);
		mql.addListener(this.mediaQueryChanged);
		this.setState({mql: mql, sidebarDocked: mql.matches});
	},
	componentDidMount: function() {
		$('.menuItem').on('click', function() {
			$('.menuItem').removeClass('active');
			$(this).addClass('active');
		});
	},
	componentWillUnmount: function() {
		this.state.mql.removeListener(this.mediaQueryChanged);
	},
	mediaQueryChanged: function() {
		this.setState({sidebarDocked: this.state.mql.matches});
	},
	handleClickLogout: function () {
		//console.log('logout clicked');
		var xhr = new window.XMLHttpRequest();

		var onError = function () {
			console.log('Logout Failed!');
		};

		var onReady = function () {
			if(xhr.readyState === 4 && xhr.status === 200) {
				this.context.router.replace('/');
			}
		}.bind(this);

		xhr.open('get', globalVars.baseUrl+'logout', true);
		xhr.addEventListener('error', onError, false);
		xhr.addEventListener('readystatechange', onReady, false);
		xhr.send();
	},
	render: function() {
		console.log('render dashboard');
		var SideBarContent = <div className="ui labeled icon borderless pointing vertical inverted menu sidebarMenu">
								<Link className="item active menuItem" to="/dashboard" id="dashboardLink">
									<i className="dashboard icon"></i>
									Dashboard
								</Link>
								<Link to='/dashboard/notebook' className="item menuItem" id="notebookLink">
									<i className="book icon"></i>
									Notebook
								</Link>
								<Link to='/dashboard/Contact' className="item menuItem" id="contactLink">
									<i className="call icon"></i>
									Contact Us
								</Link>
								<Link to="/dashboard/jobsList" className="item menuItem" id="jobsLink">
									<i className="tasks icon"></i>
									Jobs
								</Link>
								<Link to="/dashboard/modelStore" className="item menuItem" id="modelStoreLink">
									<i className="shop icon"></i>
									Model Store
								</Link>
								<Link to='/dashboard/Trainer' className="item menuItem" id="trainerLink">
									<i className="table icon"></i>
									Trainer
								</Link>
								<Link to='/dashboard/Charts' className="item menuItem" id="chartsLink">
									<i className="table icon"></i>
									Charts
								</Link>
							</div>;
		return(
			<ReactSidebar sidebar={SideBarContent}
				open={this.state.sidebarOpen}
				docked={this.state.sidebarDocked}
				onSetOpen={this.onSetSidebarOpen}
				styles={styles.sidebarStyle}
				shadow={false} >
					<div className="pusher" style={styles.pusherStyle}>
						<div className="ui container">
							<TopMenu
								{...this.props}
								onClickLogout={this.handleClickLogout} />
							{this.props.children}
						</div>
					</div>
			</ReactSidebar>
		);
	}
});

module.exports = Dashboard;
