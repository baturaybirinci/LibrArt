import {useSelector} from "react-redux";

function Profile() {
    const userAddress = useSelector(state => state.address);
    const user = useSelector(state => state.user);
    return (
        <div />
    )
}

 export default Profile;
