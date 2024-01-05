import React, { useState } from 'react';
import LoginJson from '../../contract/login.json';
import { useSiteContext } from '../context';
import Caver from 'caver-js';
import './Owner.css';
import { writeUser, deleteUser } from '../../functions/UserFunctions/ModifyUser';
import { modifyWrittenPosts } from '../../functions/UserFunctions/ModifyUser'

export default function Owner() {
  const loginABI = LoginJson.abi;
  const loginAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const caver = new Caver(window.klaytn); 
  const contract = new caver.klay.Contract(loginABI, loginAddress);

  const { globalState } = useSiteContext();
  const isOwner = globalState === process.env.REACT_APP_OWNER_ADDRESS;

 const [userAddressInput, setUserAddressInput] = useState('');

 const handleInputChange = (event) => {
  setUserAddressInput(event.target.value.toLowerCase());
};



 const certifyUser = async () => {
   try {
    await contract.methods.certification(userAddressInput).send({
      from:window.klaytn.selectedAddress,
      gas: '2000000',
    })
    await writeUser(userAddressInput);
   } catch (error) {
     console.log('Certification error!', error);
   }
 };

 const banUser = async () => {
  try {
    await contract.methods.banUser(userAddressInput).send({
      from:window.klaytn.selectedAddress,
      gas: '2000000',
    })
    await deleteUser(userAddressInput);
  } catch (error) {
    console.log('ban error!', error);
  }
 }

 const test = async () => {
  await modifyWrittenPosts(globalState, 1);
 }

 return (
    <div className='owner'>
      {isOwner ? (
        <div>
          <div>
            <input className='address-input'
              type="text"
              value={userAddressInput}
              onChange={handleInputChange}
              placeholder="Enter user address"
            />
          </div>
          <button onClick={certifyUser}>Certify User</button>
          <button onClick={banUser}>Ban User</button>
          <button onClick={test}>Test Button</button>
        </div>
      ) : (
        <div>
          <p>You are not the owner. Access denied.</p>
        </div>
      )}
    </div>
  );
}