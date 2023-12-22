import React from "react";
import { useSiteContext } from "../../context";

export default function Login() {
    const {globalState, updateGlobalState} = useSiteContext();
    
    async function requestAccount() {
        console.log("Requesting account...");
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                updateGlobalState(accounts[0]);
                alert(`${globalState} connected!`);
            } catch (error) {
                alert("Error connecting to Metamask");
                console.log(error)
            }
        } else {
            alert("Metamask Not Detected!")
        }
    }

    return (
        <div>
            <button onClick={requestAccount}>Request Account</button>
        </div>
    )
}