library vault;

use std::{contract_id::ContractId, identity::Identity};

abi TVault {
    #[storage(read, write)]
    fn deposit() -> Deposit;

    #[storage(read, write)]
    fn withdraw(amount: u64) -> Deposit;
}

// Deposit struct
pub struct Deposit {
    id: u64,
    amount: u64,
    owner: Identity,
    isValid: bool,
}
