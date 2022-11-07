import React, { useState } from 'react';
export default function SecurityTabForm(){
    const [input, setInput] = useState({
        password: '',
        confirmPassword: ''
      });
     
      const [error, setError] = useState({
        password: '',
        confirmPassword: ''
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
     
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (input.confirmPassword && value !== input.confirmPassword) {
                stateObj["confirmPassword"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["confirmPassword"] = input.confirmPassword ? "" : error.confirmPassword;
              }
              break;
     
            case "confirmPassword":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              } else if (input.password && value !== input.password) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
     
            default:
              break;
          }
     
          return stateObj;
        });
      }
    return (
        <div className="SecurityTab">
            <form>
                <div className="form-group">
                    <label className="d-block">Change Password</label>
                    <input type="text" className="form-control" placeholder="Enter your old password"/>
                    <input
                        type="password"
                        name="password"
                        placeholder='Enter Password'
                        className="form-control mt-1"
                        value={input.password}
                        onChange={onInputChange}
                        onBlur={validateInput}>
                    </input>
                        {error.password && <span className='err text-danger'>{error.password}</span>}
                
                        <input
                        type="password"
                        name="confirmPassword"
                        placeholder='Enter Confirm Password'
                        className="form-control mt-1"
                        value={input.confirmPassword}
                        onChange={onInputChange}
                        onBlur={validateInput}>
                    </input>
                        {error.confirmPassword && <span className='err text-danger'>{error.confirmPassword}</span>}
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-1">
                    Confirm
                </button>
            </form>
        </div>
    );
}