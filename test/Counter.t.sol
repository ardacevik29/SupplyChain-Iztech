// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/SupplyChain.s.sol";

contract SupplyChainTest is Test {
    SupplyChain public supplyChain;

    function setUp() public {
        supplyChain = new SupplyChain();
    }

    function testCreateProduct() public {
        string memory locationInfo = "Factory A";
        uint productionDate = block.timestamp;
        uint expirationDate = block.timestamp + 365 days;

        supplyChain.createProduct(locationInfo, productionDate, expirationDate);

        (uint id, string memory loc, uint prodDate, uint backupProdDate, uint expDate, SupplyChain.State state) = supplyChain.viewProductInfo(0);

        assertEq(id, 0);
        assertEq(loc, locationInfo);
        assertEq(prodDate, productionDate);
        assertEq(backupProdDate, block.timestamp);
        assertEq(expDate, expirationDate);
        assertEq(uint(state), uint(SupplyChain.State.Produced));
    }

    function testUpdateProduct() public {
        string memory locationInfo = "Factory A";
        uint productionDate = block.timestamp;
        uint expirationDate = block.timestamp + 365 days;

        supplyChain.createProduct(locationInfo, productionDate, expirationDate);

        string memory newLocationInfo = "Warehouse B";
        uint newProductionDate = block.timestamp + 1 days;
        uint newExpirationDate = block.timestamp + 366 days;

        supplyChain.updateProduct(0, newLocationInfo, newProductionDate, newExpirationDate, SupplyChain.State.InWarehouse);

        (uint id, string memory loc, uint prodDate, uint backupProdDate, uint expDate, SupplyChain.State state) = supplyChain.viewProductInfo(0);

        assertEq(loc, newLocationInfo);
        assertEq(prodDate, newProductionDate);
        assertEq(backupProdDate, block.timestamp);
        assertEq(expDate, newExpirationDate);
        assertEq(uint(state), uint(SupplyChain.State.InWarehouse));
    }

    function testChangeStateToInWarehouse() public {
        string memory locationInfo = "Factory A";
        uint productionDate = block.timestamp;
        uint expirationDate = block.timestamp + 365 days;

        supplyChain.createProduct(locationInfo, productionDate, expirationDate);

        string memory newLocation = "Warehouse B";
        supplyChain.inWarehouse(0, newLocation);

        ( ,, uint, uint, uint, SupplyChain.State state) = supplyChain.viewProductInfo(0);

        assertEq(uint(state), uint(SupplyChain.State.InWarehouse));
    }

    function testChangeStateToDelivered() public {
        string memory locationInfo = "Factory A";
        uint productionDate = block.timestamp;
        uint expirationDate = block.timestamp + 365 days;

        supplyChain.createProduct(locationInfo, productionDate, expirationDate);

        supplyChain.delivered(0);

        (,, uint, uint, uint, SupplyChain.State, state,) = supplyChain.viewProductInfo(0);

        assertEq(uint(state), uint(SupplyChain.State.Delivered));
    }
}

