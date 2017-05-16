var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

function UploadPreTrainedModelScreen(props) {
	return(
		<div className="ui container">
			<div className="ui one column grid">
				<div className="row">
					<div className="column">
						<div className="ui fluid raised card">
							<div className="content">
								<div className="header center aligned">Upload Pre Trained Model</div>
								<div className="description">
									<form className="ui form" onSubmit={props.onSubmitData} encType="multipart/form-data">
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
													onChange={props.onUpdateFile} />
												<input
													type="text"
													readOnly
													value={props.fileName} />
											</div>
										</div>
										<button className="ui primary button" type="submit">Upload</button>
										<Link to="/dashboard/predict">
											<button
												className="large ui button right floated">
												Go to Predict
											</button>
										</Link>
									</form>
									{(function() {
										if(props.result != '') {
											if(props.result.includes("not")) {
												return(
													<div className="ui error message">
														{props.result}
													</div>
												);
											} else {
												return(
													<div className="ui success message">
														{props.result}
													</div>
												);
											}
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

UploadPreTrainedModelScreen.propTypes = {
	onSubmitData: PropTypes.func.isRequired,
	onUpdateFile: PropTypes.func.isRequired,
	fileName: PropTypes.string.isRequired,
	result: PropTypes.string.isRequired
}

module.exports = UploadPreTrainedModelScreen;
