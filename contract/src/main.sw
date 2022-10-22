contract;

dep vault;
use vault::*;

use std::{
    identity::Identity,
    constants::BASE_ASSET_ID,
    contract_id::ContractId,
    storage::StorageMap,
    chain::auth::{AuthError, msg_sender},
    context::{call_frames::msg_asset_id, msg_amount, this_balance},
    result::Result,
    token::transfer,
};

storage {
    deposits: StorageMap<u64, Deposit> = StorageMap {},
    deposit_count: u64 = 0,
}

pub enum Error {
    NotOwner: (),
    NotExistent: (),
    DepositWithdrawn: (),
    NotBaseAsset:(),
    EmptyDeposit:()
}

impl TVault for Contract{
    #[storage(read, write)]
    fn deposit() -> Deposit {
        let asset_id = msg_asset_id();

        // Force base asset deposit
        require(asset_id == BASE_ASSET_ID, Error::NotBaseAsset);

        let amount = msg_amount();

        // Don't allow empty deposits
        require(amount > 0, Error::NotBaseAsset);

        let deposit_id = storage.deposit_count;

        let newDeposit = Deposit {
            id: deposit_id,
            amount: amount,
            owner: msg_sender().unwrap(),
            isValid: true,
        };
 
        storage.deposits.insert(deposit_id, newDeposit);
        storage.deposit_count += 1;

        return newDeposit;
    }

    #[storage(read, write)]
    fn withdraw(depositId: u64) -> Deposit {
        let sender = msg_sender().unwrap();
        let asset_id = msg_asset_id();
        let amount = msg_amount();

        // Validate deposit id
        require(depositId < storage.deposit_count, Error::NotExistent);

        // Get deposit
        let mut deposit = storage.deposits.get(depositId);

        // Check owner
        require(deposit.owner == sender, Error::NotOwner);

        // Check if the deposit is still valid
        require(deposit.isValid == true, Error::DepositWithdrawn);

        // Invalidate deposit
        deposit.isValid = false;
        storage.deposits.insert(depositId, deposit);
    
        // Transfer funds
        transfer(deposit.amount, asset_id, sender);

        return deposit;
    }
}
