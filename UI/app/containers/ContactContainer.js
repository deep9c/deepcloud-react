var React = require('react');
var Firebase = require('firebase');

var ContactContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      fullname: '',
	  email:'',
	  message:'',
	  tel:''
    }
  },
  onSubmitForm:function(e){
	e.preventDefault();
	var contactUs={
		fullname:this.state.fullname,
		email:this.state.email,
		message:this.state.message,
		tel:this.state.tel
	}
	var contactUsRef=new Firebase('https://deepcloud.firebaseio.com/contactUs');
	contactUsRef.push(contactUs);
	this.setState({
		fullname:'',
		email:'',
		message:'',
		tel:''
	});
  },
  onUpdateName:function(e){
	this.setState({
		fullname:e.target.value
	}
	);
  },
  onUpdateEmail:function(e){
  this.setState({
	email:e.target.value
  });
  },
  onUpdateMessage:function(e){
	this.setState({
		message:e.target.value
	});
  },
   onUpdateTel:function(e){
	this.setState({
		tel:e.target.value
	});
  },
  render: function () {
    return (
		<div className='ui container'>
			<div className='ui one column grid'>
				<div className='row'>
					<div className='column'>
						<div className='ui fluid raised card'>
							<div className='content'>
								<div className='header center aligned'>Contact Us</div>
								<div className='description'>
									<form role='form' className='ui form' onSubmit={this.onSubmitForm}>
										<div className='field'>
											<label>Full Name</label>
											<input
												type='text'
												placeholder='Enter Full Name'
												onChange={this.onUpdateName}
												value={this.state.fullName} />
										</div>
										<div className='field'>
											<label>Email Address</label>
											<input
												type='email'
												placeholder='Enter Email Address'
												onChange={this.onUpdateEmail}
												value={this.state.email} />
										</div>
										<div className='field'>
											<label>Mobile Number</label>
											<input
												type='tel'
												placeholder='Mobile Number'
												onChange={this.onUpdateTel}
												value={this.state.tel} />
										</div>
										<div className='field'>
											<label>Message</label>
											<textarea
												rows='4'
												cols='40'
												placeholder='Enter your message here'
												onChange={this.onUpdateMessage}
												value={this.state.message}>
											</textarea>
										</div>
										<button
											type='submit'
											className='ui primary button'>
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
  }
});

module.exports = ContactContainer;
