import { ContractFactory, Wallet } from "fuels";
import fs from "fs";
import * as dotenv from "dotenv";
import { PROVIDER } from "../app/config";
dotenv.config();

// Update with your contract binary file name
const bytecode = fs.readFileSync("./contract/out/debug/contract.bin");

// Make sure to have your wallet pk declared in your .env file
const wallet = new Wallet(
  process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY!,
  PROVIDER
);

const factory = new ContractFactory(bytecode, [], wallet);

const deploy = async () => {
  try {
    const contract = await factory.deployContract({ gasPrice: 10 });

    console.log("Contract successfully deployed!\n");
    console.log("Paste your contract address in your /app/config.ts file");
    console.log("--------------------------------\n");
    console.log(`CONTRACT_ADDRESS = ${contract.id.toHexString()}`);
    console.log("\n--------------------------------\n");
    console.log(
      `See on fuel scan: https://fuellabs.github.io/block-explorer-v2/${contract.id.toHexString()}`
    );
  } catch (error) {
    console.log("Error deploying the contract");
    console.log(error);
  }
};

deploy();
