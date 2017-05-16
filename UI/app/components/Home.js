var React = require('react');
var styles = require('../styles/styles');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Login = require('./Login');
var Register = require('./Register');

var Home = React.createClass({
  getInitialState: function() {
	return {
		isShowLoginModal: false,
		isShowRegisterModal: false,
		isShowContactModal: false
	};
  },
  handleLoginClick: function() {
	this.setState({
		isShowLoginModal: true
	});
  },
  handleDisplayRegister: function() {
	this.setState({
		isShowRegisterModal: true
	});
  },
  handleLoginModalClose: function() {
	this.setState({
		isShowLoginModal: false
	});
  },
  handleRegisterModalClose: function() {
	this.setState({
  		isShowRegisterModal: false
  	});
  },
  render: function() {
    return(
		<div>
		<nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
          <div className="container topnav">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand topnav" href="#">Home</a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                      <li>
                          <a href="#" onClick={this.handleLoginClick}>Login</a>
                      </li>
                      <li>
                          <a href="#about">About</a>
                      </li>
                      <li>
                          <a href="#contact">Contact</a>
                      </li>
                  </ul>
              </div>

          </div>

      </nav>
	  <Login
	  	showModal={this.state.isShowLoginModal}
	  	showRegister={this.handleDisplayRegister}
		closeModal={this.handleLoginModalClose} />
	  <Register
	  	showModal={this.state.isShowRegisterModal}
		closeModal={this.handleRegisterModalClose} />
    <div className="intro-header">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="intro-message">
                        <h1>DeepCloud</h1>
                        <h3>Cloud based DL Platform</h3>
                        <hr className="intro-divider" />
                        <ul className="list-inline intro-social-buttons">
							<li>
                                <a href="#" onClick={this.handleLoginClick} className="btn btn-default btn-lg"><i className="chevron circle right icon"></i> <span className="network-name">Get Started</span></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
	</div>

	<div className="content-section-a">
		<div className="container">
			<div className="row">
				<div className="col-lg-5 col-sm-6">
					<hr className="section-heading-spacer" />
					<div className="clearfix"></div>
					<h2 className="section-heading">Deep Learning on the Cloud</h2>
					<p className="lead">We provide a cloud based platform which users can use to perform various classification tasks. Users can select from a selection of pre-defined models or they can train their own.</p>
				</div>
				<div className="col-lg-5 col-lg-offset-2 col-sm-6">
					<img className="img-responsive" src="app/img/graph.png" alt="" />
				</div>
			</div>

		</div>
	</div>
	<div className="content-section-b">
        <div className="container">
            <div className="row">
                <div className="col-lg-5 col-lg-offset-1 col-sm-push-6  col-sm-6">
                    <hr className="section-heading-spacer" />
                    <div className="clearfix"></div>
                    <h2 className="section-heading">DeepCloud Notebook</h2>
                    <p className="lead">We provide every user with their own instance of cloud hosted python notebooks which they can use to develop code, equations or store notes.</p>
                </div>
                <div className="col-lg-5 col-sm-pull-6  col-sm-6">
                    <img className="img-responsive" src="app/img/note.png" alt="" />
                </div>
            </div>

        </div>
	</div>
	<footer>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <ul className="list-inline">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li className="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li className="footer-menu-divider">&sdot;</li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                    <p className="copyright text-muted small">Copyright &copy; S3Lab 2016. All Rights Reserved</p>
                </div>
            </div>
        </div>
    </footer>
	</div>
    )
  }
});

module.exports = Home;
