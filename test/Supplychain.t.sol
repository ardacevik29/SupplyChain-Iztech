// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../lib/forge-std/src/Test.sol";
import {SupplyChain} from "../src/SupplyChain.sol";

contract SupplyChainTest is Test {
    SupplyChain public supplyChain;

    // Setup fonksiyonu, SupplyChain instance oluşturur
    function setUp() public {
        supplyChain = new SupplyChain();
    }

    function testCreateProduct() public {
        // Ürün oluşturma
        supplyChain.createProduct(1, "Location A", 1000000, 2000000);

        // Ürün bilgilerini getProduct fonksiyonuna bakarak kontrol etme
        (uint32 id, string memory locationInfo, uint32 productionDate, uint32 expirationDate, SupplyChain.State state) = supplyChain.getProduct(1);

        // Test sonuçlarını doğrulama
        assertEq(id, 1);
        assertEq(locationInfo, "Location A");
        assertEq(productionDate, 1000000);
        assertEq(expirationDate, 2000000);
        assertEq(uint(state), 0); // State.Produced => enum index 0
    }

    function testFailCreateProductWithDuplicateId() public {
        // İlk ürün oluşturma
        supplyChain.createProduct(2, "Location B", 1000000, 2000000);

        // Aynı ID ile tekrar ürün oluşturmaya çalışmak hata verecek
        vm.expectRevert(abi.encodeWithSelector(SupplyChain.ProductAlreadyExists.selector, 2));
        supplyChain.createProduct(2, "Location B Duplicate", 1000000, 2000000);
    }

    function testUpdateProduct() public {
        // Ürün oluşturma
        supplyChain.createProduct(3, "Location C", 1000000, 2000000);

        // Ürünü güncelleme
        supplyChain.updateProduct(3, "Updated Location", 3000000, 4000000, SupplyChain.State.InWarehouse);

        // Ürün bilgilerini getProduct fonksiyonuna bakarak kontrol etme
        (uint32 id, string memory locationInfo, uint32 productionDate, uint32 expirationDate, SupplyChain.State state) = supplyChain.getProduct(3);

        // Test sonuçlarını doğrulama
        assertEq(id, 3);
        assertEq(locationInfo, "Updated Location");
        assertEq(productionDate, 3000000);
        assertEq(expirationDate, 4000000);
        assertEq(uint(state), 1); // State.InWarehouse => enum index 1
    }

    function testFailUpdateNonexistentProduct() public {
        // Olmayan ürün için güncelleme deneniyor, hata bekliyoruz
        vm.expectRevert(abi.encodeWithSelector(SupplyChain.ProductNotFound.selector, 999));
        supplyChain.updateProduct(999, "Nonexistent Location", 1000000, 2000000, SupplyChain.State.Produced);
    }

    function testInWarehouse() public {
        // Ürün oluşturma
        supplyChain.createProduct(4, "Location D", 1000000, 2000000);

        // Ürünü depoya alma
        supplyChain.inWarehouse(4, "Warehouse Location");

        // Ürün durumunu kontrol etme
        ( , , , , SupplyChain.State state) = supplyChain.getProduct(4);
        assertEq(uint(state), 1); // State.InWarehouse => enum index 1
    }

    function testDelivered() public {
        // Ürün oluşturma
        supplyChain.createProduct(5, "Location E", 1000000, 2000000);

        // Ürünü teslim olarak işaretleme
        supplyChain.delivered(5);

        // Ürün durumunu kontrol etme
        ( , , , , SupplyChain.State state) = supplyChain.getProduct(5);
        assertEq(uint(state), 2); // State.Delivered => enum index 2
    }

    function testDeleteProduct() public {
        // Ürün oluşturma adımı
        supplyChain.createProduct(6, "Location F", 1000000, 2000000);

        // Ürünü silme adımı
        supplyChain.deleteProduct(6);

        // Silindikten sonra, getProduct çağrıldığında bir revert (hata) bekliyoruz
        vm.expectRevert(abi.encodeWithSelector(SupplyChain.ProductNotFound.selector, 6));
        supplyChain.getProduct(6);
    }

    function testFailDeleteNonexistentProduct() public {
        // Olmayan ürünü silmeye çalışmak hata verecektir
        vm.expectRevert(abi.encodeWithSelector(SupplyChain.ProductNotFound.selector, 999));
        supplyChain.deleteProduct(999);
    }

    function testFailInWarehouseNonexistentProduct() public {
        // Olmayan ürünü depoya almaya çalışmak hata verecektir
        vm.expectRevert(abi.encodeWithSelector(SupplyChain.ProductNotFound.selector, 999));
        supplyChain.inWarehouse(999, "Warehouse Location");
    }

    function testFailDeliveredNonexistentProduct() public {
        // Olmayan ürünü teslim etmeye çalışmak hata verecektir
        vm.expectRevert(abi.encodeWithSelector(SupplyChain.ProductNotFound.selector, 999));
        supplyChain.delivered(999);
    }
}