import React, { useEffect } from "react";
import { useSiteContext } from "../../context";
import './Login.css'

export default function Login() {
    const { globalState, updateGlobalState } = useSiteContext();
    
    useEffect(() => {
        console.log(`address : ${globalState}`);
    }, [globalState]);

    async function requestAccount() {
        if (window.klaytn) {
            const accounts = await window.klaytn.enable();
            console.log(accounts);
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
                <button onClick={requestAccount}>Request Account</button>
            ) : (
                <button onClick={logOut}>LogOut</button>
            )}
        </div>
    );
}
