import React from "react";
import { useSiteContext } from "../../context";
import './Login.css'

export default function Login() {
    const { globalState, updateGlobalState } = useSiteContext();

    async function requestAccount() {
        if (window.klaytn) {
            const accounts = await window.klaytn.enable();
            if (accounts.length > 0) {
                updateGlobalState(accounts[0]);
            } else {
                alert('Please connect to Kaikas!')
            }
        } else {
            alert('Kaikas not Detected!');
        }
    }

    function logOut() {
        updateGlobalState('initial value');
    }

    return (
        <div>
            {globalState === 'initial value'? (
                <button onClick={requestAccount}>LogIn</button>
            ) : (
                <button onClick={logOut}>LogOut</button>
            )}
        </div>
    );
}
