import {useSelector} from "react-redux";

function Profile() {
    const userAddress = useSelector(state => state.address);
    return (
        <div />
    )
}

 export default Profile;
