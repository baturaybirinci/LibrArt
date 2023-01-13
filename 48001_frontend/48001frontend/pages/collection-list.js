import Web3 from "web3";
import LibrartNavbar from "../components/librart-navbar";

export default function collectionList(adr) { // component yaratırken parametre ola
    const Collections = require("../public/collections.json");
    return (<>
    <LibrartNavbar/>
        {Collections["user1Collections"].map((element) =>
        
        <div className="wide-card">{element}</div>
        
        )}
    </>)


}