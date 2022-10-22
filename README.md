# Sway Frontend Template

Take a look at the template working [here](https://sway-ui.vercel.app/).

This project aims to:

- Make it easier for people to try sway contracts.
- Give examples to build on fuel.

It features:

- Wallet generation script
- Contract build and deploy scripts
- Contract types generation scripts

The main structure is that of a regular `next.js` project. But there are two main folders where most of the work will be done:

- `app` : Here resides the configuration for our frontend app and the main components of our site.
- `contract` : This folder will contain our sway contract.

The contract being used as example is a simplified version of a vault contract. The user can make deposits and then claim them if it's the owner of that deposit.

The frontend stack is:

- Typescript
- Next.js
- Tailwind

## Getting Started

### 1. Make sure to have `rust` and `cargo` installed. Also `fuelup`:
 
```bash
$curl --proto '=https' --tlsv1.2 -sSf \
https://fuellabs.github.io/fuelup/fuelup-init.sh | sh
```

### 2. Create the contract

You can skip this step if you want to use the example contract or if already have your contract built, just copy your folder and change the name to `contract` and be aware that you should also modify the `contract` script on the `package.json` file to the actual name of the binary.

```bash
$forc new contract
```

## Using the template

### 3. Compile your contract

```bash
$yarn build:contract
```
This script will compile your contract and generate the binaries.

### 4. Set up your `.env` file

Before deploying the contract you should set up your wallet address and private key. You can copy the `.env.orig` file and insert your keys there if you already have a wallet, or you can generate one using the next script:

```bash
$yarn gen:wallet
```

Now you just have to `$touch .env` and copy the output of this command there.

*I'm guessing you'll need some funds. You can ask some eth at the [faucet](https://faucet-beta-1.fuel.network/)*

### 5. Deploy your contract

```bash
$yarn deploy:contract
```
Use this script to deploy your contract to the fuel network. Once it's deployed correctly make sure to copy the address in the `./app/config.ts` file.

### 6. Generate types

```bash
$yarn gen:types
```
Once you have the binaries of your contract you can generate the types, these will let you use all the methods from your contract in an easy way from your ui application.

## Frontend App

### 7. Test locally
To test your application you have two paths:

```bash
$yarn dev

or

$yarn build
$yarn start
```

The first option is the most convenient way to work with next.js.

### 8. Deploy your ui

Once you have everything running, you can deploy your application. *Be aware that your keys will be public if you use the template as is!*

```bash
$yarn export
```

This will generate an `out` directory that you can easily upload to any hosting service. I recommend uploading to vercel using the Vercel CLI.