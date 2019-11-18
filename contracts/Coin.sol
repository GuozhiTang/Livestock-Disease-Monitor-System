pragma solidity ^0.5.8;

contract Coin {

  address owner;
  mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

  modifier ownerOnly() {
		require(msg.sender == owner);
		_;
	}

	function mint(uint amount) public ownerOnly returns(bool) {
		balances[msg.sender] += amount;
		return true;
	}

	function burn(uint amount) public ownerOnly returns(bool) {
		if (amount > balances[msg.sender]) {
			balances[msg.sender] = 0;
		} else {
			balances[msg.sender] -= amount;
		}
		return true;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

  function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}