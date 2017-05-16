var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;
var TrainingAccuracyChartContainer = require('../containers/TrainingAccuracyChartContainer');
var DownloadButtonContainer = require('../containers/DownloadButtonContainer');
var generalUtils = require('../utils/GeneralUtils.js');
var SuspendResumeButtonContainer = require('../containers/SuspendResumeButtonContainer');
var KillJobButtonContainer = require('../containers/KillJobButtonContainer');

function JobDetails(props) {
	console.log('jobdetails props', props);
	return(
		<div className="ui container">
			<div className="ui one column grid center aligned">
				<div className="row">
					<div className="column ten wide">
						<div className="ui fluid raised card">
							<div className="content">
								<div className="header center aligned">Job Details</div>
								<div className="description">
									<div className="ui two column grid">
										<div className="row">
											<div className="column right aligned">
												<div className="ui list">
													<div className="item">ID:</div>
													<div className="item">Type:</div>
													<div className="item">Status:</div>
												</div>
											</div>
											<div className="column left aligned">
												<div className="ui list">
													<div className="item">{props.jobID}</div>
													<div className="item">{generalUtils.capitalizeFirstLetter(props.jobType)}</div>
													<div className="item">{generalUtils.capitalizeFirstLetter(props.jobStatus)}</div>
												</div>
											</div>
										</div>
									</div>
									{(function() {
										console.log('in jobDetails', props.jobType);
										if(props.jobType == 'training') {
											if(isNaN(props.procID)) {
												if(props.procID == 'processKilled' || props.procID == 'processCrashed') {
													return null;
												} else {
													return(
														<div>
														<div className="ui two column grid">
															<div className="row">
																<div className="column right aligned">
																	<div className="ui list">
																		<div className="item">Training Accuracy:</div>
																		<div className="item">Model:</div>
																	</div>
																</div>
																<div className="column left aligned">
																	<div className="ui list">
																		<div className="item">{props.finalAccuracy}</div>
																		<div className="item">
																			<DownloadButtonContainer
																				modelDownloadLink={props.model}
																				shouldDisplayButton={true} />
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="ui one column grid center aligned">
															<div className="row">
																<div className="column">
																	<div className="ui container" id="chart-container">
																		<TrainingAccuracyChartContainer
																			shouldRenderChart={true}
																			container='accuracy-epoch-chart'
																			options={props.options} />
																	</div>
																</div>
															</div>
														</div>
														</div>
													);
												}
											} else {
												return(
													<div className="ui two column grid">
														<div className="row">
															<div className="column right aligned">
																<SuspendResumeButtonContainer
																	action={props.jobStatus == 'live' ? 'suspend' : 'resume'}
																	jobID={props.jobID}
																	procID={props.procID}
																	onSuspendResume={props.handleSuspendResume}
																	isDisabled={props.isSuspendResumeButtonDisabled} />
															</div>
															<div className="column">
																<KillJobButtonContainer
																	jobID={props.jobID}
																	procID={props.procID}
																	isDisabled={props.isKillButtonDisabled}
																	onKillJob={props.handleKillJob} />
															</div>
														</div>
													</div>
												);
											}
										} else {
											return(
												<div className="ui two column grid">
													<div className="row">
														<div className="column right aligned">
															<div className="ui list">
																<div className="item">Prediction:</div>
															</div>
														</div>
														<div className="column">
															<div className="ui list">
																<div className="item">{props.prediction}</div>
															</div>
														</div>
													</div>
												</div>
											);
										}
									}) ()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

JobDetails.propTypes = {
	jobID: PropTypes.string.isRequired,
	jobType: PropTypes.string.isRequired,
	jobStatus: PropTypes.string.isRequired,
	finalAccuracy: PropTypes.string,
	prediction: PropTypes.string,
	model: PropTypes.string,
	options: PropTypes.object,
	handleSuspendResume: PropTypes.func
};

module.exports = JobDetails;
