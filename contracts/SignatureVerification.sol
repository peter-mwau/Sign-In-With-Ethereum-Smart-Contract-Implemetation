    // SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SignatureVerification {
  using ECDSA for bytes32;
  using Strings for uint256;

  constructor() {
    // Nothing
  }

  function createMessageHash(
    address userAddress,
    string memory domain,
    string memory statement,
    string memory uri,
    uint256 chainId,
    uint256 nonce
  ) public pure returns (bytes32) {
    return keccak256(
      abi.encodePacked(
        "\x19Ethereum Signed Message:\n",
        "Domain: ", domain, "\n",
        "Address: ", Strings.toHexString(uint256(uint160(userAddress)), 20), "\n",
        "Statement: ", statement, "\n",
        "URI: ", uri, "\n",
        "Version: 1\n",
        "Chain ID: ", chainId.toString(), "\n",
        "Nonce: ", nonce.toString()
      )
    );
  }

  function verifySignature(bytes32 hash, bytes memory signature) external view returns (bool) {
    // bytes32 signedHash = ECDSA.toEthSignedMessageHash(hash);
    bytes32 signedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
        );
    address recovered = ECDSA.recover(signedHash, signature);

    // Debug
    // console.log(msg.sender);
    // console.log(recovered);
    
    return recovered == msg.sender;
  }
}
