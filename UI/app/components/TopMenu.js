var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;
var Breadcrumbs = require('react-breadcrumbs');

function TopMenu(props) {
	return(
		<div className="ui secondary menu">
			<div className="item">
				<h1 className="ui center aligned header dashboard">
					<span className="deepcloud text">DeepCloud</span>
				</h1>
			</div>
			<div className="item">
				{/*<Breadcrumbs
					breadcrumbName="TopMenuBreadCrumb"
					routes={props.routes}
					params={props.params}
				/>*/}
			</div>
			<div className="right menu">
				<a className="item">
					Settings
					<i className="cogs icon"></i>
				</a>
				<a className="item">
					Help
					<i className="help circle icon"></i>
				</a>
				<a className="ui item" onClick={props.onClickLogout}>
					Logout
					<i className="sign out icon"></i>
				</a>
			</div>
		</div>
	);
}

module.exports = TopMenu;
