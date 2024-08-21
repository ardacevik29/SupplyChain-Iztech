import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [account, setAccount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("Connection to wallet failed", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setAccount(window.ethereum.selectedAddress);
    }
  }, []);

  return (
    <>
      <nav className="navbar">
        {!isOpen && (
          <div className="hamburger" onClick={toggleMenu}>
            ☰
          </div>
        )}
        <div className="title">Supply Chain</div>
        <button className="wallet-info" onClick={connectWallet}>
          {account
            ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </nav>

      <div className={`side-menu ${isOpen ? "open" : ""}`}>
        <div className="close-btn" onClick={toggleMenu}>
          &times;
        </div>
        <button className="menu-item">Update Product</button>
        <button className="menu-item">Delete Product</button>
      </div>

      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;
