import { currentUserInfo } from "../../../pages/UserProfilePage";
import React, { useState } from 'react';
export default function AccountTabForm({username}){
  const [input, setInput] = useState({
    usrname: '',
    em: '',
    phone: ''
  });
 
  const [error, setError] = useState({
    usrname: '',
    em: '',
    phone: ''
  })
 
  const onInputChange = e => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }
 
  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };
 
      switch (name) {
        case "usrname":
          if (!value) {
            stateObj[name] = "Please enter a new Username.";
          }else if(value === {username}){
            stateObj[name] = "Can't be same password";
          }
          break;

        case "em":
          if (!value) {
            stateObj[name] = "Please enter a new Email.";
          }
          break;
 
        case "phone":
          if (!value) {
            stateObj[name] = "Please enter new Phone Number.";
          }
          break;
 
        default:
          break;
      }
 
      return stateObj;
    });
  }
    return (
      <div>
            {currentUserInfo.map(({username,email,number}) => {
              return (
                <div>
                    <form className="m-1">
                      <label className="mt-2" for="username">Username</label>
                      <div className="form-group">
                        <small className="text-secondary mb-1"> Current Username: {username}</small>
                        <input 
                          type="text" 
                          className={"form-control"} 
                          id="usernameInput" 
                          name="usrname" 
                          placeholder="Enter username"
                          value={input.usrname}
                          onChange={onInputChange}
                          onBlur={validateInput}>
                        </input>
                        {error.usrname && <span className='err text-danger'>{error.usrname}</span>}
                      </div>
                      <label className="mt-2" for="emailInput">Email</label>
                      <div className="form-group">
                        <small className="text-secondary mb-1"> Current Email: {email}</small>
                        <input 
                          type="text" 
                          className={"form-control"} 
                          id="emailInput" 
                          name="em" 
                          placeholder="Enter Email"
                          value={input.em}
                          onChange={onInputChange}
                          onBlur={validateInput}>
                        </input>
                        {error.em && <span className='err text-danger'>{error.em}</span>}
                      </div>
                      <label className="mt-2" for="numberInput">Phone Number</label>
                      <div className="form-group">
                        <small className="text-secondary mb-1"> Current Number: {number}</small>
                        <input 
                          type="number" 
                          className={"form-control"} 
                          id="numberInput" 
                          name="phone" 
                          placeholder="Enter phone number"
                          value={input.phone}
                          onChange={onInputChange}
                          onBlur={validateInput}>
                        </input>
                        {error.phone && <span className='err text-danger'>{error.phone}</span>}
                      </div>
                      <div className="form group mt-2 mb-2">
                        <label for="usetTypeInput" className="col-sm-4 col-md-4 control-label text-right">User Type: <br/></label>
                          <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                          <label class="form-check-label active" for="inlineRadio1">Student</label>
                          </div>
                          <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                          <label class="form-check-label" for="inlineRadio2">Teacher</label>
                          </div>
                      </div>
                      <button type="button" class="btn btn-primary">Confirm</button>
                      <button type="reset" class="btn btn-light">Reset Changes</button>
                      <hr/>
                      <div class="form-group">
                        <label class="d-block text-danger">Delete Account</label>
                        <p class="text-muted font-size-sm">Once you delete your account, there is no going back. Please be certain.</p>
                      </div>
                      <button class="btn btn-danger" type="button">Delete Account</button>
                    </form>
                </div>
              );
            })}
        </div>
    );
}