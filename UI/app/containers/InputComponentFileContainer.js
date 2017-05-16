var React = require('react')
var PropTypes = React.PropTypes
var InputComponentFile = require('../components/InputComponentFile')

var InputComponentFileContainer = React.createClass({
	propTypes: {
		name: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		onChooseFile: PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			name: this.props.name,
			text: this.props.text,
			fileName: '',
			file: ''
		}
	},
	handleUpdateFile: function (e) {
		e.preventDefault()
		var reader = new window.FileReader()
		var file = e.target.files[0]
		var self = this
		var fileType = file.name.split('.').pop()
		if(fileType !== 'jpeg' && fileType !== 'png' && fileType !== 'jpg') {
			alert('Please upload a PNG or JPEG file.')
			return false
		}
		reader.onloadend = function () {
			self.setState({
				file: file,
				fileName: file.name
			})
			self.props.onChooseFile(self.state.file, self.state.fileName)
		}
		reader.readAsDataURL(file)
	},
	render: function () {
		return(
			<InputComponentFile
			name={this.state.name}
			text={this.state.text}
			onUpdateFile={this.handleUpdateFile}
			fileName={this.state.fileName} />
		)
	}
})

module.exports = InputComponentFileContainer
