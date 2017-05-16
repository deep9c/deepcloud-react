var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
var Home = require('../components/Home');
var hashHistory = ReactRouter.hashHistory;
var ResultsContainer = require('../containers/ResultsContainer');
var ContactContainer=require('../containers/ContactContainer');
var TrainModelScreenContainer = require('../containers/TrainModelScreenContainer');
var PredictScreenContainer = require('../containers/PredictScreenContainer');
var UploadPreTrainedModelScreenContainer = require('../containers/UploadPreTrainedModelScreenContainer');
var Login=require('../components/Login');
var Register=require('../components/Register');
var Dashboard=require('../components/Dashboard');
var requireAuth = require('../utils/authenticated');
var JobDetailsContainer = require('../containers/JobDetailsContainer');
var DashboardContent = require('../components/DashboardContent.js');
var JobsListComponentContainer = require('../containers/JobsListComponentContainer');
var NotebookContainer = require('../containers/NotebookContainer');
var ModelStoreContainer = require('../containers/ModelStoreContainer');
var ModelDetailsContainer = require('../containers/ModelDetailsContainer');
var ModelTestScreenContainer = require('../containers/ModelTestScreenContainer');

var routes = (
  <Router history={hashHistory}>
    <Route path='/' name='Home' component={Main}>
      <IndexRoute name='Home' component={Home} />
	  <Route path="dashboard" name='Dashboard' component={Dashboard}>
	  	<IndexRoute name='Dashboard' component={DashboardContent} />
		<Route path='trainModel' name='Train Model' component={TrainModelScreenContainer}/>
		<Route path='predict' name='Predict' component={PredictScreenContainer} />
		<Route path='uploadPreTrainedModel' name='Upload Model' component={UploadPreTrainedModelScreenContainer}/>
		<Route path='jobsList' name='Jobs' component={JobsListComponentContainer} />
		<Route path='jobDetails' name='Job Details' component={JobDetailsContainer} />
		<Route path='notebook' name='DeepCloud Notebook' component={NotebookContainer} />
		<Route path='modelStore' name='Model Store' component={ModelStoreContainer} />
		<Route path='modelDetails' name='Model Details' component={ModelDetailsContainer} />
		<Route path='modelTest' name='Model Test' component={ModelTestScreenContainer} />
		<Route path='Contact' name='Contact' component={ContactContainer} />
	  </Route>
    </Route>
  </Router>
);

module.exports = routes;
