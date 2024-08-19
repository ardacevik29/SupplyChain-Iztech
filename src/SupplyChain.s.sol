// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    enum State {
        Produced,
        InWarehouse,
        Delivered
    }

    struct Product {
        uint id;
        string locationInfo;
        uint productionDate;
        uint backupProductionDate;
        uint expirationDate;
        State state;
    }

    mapping(uint => Product) public products;
    uint private nextProductId;

    // Event tanımlamaları
    event ProductCreated(uint indexed productId, string locationInfo, uint productionDate, uint backupProductionDate, uint expirationDate);
    event ProductUpdated(uint indexed productId, string locationInfo, uint productionDate, uint backupProductionDate, uint expirationDate, State state);
    event ProductStateChanged(uint indexed productId, State newState, string newLocation);
    event ProductDeleted(uint indexed productId);

    // Ürün oluşturma fonksiyonu
    function createProduct(string memory _locationInfo, uint _productionDate, uint _expirationDate) external {
        uint backupProductionDate = block.timestamp;
        products[nextProductId] = Product(nextProductId, _locationInfo, _productionDate, backupProductionDate, _expirationDate, State.Produced);
        emit ProductCreated(nextProductId, _locationInfo, _productionDate, backupProductionDate, _expirationDate);
        nextProductId++;
    }

    // Belirli bir ürünü güncelleme fonksiyonu
    function updateProduct(uint _productId, string memory _newLocationInfo, uint _newProductionDate, uint _newExpirationDate, State _newState) external {
        Product storage product = products[_productId];
        product.locationInfo = _newLocationInfo;
        product.productionDate = _newProductionDate;
        product.backupProductionDate = block.timestamp; // Güncel timestamp ile güncelle
        product.expirationDate = _newExpirationDate;
        product.state = _newState;
        emit ProductUpdated(_productId, _newLocationInfo, _newProductionDate, product.backupProductionDate, _newExpirationDate, _newState);
    }

    // Ürün depoya geldiği zaman çağrılacak fonksiyon
    function inWarehouse(uint _productId, string memory _newLocation) external {
        Product storage product = products[_productId];
        product.state = State.InWarehouse;
        product.locationInfo = _newLocation; // Konum bilgisini güncelle
        emit ProductStateChanged(_productId, State.InWarehouse, _newLocation);
    }

    // Ürün teslim edildiği zaman çağrılacak fonksiyon
    function delivered(uint _productId) external {
        Product storage product = products[_productId];
        product.state = State.Delivered;
        emit ProductStateChanged(_productId, State.Delivered, product.locationInfo);
    }

    // Kullanıcı ürün bilgilerini sorgulama fonksiyonu
    // Bu fonksiyon sadece veri okuduğu için bir event emit etmez.
    function viewProductInfo(uint _productId) external view returns (uint, string memory, uint, uint, uint, State) {
        Product storage product = products[_productId];
        return (product.id, product.locationInfo, product.productionDate, product.backupProductionDate, product.expirationDate, product.state);
    }

    // Ürün bilgilerini silme fonksiyonu
    function deleteProduct(uint _productId) external {
        delete products[_productId];
        emit ProductDeleted(_productId);
    }
}
