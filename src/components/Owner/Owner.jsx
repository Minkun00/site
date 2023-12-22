import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import LoginJson from '../../contract/login.json';
import { useSiteContext } from './components/context';

const loginABI = LoginJson.abi;

/**
 * @description only Owner can use this function. Using Smart Contract
 */
export default function Riaco() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [addressToCertify, setAddressToCertify] = useState('');

  useEffect(() => {
    const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(ethereumProvider);

    const loginContract = new ethers.Contract(
      process.env.REACT_APP_CONTRACT_ADDRESS,
      loginABI,
      ethereumProvider.getSigner()
    );
    setContract(loginContract);
  }, []);

  const handleCertification = async () => {
    if (!contract) {
      console.error('Smart contract not initialized!');
      return;
    }

    try {
      await contract.certification(addressToCertify);
      alert(`Certified : ${addressToCertify}`);
    } catch (error) {
      console.error('Error calling certification method! : ', error);
    }
  };

  const onlyOwner = () => {
    const { globalState } = useSiteContext();
    const isOwner = globalState === process.env.REACT_APP_OWNER_ADDRESS;

    if (isOwner) {
      return (
        <div>
          <input
            type="text"
            placeholder="Enter address to certify"
            value={addressToCertify}
            onChange={(e) => setAddressToCertify(e.target.value)}
          />
          <button onClick={handleCertification}>Certify Address</button>
        </div>
      );
    }

    return (
        <div>
            <h3>Only owner can use this page</h3>
        </div>
    )
  };

  return <div>{onlyOwner()}</div>;
}
