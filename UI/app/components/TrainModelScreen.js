var React = require('react');
var styles = require('../styles/styles');
var PropTypes = React.PropTypes;
var DownloadButtonContainer = require('../containers/DownloadButtonContainer');
var TrainingAccuracyChartContainer = require('../containers/TrainingAccuracyChartContainer');

function TrainModelScreen(props) {
  return(
	<div className="ui container">
		<div className="ui two column grid">
			<div className="row">
				<div className="column">
					<div className="ui fluid raised card">
						<div className="content">
							<div className="header center aligned">Upload Data for Training</div>
							<div className="description">
								<form className="ui form" onSubmit={props.onSubmitData} encType="multipart/form-data">
									<div className="field">
										<label>Image Width:</label>
										<input
											type="number"
											placeholder="0"
											value={props.imageWidth}
											onChange={props.onUpdateImageWidth} />
									</div>
									<div className="field">
										<label>Image Height:</label>
										<input
											type="number"
											placeholder="0"
											value={props.imageHeight}
											onChange={props.onUpdateImageHeight} />
									</div>
									<div className="field">
										<label>Number of Classes:</label>
										<input
											type="number"
											placeholder="0"
											value={props.classNum}
											onChange={props.onUpdateClassNum} />
									</div>
									<div className="field">
										<label>Learning Rate:</label>
										<input
											type="number"
											placeholder="0"
											step="any"
											value={props.learningRate}
											onChange={props.onUpdateLearningRate} />
									</div>
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
									<button className="ui primary disabled button" id="train-model-button" type="submit">Train</button>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="column results-section">
					<div className="ui fluid raised card">
						<div className="content">
							<div className="header center aligned">Training Results</div>
							<div className="description">
								<div>
									{props.result}
									<span id="download-button">
										<DownloadButtonContainer
											modelDownloadLink={props.modelDownloadLink}
											shouldDisplayButton={props.shouldDisplayButton} />
									</span>
								</div>
								<div id="result-charts">
									<TrainingAccuracyChartContainer
										shouldRenderChart={props.shouldRenderChart}
										container={props.container}
										options={props.options}
										epochValues={props.epochValues}
										dataValues={props.dataValues} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="ui modal long scrolling">
			<i className="close icon"></i>
			<div className="header">
				Enter model details
			</div>
			<div className="content">
				<form className="ui form">
					<div className="field">
						<label>Model Name</label>
						<input 
							type="text" 
							name="model-name" 
							placeholder="Model Name" 
							value={props.modelName}
							onChange={props.onUpdateModelName} />
					</div>
					<div className="field">
						<label>One Line Description</label>
						<input 
							type="text" 
							name="one-line-desc" 
							placeholder="Headline"
							value={props.oneLineDesc}
							onChange={props.onUpdateOneLineDesc} />
					</div>
					<div className="field">
						<label>Description</label>
						<textarea 
							name="description" 
							placeholder="Description"
							value={props.description}
							onChange={props.onUpdateDescription}>
						</textarea>
					</div>
					<div className="field">
						<label>Citation Count</label>
						<input 
							type="number" 
							name="citation-count" 
							placeholder="0"
							value={props.citationCount}
							onChange={props.onUpdateCitationCount} />
					</div>
					<div className="field">
						<label>Associated Paper</label>
						<input 
							type="text" 
							name="associated-paper" 
							placeholder="http://"
							value={props.associatedPaper}
							onChange={props.onUpdateAssociatedPaper} />
					</div>
				</form>
			</div>
			<div className="actions">
				<div className="ui black deny button">
					Cancel
				</div>
				<div className="ui positive right labeled icon button">
					Submit
					<i className="checkmark icon"></i>
				</div>
			</div>
		</div>
	</div>
  );
}

TrainModelScreen.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
  imageWidth: PropTypes.number.isRequired,
  onUpdateImageWidth: PropTypes.func.isRequired,
  imageHeight: PropTypes.number.isRequired,
  onUpdateImageHeight: PropTypes.func.isRequired,
  classNum: PropTypes.number.isRequired,
  onUpdateClassNum: PropTypes.func.isRequired,
  learningRate: PropTypes.number.isRequired,
  onUpdateLearningRate: PropTypes.func.isRequired,
  onUpdateFile: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
  result: PropTypes.string.isRequired,
  modelDownloadLink: PropTypes.string.isRequired,
  shouldDisplayButton: PropTypes.bool.isRequired,
  shouldRenderChart: PropTypes.bool.isRequired,
  container: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  epochValues: PropTypes.array.isRequired,
  dataValues: PropTypes.array.isRequired,
  modelName: PropTypes.string.isRequired,
  onUpdateModelName: PropTypes.func.isRequired,
  oneLineDesc: PropTypes.string.isRequired,
  onUpdateOneLineDesc: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  onUpdateDescription: PropTypes.func.isRequired,
  citationCount: PropTypes.number.isRequired,
  onUpdateCitationCount: PropTypes.func.isRequired,
  associatedPaper: PropTypes.string.isRequired,
  onUpdateAssociatedPaper: PropTypes.func.isRequired
};

module.exports = TrainModelScreen;
