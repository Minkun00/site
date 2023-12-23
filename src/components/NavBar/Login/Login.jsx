import React, { useEffect } from "react";
import { useSiteContext } from "../../context";
import './Login.css'

export default function Login() {
    const { globalState, updateGlobalState } = useSiteContext();
    
    useEffect(() => {
        console.log(`address : ${globalState}`);
    }, [globalState]);

    async function requestAccount() {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                updateGlobalState(accounts[0]);
                alert(`${accounts[0]} connected!`);
            } catch (error) {
                alert("Error connecting to Metamask");
                console.log(error);
            }
        } else {
            alert("Metamask Not Detected!");
        }
    }

    function logOut() {
        updateGlobalState('initial value');
    }

    return (
        <div>
            {globalState === 'initial value'? (
                <button onClick={requestAccount}>Request Account</button>
            ) : (
                <button onClick={logOut}>LogOut</button>
            )}
        </div>
    );
}
