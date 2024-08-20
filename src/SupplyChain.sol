// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    // State enumunu uint8 olarak tanımlayarak gas tasarrufu sağlıyoruz
    enum State {
        Produced,
        InWarehouse,
        Delivered
    }

    struct Product {
        uint32 id;
        uint32 productionDate;
        uint32 expirationDate;
        string locationInfo;
        State state;
    }

    mapping(uint32 => Product) private s_products;

    // Custom error definitions
    error ProductAlreadyExists(uint32 productId);
    error ProductNotFound(uint32 productId);

    // Event definitions
    event ProductCreated(
        uint32 indexed productId,
        string locationInfo,
        uint32 productionDate,
        uint32 expirationDate
    );
    event ProductUpdated(
        uint32 indexed productId,
        string locationInfo,
        uint32 productionDate,
        uint32 expirationDate,
        State state
    );
    event ProductStateChanged(
        uint32 indexed productId,
        State newState,
        string newLocation
    );
    event ProductDeleted(uint32 indexed productId);

    // Ürün oluşturma fonksiyonu: Tüm zaman değerlerini kullanıcıdan alıyoruz
    function createProduct(
        uint32 _productId,
        string calldata _locationInfo,
        uint32 _productionDate,
        uint32 _expirationDate
    ) external {
        // Ürün zaten var mı kontrol ediyoruz
        if (s_products[_productId].id != 0) {
            revert ProductAlreadyExists(_productId);
        }

        s_products[_productId] = Product(
            _productId,
            _productionDate,
            _expirationDate,
            _locationInfo,
            State.Produced
        );
        emit ProductCreated(
            _productId,
            _locationInfo,
            _productionDate,
            _expirationDate
        );
    }

    // Ürün bilgilerine erişim sağlamak için public bir view fonksiyonu
    function getProduct(
        uint32 _productId
    ) external view returns (uint32, string memory, uint32, uint32, State) {
        Product storage s_product = s_products[_productId];
        if (s_product.id == 0) {
            revert ProductNotFound(_productId);
        }

        return (
            s_product.id,
            s_product.locationInfo,
            s_product.productionDate,
            s_product.expirationDate,
            s_product.state
        );
    }

    // Belirli bir ürünü güncelleme fonksiyonu
    function updateProduct(
        uint32 _productId,
        string calldata _newLocationInfo,
        uint32 _newProductionDate,
        uint32 _newExpirationDate,
        State _newState
    ) external {
        Product storage s_product = s_products[_productId];
        if (s_product.id == 0) {
            revert ProductNotFound(_productId);
        }

        s_product.locationInfo = _newLocationInfo;
        s_product.productionDate = _newProductionDate;
        s_product.expirationDate = _newExpirationDate;
        s_product.state = _newState;

        emit ProductUpdated(
            _productId,
            _newLocationInfo,
            _newProductionDate,
            _newExpirationDate,
            _newState
        );
    }

    // Ürün depoya geldiği zaman çağrılacak fonksiyon
    function inWarehouse(
        uint32 _productId,
        string calldata _newLocation
    ) external {
        Product storage s_product = s_products[_productId];
        if (s_product.id == 0) {
            revert ProductNotFound(_productId);
        }

        s_product.state = State.InWarehouse;
        s_product.locationInfo = _newLocation;

        emit ProductStateChanged(_productId, State.InWarehouse, _newLocation);
    }

    // Ürün teslim edildiği zaman çağrılacak fonksiyon
    function delivered(uint32 _productId) external {
        Product storage s_product = s_products[_productId];
        if (s_product.id == 0) {
            revert ProductNotFound(_productId);
        }

        s_product.state = State.Delivered;

        emit ProductStateChanged(
            _productId,
            State.Delivered,
            s_product.locationInfo
        );
    }

    // Ürün bilgilerini silme fonksiyonu
    function deleteProduct(uint32 _productId) external {
        if (s_products[_productId].id == 0) {
            revert ProductNotFound(_productId);
        }

        delete s_products[_productId];
        emit ProductDeleted(_productId);
    }
}