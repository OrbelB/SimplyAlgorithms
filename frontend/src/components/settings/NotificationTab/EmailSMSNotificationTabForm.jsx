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
                        <label class="d-block h5">Email Notifications</label>
                        <div class="mb-1">
                            <strong className="text-secondary mb-1" for="inputNotificationEmail">Default notification email</strong>
                            <input className="form-control bg-secondary bg-gradient text-white" id="inputNotificationEmail" type="email" value={email} readonly/>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="AccountChangeEmail"/>
                                <label class="form-check-label h6" for="AccountChangeEmail">
                                    Account Changes
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="PostRepliesEmail"/>
                                <label class="form-check-label h6" for="PostRepliesEmail">
                                    Post Replies
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="PostLikesEmail"/>
                                <label class="form-check-label h6" for="PostLikesEmail">
                                    Post Likes
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="SpecialUpdatesEmail"/>
                                <label class="form-check-label h6" for="SpecialUpdatesEmail">
                                    Special Updates
                                </label>
                            </div>
                        </div>
                        <label class="d-block mt-2 h5">SMS Notifications</label>
                        <div class="mb-1">
                            <strong className="text-secondary mb-1" for="inputNotificationSMS">Default number</strong>
                            <input className="form-control bg-secondary bg-gradient text-white" id="inputNotificationSMS" type="email" value={phoneNumber === "" ? "no number provided" :  phoneNumber } readonly/>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="AccountChangesSMS"/>
                                <label class="form-check-label h6" for="AccountChangesSMS">
                                    Account Changes
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="PostRepliesSMS"/>
                                <label class="form-check-label h6" for="PostRepliesSMS">
                                    Post Replies
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="PostLikesSMS"/>
                                <label class="form-check-label h6" for="PostLikesSMS">
                                    Post Likes
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="SpecialUpdatesSMS"/>
                                <label class="form-check-label h6" for="SpecialUpdatesSMS">
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