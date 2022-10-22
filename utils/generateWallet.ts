import { Wallet } from "fuels";

const wallet = Wallet.generate();

console.log("Copy the next lines into your .env file");
console.log("--------------------------------\n");
console.log(`NEXT_PUBLIC_WALLET_ADDRESS=${wallet.address.toString()}`);
console.log(`NEXT_PUBLIC_WALLET_PRIVATE_KEY=${wallet.privateKey}`);
console.log("\n--------------------------------");
