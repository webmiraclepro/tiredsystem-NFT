import { Interface } from "@ethersproject/abi";
import { Contract } from "@ethersproject/contracts";
import abi from "../global/abi.json";
import { rinkebyContract } from "../global/constants.ts";
import {
  useContractCall,
  useContractFunction,
  ERC20Interface,
} from "@usedapp/core";

export function useMint() {
  const contractAbi = new Interface(abi);
  const contract: any = new Contract(rinkebyContract, contractAbi);
  const { send, state } = useContractFunction(contract, "mint");
  return {
    mintState: state,
    mint: send,
  };
}

export function useTotalSupply(): any {
  const contractAbi = new Interface(abi);
  const [totalSupply] =
    useContractCall({
      abi: contractAbi,
      address: rinkebyContract,
      method: "totalSupply",
      args: [],
    }) ?? [];
  return totalSupply;
}

export function useApprove(contractAddress: string) {
  const contract: any = new Contract(contractAddress, ERC20Interface);
  const { send, state } = useContractFunction(contract, "approve");
  return {
    approveState: state,
    approve: send,
  };
}
