var React = require('react');
var styles = require('../styles/styles');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var JobsListComponentContainer = require('../containers/JobsListComponentContainer');
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

var DashboardContent = React.createClass({
	componentDidMount: function() {
		$(".gettingstartedcard > .content > .description > .grid > .row > .column > .item").mouseenter(function() {
			$(this).transition('pulse');
		});
	},
	render: function(){
	  	console.log('dashboard component');
    	return(
			<div className="ui container">
				<div className="ui one column grid">
					<div className="row">
						<div className="column">
							<div className="ui fluid raised card gettingstartedcard">
								<div className="content">
									<div className="header center aligned">Getting Started</div>
									<div className="description">
										<div className="ui three column divided grid container">
											<div className="row">
												<div className="column center aligned">
													<div className="item">
														<Link to="/dashboard">
															<img className="dashboardimage" src="app/img/ml_icon.png" />
															<span className="gettingstarted text">How to train a model</span>
														</Link>
													</div>
												</div>
												<div className="column center aligned">
													<div className="item">
														<Link to="/dashboard">
															<img className="dashboardimage" src="app/img/notebook.png" />
															<span className="gettingstarted text">How to use a notebook</span>
														</Link>
													</div>
												</div>
												<div className="column center aligned">
													<div className="item">
														<Link to="/dashboard">
															<img className="dashboardimage" src="app/img/jobs.png" />
															<span className="gettingstarted text">How to monitor your jobs</span>
														</Link>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="ui three column grid">
					<div className="row">
						<div className="column">
							<div className="ui fluid raised card actionscard">
								<div className="content">
									<div className="header left aligned">Actions</div>
									<div className="description">
										<div className="ui animated relaxed list">
											<div className="item">
												<Link to="/dashboard/trainModel">
													<i className="wizard icon"></i>
													Train Model
												</Link>
											</div>
											<div className="item">
												<Link to="/dashboard/uploadPreTrainedModel">
													<i className="cloud upload icon"></i>
													Upload Pre-Trained Model
												</Link>
											</div>
											<div className="item">
												<Link to="/dashboard/predict">
													<i className="object group icon"></i>
													Predict
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="column">
							<div className="ui fluid raised card notebookscard">
								<div className="content">
									<div className="header left aligned">Recent Notebooks</div>
									<div className="description">
										<div className="ui animated relaxed list">
											<div className="item">
												<Link to="/dashboard">
													<i className="edit icon"></i>
													Notebook 1
												</Link>
											</div>
											<div className="item">
												<Link to="/dashboard">
													<i className="edit icon"></i>
													Notebook 2
												</Link>
											</div>
											<div className="item">
												<Link to="/dashboard">
													<i className="edit icon"></i>
													Notebook 3
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="column">
							<div className="ui fluid raised card newscard">
								<div className="content">
									<div className="header left aligned">New Features!</div>
									<div className="description">
										<div className="ui list relaxed">
											<div className="item">
												<i className="info circle icon"></i>
												Integrated notebook features for each user.
											</div>
											<div className="item">
												<i className="info circle icon"></i>
												Email notifications when users create jobs.
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
  		);
  	}
});

module.exports = DashboardContent;
