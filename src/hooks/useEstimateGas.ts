import { Interface } from "@ethersproject/abi";
import { Contract } from "@ethersproject/contracts";
import { BigNumber } from "@ethersproject/bignumber";
import { useEthers, ERC20Interface } from "@usedapp/core";
import abi from "../global/abi.json";
import { rinkebyContract } from "../global/constants.ts";

export default function useEstimateGas() {
  const contractAbi = new Interface(abi);
  const { library } = useEthers();

  const mintGas = async () => {
    const contract = new Contract(
      rinkebyContract,
      contractAbi,
      library?.getSigner()
    );
    const estimatedGas = await contract.estimateGas.mint();

    return estimatedGas;
  };

  const approveGas = async (
    contractAddress: string,
    spender: string,
    amount: BigNumber
  ) => {
    const contract = new Contract(
      contractAddress,
      ERC20Interface,
      library?.getSigner()
    );
    const estimatedGas = await contract.estimateGas.approve(spender, amount);

    return estimatedGas;
  };

  return { mintGas, approveGas };
}
