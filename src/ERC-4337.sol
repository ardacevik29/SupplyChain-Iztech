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

    // Adapts the function calls to the updated SupplyChain contract
    function createProduct(uint32 _productId, string memory _locationInfo, uint32 _productionDate, uint32 _expirationDate) public onlyOwner {
        bytes memory data = abi.encodeWithSignature(
            "createProduct(uint32,string,uint32,uint32)",
            _productId, _locationInfo, _productionDate, _expirationDate
        );
        execute(supplyChainContract, data);
    }

    function updateProduct(uint32 _productId, string memory _newLocationInfo, uint32 _newProductionDate, uint32 _newExpirationDate, uint8 _newState) public onlyOwner {
        bytes memory data = abi.encodeWithSignature(
            "updateProduct(uint32,string,uint32,uint32,uint8)",
            _productId, _newLocationInfo, _newProductionDate, _newExpirationDate, _newState
        );
        execute(supplyChainContract, data);
    }

    function inWarehouse(uint32 _productId, string memory _newLocation) public onlyOwner {
        bytes memory data = abi.encodeWithSignature(
            "inWarehouse(uint32,string)",
            _productId, _newLocation
        );
        execute(supplyChainContract, data);
    }

    function delivered(uint32 _productId) public onlyOwner {
        bytes memory data = abi.encodeWithSignature("delivered(uint32)", _productId);
        execute(supplyChainContract, data);
    }

    function deleteProduct(uint32 _productId) public onlyOwner {
        bytes memory data = abi.encodeWithSignature("deleteProduct(uint32)", _productId);
        execute(supplyChainContract, data);
    }
}
