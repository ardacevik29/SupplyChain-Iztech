// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol"; 
import {SupplyChain} from "../src/SupplyChain.s.sol";

contract DeploySupplyChain is Script {
    function run() external {
        vm.startBroadcast();
        new SupplyChain();
        vm.stopBroadcast();
    }
}