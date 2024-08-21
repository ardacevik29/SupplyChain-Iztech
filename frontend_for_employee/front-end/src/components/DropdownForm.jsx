import React, { useState } from "react";

const DropdownForm = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <label htmlFor="product-options">Choose a product:</label>
      <select
        id="product-options"
        value={selectedOption}
        onChange={handleSelectChange}
        style={{ marginLeft: "10px" }}
      >
        <option value="">--Select--</option>
        <option value="update">Update Product</option>
        <option value="delete">Delete Product</option>
      </select>

      {selectedOption === "update" && (
        <form style={{ marginTop: "20px" }}>
          <label>
            Product Name:
            <input type="text" name="productName" />
          </label>
          <br />
          <label>
            Product ID:
            <input type="text" name="productId" />
          </label>
          <br />
          <button type="submit">Update Product</button>
        </form>
      )}

      {selectedOption === "delete" && (
        <form style={{ marginTop: "20px" }}>
          <label>
            Product ID:
            <input type="text" name="productId" />
          </label>
          <br />
          <button type="submit">Delete Product</button>
        </form>
      )}
    </div>
  );
};

export default DropdownForm;
