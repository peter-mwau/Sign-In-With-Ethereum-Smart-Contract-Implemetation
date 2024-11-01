// Imports
// ========================================================
import { expect } from "chai";
import { ethers } from "hardhat";
import ContractABI from "../artifacts/contracts/SignatureVerification.sol/SignatureVerification.json";

// Config
// ========================================================
const CONTRACT_NAME = "SignatureVerification";

// Tests
// ========================================================
describe("SignatureVerification", () => {
  it("Should get deployed", async () => {
    // Setup
    const wallet = ethers.Wallet.createRandom();
    console.log({ wallet });
    const provider = new ethers.providers.JsonRpcProvider();
    // console.log("Provider: ", provider);
    const signer = provider.getSigner(wallet.address);
    console.log("Signer: ", signer);

    const Contract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await Contract.deploy();
    await contract.deployed();
    console.log("Account Address: ", contract.address);
    console.log("Contract Address: ", wallet.address);
    const contractProvider = new ethers.Contract(contract.address, ContractABI.abi, signer);
    const messageText = "This should be coming from Manny";
    const message = ethers.utils.solidityKeccak256(['string'], [messageText]);
    console.log("Message Hash: ", message);

    const signatureHash = await wallet.signMessage(ethers.utils.arrayify(message));
    console.log("Signature: ", signatureHash);


    // Init
    const result = await contractProvider.verifySignature(message, signatureHash);

    console.log("Verification Result: ", result);


    // Expectations
    expect(result).to.be.true;
  });
});
