// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

<<<<<<< HEAD:script/DeploySupplyChain.sol
import {Script} from "forge-std/Script.sol"; 
=======
import {Script} from "forge-std/Script.sol";
>>>>>>> 22f43f3 (Navbar-var_DropDown-Formsuz SuplyChain):script/DeploySupplyChain.s.sol
import {SupplyChain} from "../src/SupplyChain.sol";

contract DeploySupplyChain is Script {
    function run() external {
        vm.startBroadcast();
        new SupplyChain();
        vm.stopBroadcast();
    }
}
