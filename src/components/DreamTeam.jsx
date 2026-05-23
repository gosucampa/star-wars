import {friend} from "../utils/constants.js";
import Friend from "./Friend.jsx";


const DreamTeam = () => {
    return (
        <section className="float-end w-50 row border border-warning rounded-bottom-5 ms-1 me-0">
            <h2 className="text-center">Dream team</h2>
            {friend.map((friend, i) => <Friend friend={friend} key={friend} pos={i + 1}/>)}
        </section>
    );
};

export default DreamTeam;