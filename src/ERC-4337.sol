// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccountAbstraction {
    address public owner;
    address public supplyChainContract;

    constructor(address _supplyChainContract) {
        owner = msg.sender;
        supplyChainContract = _supplyChainContract;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function execute(address target, bytes memory data) public onlyOwner {
        (bool success, ) = target.call(data);
        require(success, "Execution failed");
    }

    // Akıllı sözleşme fonksiyonlarını çağırabilmek için işlemi imzalar
    function createProduct(string memory _locationInfo, uint _productionDate, uint _expirationDate) public onlyOwner {
        bytes memory data = abi.encodeWithSignature("createProduct(string,uint,uint)", _locationInfo, _productionDate, _expirationDate);
        execute(supplyChainContract, data);
    }

    function updateProduct(uint _productId, string memory _newLocationInfo, uint _newProductionDate, uint _newExpirationDate, uint8 _newState) public onlyOwner {
        bytes memory data = abi.encodeWithSignature("updateProduct(uint,string,uint,uint,uint8)", _productId, _newLocationInfo, _newProductionDate, _newExpirationDate, _newState);
        execute(supplyChainContract, data);
    }

    function inWarehouse(uint _productId, string memory _newLocation) public onlyOwner {
        bytes memory data = abi.encodeWithSignature("inWarehouse(uint,string)", _productId, _newLocation);
        execute(supplyChainContract, data);
    }

    function delivered(uint _productId) public onlyOwner {
        bytes memory data = abi.encodeWithSignature("delivered(uint)", _productId);
        execute(supplyChainContract, data);
    }

    function deleteProduct(uint _productId) public onlyOwner {
        bytes memory data = abi.encodeWithSignature("deleteProduct(uint)", _productId);
        execute(supplyChainContract, data);
    }
}
