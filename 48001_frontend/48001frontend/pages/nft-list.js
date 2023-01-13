import Web3 from "web3";
import LibrartNavbar from "../components/librart-navbar";
const abiPathNft = require("../public/TestNFT.json");

import { useState, useEffect } from "react";

export default function nftList(collectionAddress) {
    const [list, setList] = useState("");
    const Collections = require("../public/collections.json");
    console.log(Collections, Collections["maxValue"]);
    let items = [];

    const name = async(event) => {
        
    }
    


    const lister = async() =>{
        for (let number = 0; number <= Collections["maxValue"]; number++) {
        if (typeof window !== "undefined") {
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(
            abiPathNft["abi"],
            collectionAddress);
            console.log(await contract.methods.tokenURI(event.target.number).call());
            const json =  await contract.methods.tokenURI(event.target.number).call();
            items.push(
                <div key={number}>
                    {json}
                </div>
                );
            }
        
    setList(items)
    }
}

    return (<>
        <LibrartNavbar />
        <div>{list}</div>
    </>
    );}