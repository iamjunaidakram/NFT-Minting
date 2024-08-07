import React, { useState, useEffect } from "react";
import Connect from "./assets/img/connect.png";
import Web3 from "web3";
import "./App.css";

function App() {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    externalLink: "",
    traits: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [trait, setTrait] = useState({ key: "", value: "" });
  const [image, setImage] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [amount, setAmount] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);

  // Web3
  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
    } else {
      setErrorMsg("MetaMask is not installed.");
    }
  }, []);

    // Wallet Connection
    const handleConnectWallet = async () => {
      try {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (account.length > 0) {
          const amount = await web3.eth.getBalance(account[0]);
          setAmount(web3.utils.fromWei(amount, "ether"));
        }
        setWalletConnected(true);
      } catch (err) {
        setErrorMsg("MetaMask not connected.");
      }
    };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleTraitChange = (e) => {
    const { name, value } = e.target;
    setTrait({ ...trait, [name]: value });
  };

  const addTrait = () => {
    setFormValues({ ...formValues, traits: [...formValues.traits, trait] });
    setTrait({ key: "", value: "" });
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="header-logo">NFT MINTING</div>
        <div className="header-content">
          <button>
            <svg
              fill="currentColor"
              height="24"
              role="img"
              viewBox="0 -960 960 960"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
              title="Wallet"
            >
              <title>Wallet</title>
              <path d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-480h480q22 0 42 5t38 16v-21q0-33-23.5-56.5T720-720H240q-33 0-56.5 23.5T160-640v21q18-11 38-16t42-5Zm-74 130 445 108q9 2 18 0t17-8l139-116q-11-15-28-24.5t-37-9.5H240q-26 0-45.5 13.5T166-510Z"></path>
            </svg>
            {amount} ETH
          </button>
          <button onClick={handleConnectWallet}>
            <img src={Connect} alt="" />{walletConnected ? "Wallet Connected": "No Wallet Connected"}
          </button>
        </div>
      </div>
      <div className="content">
        <div>
          <h2>Create an NFT</h2>
          <p>
            Once your item is minted you will not be able to change any of its
            information.
          </p>
          {errorMsg && <p>{errorMsg}</p>}
          <form className="nft-form" onSubmit={handleSubmit}>
            <div className="nft-wrap">
              <div className="nft-upload">
                <input className="file-input" type="file" onChange={handleImageChange} />
                <div className="upload-placeholder">
                  {image ? (
                    <img
                      src={image}
                      alt="NFT Preview"
                      className="preview-image"
                    />
                  ) : (
                    <div className="placeholder-text">
                      <svg
                        fill="#ffffff"
                        height="30px"
                        width="30px"
                        version="1.1"
                        id="Capa_1"
                        viewBox="0 0 374.116 374.116"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <path d="M344.058,207.506c-16.568,0-30,13.432-30,30v76.609h-254v-76.609c0-16.568-13.432-30-30-30c-16.568,0-30,13.432-30,30 v106.609c0,16.568,13.432,30,30,30h314c16.568,0,30-13.432,30-30V237.506C374.058,220.938,360.626,207.506,344.058,207.506z"></path>{" "}
                            <path d="M123.57,135.915l33.488-33.488v111.775c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30V102.426l33.488,33.488 c5.857,5.858,13.535,8.787,21.213,8.787c7.678,0,15.355-2.929,21.213-8.787c11.716-11.716,11.716-30.71,0-42.426L208.271,8.788 c-11.715-11.717-30.711-11.717-42.426,0L81.144,93.489c-11.716,11.716-11.716,30.71,0,42.426 C92.859,147.631,111.855,147.631,123.57,135.915z"></path>{" "}
                          </g>{" "}
                        </g>
                      </svg>
                      <p>Drag and drop media</p>
                      <p className="browse-file">Browse files</p>
                      <p>Max size: 50MB</p>
                      <p>JPG, PNG, GIF, SVG, MP4</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="nft-content">
                <div className="input-wrap">
                  <label>Name *</label>
                  <input
                    name="name"
                    placeholder="Name your NFT"
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-wrap">
                  <label>Description</label>
                  <textarea
                    name="description"
                    placeholder="Enter a description"
                    value={formValues.description}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-wrap">
                  <label>External Link</label>
                  <input
                    name="externalLink"
                    placeholder="https://collection.io/item/123"
                    value={formValues.externalLink}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="input-wrap">
                  <label>Traits</label>
                  <p>
                    Traits describe attributes of your item. They appear as
                    filters inside your collection page and are also listed out
                    inside your item page.
                  </p>
                  <button type="button" onClick={() => setShowModal(true)}>
                    <span>+</span>Add Trait
                  </button>
                  {formValues.traits.map((trait, index) => (
                    <div key={index}>{`${trait.key}: ${trait.value}`}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="submit-btn">
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add Trait</h3>
              <button onClick={() => setShowModal(false)}>X</button>
            </div>

            <div className="input-wrap">
              <label>Type</label>
              <input
                name="key"
                placeholder="Trait Key"
                value={trait.key}
                onChange={handleTraitChange}
              />
            </div>
            <div className="input-wrap">
              <label>Name</label>
              <input
                name="value"
                placeholder="Trait Value"
                value={trait.value}
                onChange={handleTraitChange}
              />
            </div>
            <div className="modal-actions">
              <button onClick={addTrait}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
