var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;
var styles = require('../styles/styles');
var generalUtils = require('../utils/GeneralUtils.js');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

function ModelStore(props) {
    return(
        <div className="ui container">
            <div className="ui grid">
                <div className="row">
                    <div className="column">
                        <div className="ui fluid raised card gettingstartedcard">
                            <div className="content">
                                <div className="ui grid">
                                    <div className="row">
						                <div className="five wide column">
                                            <div className="field">
                                                <select className="ui dropdown">
                                                    <option value="">Category</option>
													{(function () {
														var categories = [];
														var count = 0;
														for(let category of props.categoriesList) {
															categories.push(<option
																				key={count++}
																				value={category}>{category}</option>);
														}
														return categories;
													}) ()}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="six wide column center aligned">
                                            <div className="header">
                                                Model Store
                                            </div>
                                        </div>
                                        <div className="five wide column right aligned">
                                            <div className="ui icon input">
                                                <input type="text" placeholder="Search..." />
                                                <i className="inverted circular search link icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <div className="ui fluid raised card gettingstartedcard">
							<div className="content">
                                <div className="header center aligned">Models</div>
                                <div className="description">
                                    <div className="ui three cards">
										{(function () {
											var models = [];
											var count = 0;
											for(let model of props.modelsList) {
												models.push(
													<Link key={count++} className="ui card" to="/dashboard/modelDetails">
														<div className="content">
															<div className="header">{model.modelname}</div>
															<div className="meta">
																<span className="category">{model.category}</span>
															</div>
															<div className="description">
																<p>{model.description}</p>
															</div>
														</div>
														<div className="extra content">
															<div className="left floated">
																Rating:
																<div className="ui star rating" data-rating={model.modelrating} data-max-rating="5"></div>
															</div>
															<div className="right floated author">
			                                                    <img className="ui avatar image" src="app/img/usr_img_default.png" /> {model.developer_username}
			                                                </div>
														</div>
													</Link>
												);
											}
											return models;
										}) ()}
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

ModelStore.propTypes = {
	modelsList: PropTypes.array.isRequired,
	categoriesList: PropTypes.array.isRequired
};

module.exports = ModelStore;
