var React = require('react');
var PropTypes = React.PropTypes;
const InputComponentFileContainer = require('../containers/InputComponentFileContainer');
const InputComponentSubmitButtonContainer = require('../containers/InputComponentSubmitButtonContainer');

function ModelTestScreen (props) {
    return (
        <div className="ui container">
            {(function () {
				var components = [];
				var count = 0;
				for(let component of props.inputComponents) {
					switch(component['type']) {
                        case 'file':
                            components[count++] = (<InputComponentFileContainer
													key={count}
                                					name={component['name']}
                                					text={component['text']}
                                					onChooseFile={props.onChooseFile} />);
                            break;
                        case 'button':
                            components[count++] = (<InputComponentSubmitButtonContainer
													key={count}
													name={component['name']}
													text={component['text']}
													onClickSubmit={props.onClickSubmit} />);
                            break;
                        default:
                            console.log('invalid input component');
                    }
                }
                for(let component of props.outputComponents) {
                    switch(component['type']) {
                        case 'div':
							components[count++] = (<div
													key={count}
													className='output' />);
							break;
                        default:
                            console.log('invalid output component');
                    }
                }
				return components;
            }) ()}
        </div>
    );
}

ModelTestScreen.propTypes = {
	inputComponents: PropTypes.array.isRequired,
	outputComponents: PropTypes.array.isRequired
};

module.exports = ModelTestScreen;
