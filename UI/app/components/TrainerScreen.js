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
												onChange={props.onUpdateModelfile} />
											<input
												type="text"
												readOnly
												value={props.modelfileName} />
										</div>
									</div>

									
										<div className='field'>
											<label>Epoch</label>
											<input
												type='text'
												placeholder='Enter Epoch'
												onChange={props.onUpdateEpoch}
												value={props.epoch} />
										</div>
										<div className='field'>
											<label>Parameter</label>
											<input
												type='text'
												placeholder='Enter parameter'
												onChange={props.onUpdateParameter}
												value={props.parameter} />
										</div>
										<div className='field'>
											<label>batchsize</label>
											<input
												type='text'
												placeholder='Enter batchsize'
												onChange={props.onUpdateBatchsize}
												value={props.batchsize} />
										</div>
										<div className='field'>
											<label>training</label>
											<input
												type='text'
												placeholder='Enter training'
												onChange={props.onUpdateTraining}
												value={props.training} />
										</div>
										<div className='field'>
											<label>validation</label>
											<input
												type='text'
												placeholder='Enter validation'
												onChange={props.onUpdateValidation}
												value={props.validation} />
										</div>
										<div className='field'>
											<label>dropoutlastlayer</label>
											<input
												type='text'
												placeholder='Enter dropoutlastlayer'
												onChange={props.onUpdateDropoutlastlayer}
												value={props.dropoutlastlayer} />
										</div>
										<div className='field'>
											<label>weightsinit</label>
											<input
												type='text'
												placeholder='Enter weightsinit'
												onChange={props.onUpdateWeightsinit}
												value={props.weightsinit} />
										</div>
										<div className='field'>
											<label>optimizer</label>
											<input
												type='text'
												placeholder='Enter optimizer'
												onChange={props.onUpdateOptimizer}
												value={props.optimizer} />
										</div>
										<div className='field'>
											<label>learningrate</label>
											<input
												type='text'
												placeholder='Enter learningrate'
												onChange={props.onUpdateLearningrate}
												value={props.learningrate} />
										</div>
										<div className='field'>
											<label>rho</label>
											<input
												type='text'
												placeholder='Enter rho'
												onChange={props.onUpdateRho}
												value={props.rho} />
										</div>
									
									<button className="ui primary disabled button" id="train-model-button" type="submit">Train</button>
								</form>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>		
	</div>
  );
}

TrainModelScreen.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
  modelfileName: PropTypes.string.isRequired,
  onUpdateModelfile: PropTypes.func.isRequired,
  epoch: PropTypes.number.isRequired,
  onUpdateEpoch: PropTypes.func.isRequired,
  parameter: PropTypes.number.isRequired,
  onUpdateParameter: PropTypes.func.isRequired,
  batchsize: PropTypes.number.isRequired,
  onUpdateBatchsize: PropTypes.func.isRequired,
  onUpdateTraining: PropTypes.func.isRequired,
  training: PropTypes.string.isRequired,
  validation: PropTypes.string.isRequired,
  onUpdateValidation: PropTypes.func.isRequired,
  dropoutlastlayer: PropTypes.string.isRequired,
  onUpdateDropoutlastlayer: PropTypes.func.isRequired,
  weightsinit: PropTypes.string.isRequired,
  onUpdateWeightsinit: PropTypes.func.isRequired,
  optimizer: PropTypes.string.isRequired,
  onUpdateOptimizer: PropTypes.func.isRequired,
  learningrate: PropTypes.string.isRequired,
  onUpdateLearningrate: PropTypes.func.isRequired,
  rho: PropTypes.string.isRequired,
  onUpdateRho: PropTypes.func.isRequired,  
};

module.exports = TrainModelScreen;
