pragma solidity ^0.5.8;

contract SupplyChain {
  // Different levels of actors in supply chain
  enum Actor{Producer, Tester, Retailer, Customer}
  // Samples of some livestocks as products
  enum Livestocktype{Cattle, Chicken, Pig, Sheep}
  // Create a user structure
  struct User {
    bytes32 ID;
    bytes32 name;
    Actor actor;
  }
  // Create a livestock structure
  struct Livestock {
    bytes32 livestockID;
    bytes32 livestockName;
    uint produceTime;
    bytes32 producerName;
    uint[] timestamps;
    bytes32 retailerName;
    bytes32[] retailerNames;
    uint[] retailerTimes;
    uint sellTime;
    bytes32 customerName;
    bool isBinding;
    address owner;
  }

  // Different mappings (key, value) pairs
  mapping(address => User) producerMap;
  mapping(address => User) testerMap;
  mapping(address => User) retailerMap;
  mapping(address => User) customerMap;
  mapping(bytes32 => Livestock) livestockMap;
  mapping(address => bool) whiteList;
  address owner;

  function Supply_Chain() public {
    owner = msg.sender;
    whiteList[owner] = true;
  }

  // Add an address to the whitelist
  function addWhiteList(address addr) public {
    whiteList[addr] = true;
  }

  function newUser(bytes32 ID, bytes32 name, Actor actor) public returns(bool Boolean, string memory String) {
    User memory user;

    if (actor == Actor.Producer) {
      user = producerMap[msg.sender];
    } else if (actor == Actor.Retailer) {
      user = retailerMap[msg.sender];
    } else if (actor == Actor.Customer) {
      user = customerMap[msg.sender];
    } else {
      return (false, "the actor is not belong");
    }

    if (user.ID != 0x0) {
      return (false, "this ID has bee occupied!");
    }
    user.ID = ID;
    user.name = name;
    user.actor = actor;
    return (true, "Success!");
  }

  // this interface just for producer
  function newProduct (bytes32 livestockID, bytes32 livestockName, uint timestamp) public returns(bool, bytes32) {
    Livestock storage livestock = livestockMap[livestockID];
    if (livestock.livestockID != 0x0) {
      return (false, "The livestockID already exist!");
    }
    User memory user = producerMap[msg.sender];
    if (user.ID == 0x0) {
      return (false, "The producer does not exist!");
    }
    livestock.livestockID = livestockID;
    livestock.livestockName = livestockName;
    livestock.produceTime = timestamp;
    livestock.producerName = user.name;
    return (true, "Success, produce a new product");
  }

  // this interface just for retailer
  function retailerInnerTransfer (bytes32 livestockID, uint timestamp) public returns(bool Boolean, string memory String) {
    Livestock storage livestock = livestockMap[livestockID];
    if (livestock.livestockID == 0x0) {
      return (false, "The livestockID does not exist!");
    }
    User memory user = retailerMap[msg.sender];
    if (user.ID == 0x0) {
      return (false, "The retailer does not exist");
    }
    livestock.timestamps.push(timestamp);
    livestock.retailerNames.push(user.name);
    return (true, "Success");
  }

  function fromRetailerToCustomer (bytes32 livestockID, uint timestamp) public returns(bool Boolean, string memory String) {
    Livestock storage livestock = livestockMap[livestockID];
    if (livestock.livestockID == 0x0) {
      return (false, "The livestockID don't sxist!");
    }
    livestock.sellTime = timestamp;
    return  (true, "Successfully sold!");
  }

  function getLivestockRecordsBywhiteList (bytes32 livestockID) public returns (
    bool, string memory, bytes32 producerName, uint produceTime, bytes32[] memory retailerNames,
    uint[] memory retailerTimes, bytes32 customerName, uint sellTime
  ) {
    Livestock storage livestock = livestockMap[livestockID];
    if (!whiteList[msg.sender]) {
      return (false, "no access", producerName, produceTime, retailerNames, retailerTimes, customerName, livestock.sellTime);
    }
    if (livestock.livestockID == 0x0) {
      return (false, "The livestockID does not exist", producerName, produceTime, retailerNames, retailerTimes, customerName, livestock.sellTime);
    }
    return (true, "Success", livestock.producerName, livestock.produceTime, livestock.retailerNames, livestock.timestamps, livestock.customerName, livestock.sellTime);
  }

  function getLivestock (bytes32 livestockID, Actor actor) public returns (
    bool, string memory, bytes32 producerName, uint produceTime, bytes32[] memory retailerNames,
    uint[] memory retailerTimes, bytes32 customerName, uint sellTime
  ){
    Livestock storage livestock = livestockMap[livestockID];
    if (livestock.livestockID == 0x0) {
      return (false, "The livestockID does not exist", producerName, produceTime, retailerNames, retailerTimes, customerName, sellTime);
    }
    User memory user;
    if (actor == Actor.Producer) {
      user = producerMap[msg.sender];
    } else if (actor == Actor.Retailer) {
      user = retailerMap[msg.sender];
    } else if (actor == Actor.Customer) {
      user = customerMap[msg.sender];
    } else {
      return (false, "the actor does not belong", producerName, produceTime, retailerNames, retailerTimes, customerName, sellTime);
    }
    if (livestock.isBinding) {
      if (livestock.owner != msg.sender) {
        return (false, "warning, this livestock has been bound", producerName, produceTime, retailerNames, retailerTimes, customerName, sellTime);
      } else {
        return (false, "has already bind", livestock.producerName, livestock.produceTime, livestock.retailerNames, livestock.retailerTimes, livestock.customerName, livestock.sellTime);
      }
    }
    if (livestock.sellTime > 0) {
      livestock.isBinding = true;
      livestock.owner = msg.sender;
      livestock.customerName = user.name;
    }
    return (true, "Sucess", livestock.producerName, livestock.produceTime, livestock.retailerNames, livestock.retailerTimes, livestock.customerName, livestock.sellTime);
  }

}