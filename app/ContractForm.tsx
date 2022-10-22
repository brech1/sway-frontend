import {
  FC,
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { CONTRACT_ADDRESS, PROVIDER } from "./config";
import { ContractAbi__factory } from "./contract-types";
import { FunctionInvocationResult, Wallet } from "fuels";
import { DepositOutput } from "./contract-types/ContractAbi";

const wallet = new Wallet(
  process.env.NEXT_PUBLIC_WALLET_PRIVATE_KEY!,
  PROVIDER
);
const contract = ContractAbi__factory.connect(CONTRACT_ADDRESS, wallet);

const ContractForm: FC<{}> = () => {
  const [depositAmount, setDepositAmount] = useState<string | undefined>(
    undefined
  );
  const [depositId, setDepositId] = useState<string | undefined>(undefined);
  const [txResult, setTxResult] = useState<
    FunctionInvocationResult<DepositOutput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        if (error) {
          setError(undefined);
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleDepositIdChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;

    setDepositId(target.value || undefined);
  };

  const handleDepositAmountChange: FormEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;

    setDepositAmount(target.value || undefined);
  };

  const handleDeposit: MouseEventHandler<HTMLButtonElement> = async () => {
    if (!depositAmount) {
      setError("No deposit amount");
      return;
    }

    setError(undefined);
    setIsLoading(true);
    setTxResult(undefined);

    try {
      const transaction = await contract.functions
        .deposit()
        .callParams({
          forward: [parseInt(depositAmount)],
        })
        .txParams({ gasPrice: 10, variableOutputs: 1 })
        .call();

      setTxResult(transaction);
    } catch (error) {
      console.log(error);
      setError(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw: MouseEventHandler<HTMLButtonElement> = async () => {
    if (!depositId) {
      setError("No deposit ID");
      return;
    }

    setError(undefined);
    setIsLoading(true);
    setTxResult(undefined);

    try {
      const transaction = await contract.functions
        .withdraw(depositId)
        .callParams({})
        .txParams({ gasPrice: 10, variableOutputs: 1 })
        .call();

      setTxResult(transaction);
    } catch (error) {
      console.log(error);
      setError(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container rounded-xl bg-emerald-900/20 p-3 text-white text-sm">
      <div className="flex flex-col space-y-2 mx-auto w-full md:w-9/12 lg:w-1/2">
        <p className="text-base font-medium pt-2">Deposit Amount</p>
        <div className="mt-1">
          <input
            id="depositId"
            name="depositId"
            type="text"
            className="bg-emerald-900/20 focus:ring-emerald-500 focus:border-emerald-500 block border border-emerald-300 rounded-md w-full"
            placeholder="Insert the amount to deposit"
            value={depositAmount}
            onInput={handleDepositAmountChange}
          />
        </div>
        <div className="flex w-full pt-4">
          <button
            onMouseDown={handleDeposit}
            className="inline-flex w-20 justify-center mx-auto py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Deposit
          </button>
        </div>
        <p className="text-base font-medium pt-2">Deposit Id</p>
        <div className="mt-1">
          <input
            id="depositId"
            name="depositId"
            type="text"
            className="bg-emerald-900/20 focus:ring-emerald-500 focus:border-emerald-500 block border border-emerald-300 rounded-md w-full"
            placeholder="Insert the deposit to withdraw"
            value={depositId}
            onInput={handleDepositIdChange}
          />
        </div>
        <div className="flex w-full pt-4">
          <button
            onMouseDown={handleWithdraw}
            className="inline-flex w-20 justify-center mx-auto py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Withdraw
          </button>
        </div>
        {/* Loading Section */}
        {isLoading && (
          <div className="p-5">
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 border-b-2 border-white rounded-full animate-spin" />
            </div>
          </div>
        )}
        {/* Valid Signature */}
        {txResult && (
          <>
            <a
              href={`https://fuellabs.github.io/block-explorer-v2/transaction/${txResult.transactionId}`}
              target="_blank"
            >
              <button className="font-bold font-sm inline-flex w-42 justify-center mx-auto py-2 px-6 border border-transparent shadow-sm font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                See on Fuel Explorer
              </button>
            </a>
          </>
        )}
        {txResult && txResult.value && (
          <>
            <p className="text-base font-medium pt-2">Success!</p>
            <p className="text-base font-medium pt-2">
              Deposit Id: {txResult.value.id.toString()}
            </p>
            <p className="text-base font-medium pt-2">
              Deposit Amount: {txResult.value.amount.toString()}
            </p>
            <p className="text-base font-medium pt-2">
              Deposit Owner: {txResult.value.owner.Address?.value}
            </p>
          </>
        )}
        {/* Error */}
        {error && (
          <div className="py-3 w-full">
            <div
              className="break-all bg-rose-100 text-rose-600 font-medium rounded-md py-2 px-3"
              role="alert"
            >
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractForm;
