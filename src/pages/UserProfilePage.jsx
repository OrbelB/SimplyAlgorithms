import UserProfile from "../components/userprofile/UserProfile";
export {currentUserInfo};
const currentUserInfo = [
    {
        fname: "First Name",
        lname: "Last Name",
        username: 'juliusomo',
        usertype: 'Student',
        dob: "12/23/2010",
        email: 'email@address.com',
        number: '(123) 456-7890',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        joinedMonth: 'December',
        joinedYear: '2022'
    }
]

export default function SettingsPage(){
    return(
            <UserProfile/>
    );
}