import { Link } from "react-router-dom";
import { useDisconnect, useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { ethers } from "ethers";
import ABI from "../artifacts/contracts/SignatureVerification.sol/SignatureVerification.json";
import { useNavigate } from "react-router-dom";
import { useEthersSigner } from "../components/useSignerClient";

const contractAddress = "0x143f5D096f14f6EC80a59928677F9e828F550679";
const contractABI = ABI.abi;

const Navbar = () => {
  const logo = "/signature_wave.svg";
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const signerPromise = useEthersSigner();
  const [verificationResult, setVerificationResult] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const signIn = async () => {
    if (!isConnected) {
      setVerificationResult("Connect your wallet first");
      return;
    }

    try {
      const signer = await signerPromise;
      if (!signer) {
        setVerificationResult("Signer not found");
        return;
      }

      // Fixed values for login
      const domain = "signature-wave.com";
      const statement = "Sign in to Signature Wave";
      const uri = "https://signature-wave.com";
      const nonce = Date.now();
      const chainId = await signer.provider
        .getNetwork()
        .then((network) => network.chainId);
      const userAddress = await signer.getAddress();

      // Connect to the contract
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Create message hash using contract's method
      const messageHash = await contract.createMessageHash(
        userAddress,
        domain,
        statement,
        uri,
        chainId,
        nonce
      );

      // Sign the message hash
      const signature = await signer.signMessage(ethers.getBytes(messageHash));

      // Verify the signature using the contract
      const isVerified = await contract.verifySignature(messageHash, signature);

      if (isVerified) {
        // setVerificationResult("Login successful! Redirecting...");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userAddress", userAddress);

        setTimeout(() => {
          navigate("/home");
        }, 1500);
      } else {
        setVerificationResult("Login failed - signature verification error");
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setVerificationResult("Error during verification");
    }
  };

  const signOut = async () => {
    try {
      disconnect();
      setIsLoggedIn(false);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed w-full h-auto bg-gray-100 shadow-md p-4">
      <div className="flex justify-around items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-lg font-bold text-gray-700">Signature Wave</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-6">
          <Link
            to="/home"
            className="text-lg font-semibold text-gray-600 hover:text-gray-800"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-lg font-semibold text-gray-600 hover:text-gray-800"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-lg font-semibold text-gray-600 hover:text-gray-800"
          >
            Contact
          </Link>
        </div>

        {/* Connect Button and Sign-In */}
        <div className="flex items-center gap-4">
          {isConnected ? (
            <>
              <button
                onClick={disconnect}
                className="bg-red-500 text-white font-semibold rounded-lg px-4 py-2"
              >
                Disconnect
              </button>
              {isLoggedIn ? (
                <button
                  onClick={signOut}
                  className="bg-red-600 text-white font-semibold rounded-lg px-4 py-2"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={signIn}
                  className="bg-cyan-600 text-white font-semibold rounded-lg px-4 py-2"
                >
                  Sign In
                </button>
              )}
            </>
          ) : (
            <ConnectButton />
          )}
        </div>
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <div
          className={`text-end mt-4 text-md font-normal ${
            verificationResult.includes("successful")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {verificationResult}
        </div>
      )}
    </div>
  );
};

export default Navbar;
