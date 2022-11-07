import image from "../../assets/noPictureTemplate.png";
import { currentUserInfo } from "../../pages/UserProfilePage";
export default function Profile() {
        return (
          <div>
            {currentUserInfo.map(({username,usertype,email,bio,joinedMonth,joinedYear}) => {
              return (
                <div>
                    <div className={"container mt-2"}>
                        <div className={"row d-flex justify-content-center"}>
                            <div className={"col-md-7"}>
                                <div className={"card border-white p-3 py-4"}>
                                    <div className={"text-center"}>
                                        <img 
                                        src={image}
                                        height="125px"
                                        width="150px"
                                        className="rounded-circle"
                                        >
                                        </img>
                                    </div>
                                    <div className={"text-center mt-3"}>
                                        <span className={"bg-secondary p-1 px-4 rounded text-white"}>{usertype}</span>
                                        <h5 className={"mt-2 mb-0"}>{username}</h5>
                                        <span>{email}</span>
                                        
                                        <div className={"px-4 mt-1"}>
                                            <p className="fonts">{bio} </p>
                                        </div>
                                        <div className={"mt-4"}>
                                            <span className={"text-white p-2 rounded bg-primary font-weight-italic"}>Joined {joinedMonth}, {joinedYear}</span> 
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              );
            })}
          </div>
    );
}