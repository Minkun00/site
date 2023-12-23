// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract login {
    address private owner;
    mapping (address => bool) certified;
    mapping (address => bool) ban;

    constructor () {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // owner can make certification to write blogs
    function certification(address _address) public onlyOwner returns (bool) {
        require(certified[_address] == false, "Already certified");
        if (ban[_address] == true) {
            ban[_address] = false;
        }
        certified[_address] = true;
        return true;
    }

    // for user, if you are certified
    function isCertified() public view returns (bool) {
        return certified[msg.sender];
    }


    // for user, if you are banned
    function banUser(address _address) public onlyOwner {
        ban[_address] = true;
        certified[_address] = false;
    }

    function isBanned() public view returns (bool) {
        return ban[msg.sender];
    }
}