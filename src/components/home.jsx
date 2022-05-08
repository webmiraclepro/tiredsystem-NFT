import { useState, useEffect } from "react";
import {
  shortenAddress,
  useEthers,
  useTokenAllowance,
  useTokenBalance,
} from "@usedapp/core";
import WalletConnectionModal from "./walletmodal.tsx";
import { toast } from "react-toastify";
import useEstimateGas from "../hooks/useEstimateGas.ts";
import { useMint, useApprove, useTotalSupply } from "../hooks/useTired.ts";
import { rinkebyContract, WETHContract } from "../global/constants.ts";
import { parseEther } from "@ethersproject/units";

export const Home = (props) => {
  const [wallet, setWallet] = useState(false);
  const { mintGas, approveGas } = useEstimateGas();
  const totalSupply = useTotalSupply();
  const { mintState, mint } = useMint();
  const { approveState, approve } = useApprove(WETHContract);
  const { account } = useEthers();
  const tokenAllowance = useTokenAllowance(
    WETHContract,
    account,
    rinkebyContract
  );
  const tokenBalance = useTokenBalance(WETHContract, account);

  const toastMsg = (state) => {
    if (state.status === "PendingSignature")
      toast.info("Waiting for signature", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });

    if (state.status === "Exception")
      toast.warning("User denied signature", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });

    if (state.status === "Mining")
      toast.info("Pending transaction", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });

    if (state.status === "Success")
      toast.success("Successfully confirmed", {
        position: toast.POSITION.BOTTOM_RIGHT,
        hideProgressBar: true,
      });
  };

  useEffect(() => {
    toastMsg(mintState);
  }, [mintState]);

  useEffect(() => {
    toastMsg(approveState);
  }, [approveState]);

  const approveWETH = async () => {
    try {
      const estimatedGas = await approveGas(
        WETHContract,
        rinkebyContract,
        parseEther(String(0.07))
      );

      await approve(rinkebyContract, parseEther(String(0.07)), {
        gasLimit: estimatedGas,
      });
    } catch (error) {
      if (!error.error)
        toast.error(error, {
          position: toast.POSITION.BOTTOM_RIGHT,
          hideProgressBar: true,
        });
      else
        toast.error(
          error.error.message.split("execution reverted: ").join(""),
          {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
          }
        );
      console.log(error);
    }
  };

  const mintTired = async () => {
    if (tokenBalance <= 7e16) return;
    if (tokenAllowance >= 7e16)
      try {
        const estimatedGas = await mintGas();
        mint({
          gasLimit: estimatedGas,
        });
      } catch (error) {
        if (!error.error)
          toast.error(error, {
            position: toast.POSITION.BOTTOM_RIGHT,
            hideProgressBar: true,
          });
        else
          toast.error(
            error.error.message.split("execution reverted: ").join(""),
            {
              position: toast.POSITION.BOTTOM_RIGHT,
              hideProgressBar: true,
            }
          );
      }
    else approveWETH();
  };
  return (
    <header id="header">
      <WalletConnectionModal open={wallet} onClose={() => setWallet(false)} />
      <div className="intro">
        {/* <div className="grey top-grey"></div> */}
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-5 intro-text center">
                <img src="./img/1.gif" className="img-border" alt="tent" />
              </div>
              <div className="col-md-7 intro-text center">
                <div className="main-content">
                  <div className="line">
                    <span></span>
                  </div>
                  <div>
                    <p>
                      {props.data ? props.data.paragraph1.line1 : "Loading"}
                    </p>
                    <p>
                      {props.data ? props.data.paragraph1.line2 : "Loading"}
                    </p>
                    <p>
                      {props.data ? props.data.paragraph1.line3 : "Loading"}
                    </p>
                    <p>
                      {props.data ? props.data.paragraph1.line4 : "Loading"}
                    </p>
                  </div>
                  <div className="line">
                    <span></span>
                  </div>
                  <div className="mint">
                    <p>{Number(totalSupply) || 0}/100</p>
                    <button onClick={() => setWallet(true)}>
                      {account ? shortenAddress(account) : "Connect"}
                    </button>
                    {account && (
                      <button onClick={() => mintTired()}>
                        {tokenBalance >= 7e16
                          ? tokenAllowance >= 7e16
                            ? "Mint Now"
                            : "Approve WETH for Mint"
                          : "Not enough balance"}
                      </button>
                    )}
                    {/* <button onClick={() => approveWETH()}>{"Approve"}</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="grey bottom-grey"></div> */}
      </div>
    </header>
  );
};
