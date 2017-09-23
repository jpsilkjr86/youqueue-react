// imports react component classNamees
import React, { Component } from 'react';


class CustomerForm extends Component {

	constructor(props) {
		super(props);

		// set initial state
	  this.state = { 
			
		};



	} 

  render() {
  	return (
			<div className="row">
			  <div className="col s12">
			    <div className="card z-depth-4">
			      <div className="card-content" style="padding: 30px 40px 0 40px">
			        <form id="new-customer" action="/customer/add" method="post">
			                
			          <div className="row">
			            <h5 className="center-align">Add Customer</h5>
			              <p className="right"><em>*Required input</em></p>
			              
			                <div className="row" style="margin-top: 20px">
			                  <div className="input-field col s12 m6">
			                    <i className="material-icons prefix">group</i>
			                      <input id="party_name" type="text" className="validate" required="required" name="party_name"/>
			                      <label for="party_name">*Party Name</label>
			                  </div>
			                	<div className="input-field col s12 m6">
			                  	<i className="material-icons prefix">group</i>
			                      <input id="party_size" type="number" className="validate" required="required" name="party_size"/>
			                      <label for="party_size">*Party Size</label>
			                  </div>
			                  <div className="input-field col s12 m6">
                            <i className="material-icons prefix">phone</i>
                            <input id="phone_number" type="tel" className="validate" required="required" name="phone_number"/>
                            <label for="phone_number">*Telephone</label>
                        </div>
                        <div className="input-field col s12 m6">
                            <i className="material-icons prefix">email</i>
                            <input id="email-new" type="email" className="validate" required="required" name="email"/>
                            <label for="email">Email</label>
                        </div>
                        <div className="input-field col s12 m6">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="first_name" type="text" className="validate" required="required" name="first_name"/>
                            <label for="first_name">*First Name</label>
                        </div>
                        <div className="input-field col s12 m6">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="last_name" type="text" className="validate" name="last_name"/>
                            <label for="last_name">Last Name</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">event</i>
                            <select multiple name="occasion" form="new-customer" required>
                                <option value="" disabled selected>*Choose one or more occasion.</option>
                                <option value="casual dining">Casual Dining</option>
                                <option value="birthday">Birthday</option>
                                <option value="wedding anniversary">Wedding Anniversary</option>
                                <option value="family gathering">Family Gathering</option>
                                <option value="other">Other</option>
                            </select>
                            <label for="occasion">*Occasion</label>
                        </div>
                        <div className="col s12 center">
                            <a className="btn btn-large waves-effect waves-light red lighten-2 left" href="/">Cancel</a>
                            <button className="btn btn-large waves-effect waves-light right" type="submit">Submit</button>
                        </div>                                
			            		</div> 
			          </div>
			        </form>
			      </div> 
			    </div> 
			  </div> 
			</div>
		);
	}

}

// exports CustomerForm component for other files to use
export default CustomerForm;