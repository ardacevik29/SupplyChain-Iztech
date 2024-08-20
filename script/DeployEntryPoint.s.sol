// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol"; 
import {EntryPoint} from "../src/EntryPoint.sol";

contract DeploySupplyChain is Script {
    function run() external {
        vm.startBroadcast();
        new EntryPoint();
        vm.stopBroadcast();
    }
}