import { currentUserInfo } from "../../../pages/UserProfilePage";
import {useSelector} from "react-redux";
export default function EmailSMSNotificationTabForm(){
    const { email, phoneNumber} = useSelector(state => state.user);
    return (
        <div>
            {currentUserInfo.map(({}) => {
              return (
                <div>
                    <form>
                        <label class="d-block">Email Notifications</label>
                        <div class="mb-1">
                            <small className="text-secondary mb-1" for="inputNotificationEmail">Default notification email</small>
                            <input className="form-control bg-secondary bg-gradient text-white" id="inputNotificationEmail" type="email" value={email} readonly/>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                <label class="form-check-label" for="gridCheck">
                                    Account Changes
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                <label class="form-check-label" for="gridCheck">
                                    Post Replies
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                <label class="form-check-label" for="gridCheck">
                                    Post Likes
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                <label class="form-check-label" for="gridCheck">
                                    Special Updates
                                </label>
                            </div>
                        </div>
                        <label class="d-block mt-2">SMS Notifications</label>
                        <div class="mb-1">
                            <small className="text-secondary mb-1" for="inputNotificationSMS">Default number</small>
                            <input className="form-control bg-secondary bg-gradient text-white" id="inputNotificationSMS" type="email" value={phoneNumber === "" ? "no number provided" :  phoneNumber } readonly/>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                <label class="form-check-label" for="gridCheck">
                                    Account Changes
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                <label class="form-check-label" for="gridCheck">
                                    Post Replies
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                <label class="form-check-label" for="gridCheck">
                                    Post Likes
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="gridCheck"/>
                                <label class="form-check-label" for="gridCheck">
                                    Special Updates
                                </label>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary">Save Changes</button>
                    </form>
                </div>
              );
            })}
        </div>
    );
}