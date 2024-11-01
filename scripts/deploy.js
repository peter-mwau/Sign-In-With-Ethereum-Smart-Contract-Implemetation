// import { ethers } from "hardhat";
import pkg from "hardhat";
const { ethers } = pkg;

async function main() {

    const SignatureVerification = await ethers.getContractFactory("SignatureVerification");
    const signatureVerification = await SignatureVerification.deploy();

    // await signatureVerification.deployed();

    console.log(`Lock with 1 ETH and unlock timestamp deployed to ${signatureVerification.target}`);
}


//0x143f5D096f14f6EC80a59928677F9e828F550679

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
