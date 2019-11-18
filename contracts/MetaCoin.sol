pragma solidity ^0.5.8;

import "./ConvertLib.sol";
import "./Coin.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin is Coin{

	constructor() public {
		owner = msg.sender;
		// balances[tx.origin] = 10000;
		// balances[msg.sender] = 10000;
	}

	function sendEther(address payable receiver) public payable returns(bool) {
		if (msg.sender.balance < msg.value) {
			return false;
		}
		receiver.transfer(msg.value);
	}

	function sendCoinsToMany(address[] memory receivers, uint amount) public returns(bool sufficient){
		uint totalAmount = amount * receivers.length;
		if (balances[msg.sender] < totalAmount) return false;
		for (uint i = 0; i < receivers.length; i++) {
			sendCoin(receivers[i], amount);
		}
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}
}
