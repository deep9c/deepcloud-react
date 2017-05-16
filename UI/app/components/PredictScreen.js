var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;

var PredictScreen = React.createClass({
	componentDidMount: function() {
		$('.ui.checkbox').checkbox();
		$('select.dropdown').dropdown();
		$('.toggle.checkbox').on('click', function() {
			var pretrainedmodels = $('#pretrainedmodels').prop('checked') ? 'on' : 'off';
			console.log(pretrainedmodels);
			this.props.onModelSelectionChange(pretrainedmodels);
		}.bind(this));
	},
	componentDidUpdate: function() {
		$('select.dropdown').dropdown();
	},
	render: function() {
		var jobsList = JSON.parse(localStorage.getItem('jobsList'));
		return(
			<div className="ui container">
				<div className="ui one column grid">
					<div className="row">
						<div className="column">
							<div className="ui fluid raised card">
								<div className="content">
									<div className="header center aligned">Prediction</div>
									<div className="description">
										<form className="ui form" onSubmit={this.props.onSubmitData} encType="multipart/form-data">
											<div className="field">
												<div className="ui left action input">
													<label htmlFor="file" className="ui icon button">
														<i className="attach icon"></i>
														Choose File
													</label>
													<input
														type="file"
														id="file"
														name="upload"
														multiple="multiple"
														style={styles.invisible}
														onChange={this.props.onUpdateFile} />
													<input
														type="text"
														readOnly
														value={this.props.fileName} />
												</div>
											</div>
											<div className="two fields">
												<div className="field">
													<div className="ui toggle checkbox">
														<input type="checkbox" name="pretrainedmodels" tabIndex="0" className="hidden" id="pretrainedmodels" />
														<label>Select a pretrained model</label>
													</div>
												</div>
												{(function() {
													if(this.props.loadModelsList) {
														return(
															<div className="field">
																<select className="ui dropdown" onChange={this.props.onModelSelection}>
																	<option value="">Select Job ID</option>
																	{
																		jobsList.map(function(job){
																			return(
																				<option
																					key={job.job_id}
																					value={job.job_id}>{job.job_id}</option>
																			);
																		})
																	}
																</select>
															</div>
														);
													}
												}.bind(this)) ()}
												<input type="hidden" name="job_id" className="hidden" id="job_id" />
											</div>
											<button className="ui primary button" type="submit">Predict</button>
										</form>
										{(function() {
											if(this.props.result != '') {
												if(this.props.result.includes("failed")) {
													return(
														<div className="ui error message">
															{this.props.result}
														</div>
													);
												} else {
													return(
														<div className="ui success message">
															<div className="ui two column grid">
																<div className="row">
																	<div className="column">
																		Uploaded Image: <img height="100" width="100" src={this.props.imagePreviewUrl} />
																	</div>
																	<div className="column">
																		{this.props.result}
																	</div>
																</div>
															</div>
														</div>
													);
												}
											}
										}.bind(this)) ()}
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

module.exports = PredictScreen;
