//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Toast from "light-toast";
import { useWallet } from "use-wallet";
import { useTranslation } from "react-i18next";
import Button from "../../Button";
import Spacer from "../../Spacer";
import WalletModal from "../../WalletModal";
import TokenSymbol from "../../TokenSymbol";
import Value from "../../Value";
import useEncryptAddress from "../../../hooks/useEncryptAddress";
import useBasisCash from "../../../hooks/useBasisCash";
import useTotalSupply from "../../../hooks/useTokenTotalSupply";
import usePrice from "../../../hooks/coin/usePrice";
import { ethers } from 'ethers'
import { web3ProviderFrom } from '../../../basis-cash/ether-utils';
import config from "../../../config";
const Right: React.FC = ({ isDatumPath }) => {
  const { t } = useTranslation();
  const { account, connect, status } = useWallet();
  const newAccount = useEncryptAddress(account);
  const basisCash = useBasisCash();
  const PUSDToken = basisCash?.externalTokens["PUSD"];
  const PETHToken = basisCash?.externalTokens["PETH"];
  const PUSDTotalSupply = useTotalSupply(PUSDToken);

  const PETHTotalSupply = useTotalSupply(PETHToken);

  const [isOpen, setOpen] = useState(false);
  const { NESTToUSDTPrice, NESTToETHPrice, ETHAvgPrice } = usePrice();
  useEffect(() => {
    if (status === "disconnected") {
      connect("injected");
    }
    // else if (status === "error") {
    //   Toast.info(t("zwwlcw"));
    // }
  }, [status]);

  return (
    <StyledNavRight style={{ display: isDatumPath ? "none" : "block" }}>
      <StyledWallet className="flex-row-center-center bd-bottom wing-blank-lg ">
        <Button
          text={!account ? t("ljqb") : newAccount}
          variant="secondary"
          onClick={() => {
            setOpen(true);
          }}
        />
      </StyledWallet>
      <div className="wing-blank-lg">
        <div className="bd-bottom">
          <StyledLabel>{t("jiage")}</StyledLabel>
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="ETH" size={25} />
              <TokenSymbol symbol="USDT" size={25} isRight={true} />
            </div>
            <div className="margin-left-10">
              <div>
                <Value value={ETHAvgPrice} decimals={8} />
              </div>
              <div>ETH/USDT</div>
            </div>
          </div>
          <Spacer size="md" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="NEST" size={25} />
              <TokenSymbol symbol="USDT" size={25} isRight={true} />
            </div>
            <div className="margin-left-10">
              <div>
                <Value value={NESTToUSDTPrice} decimals={8} />
              </div>
              <div>NEST/USDT</div>
            </div>
          </div>
          <Spacer size="md" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="NEST" size={25} />
              <TokenSymbol symbol="ETH" size={25} isRight={true} />
            </div>
            <div className="margin-left-10">
              <div>
                <Value value={NESTToETHPrice} decimals={8} />
              </div>
              <div>NEST/ETH</div>
            </div>
          </div>
          <Spacer size="md" />
        </div>
        <div className="">
          <StyledLabel>{t("ltl")}</StyledLabel>
          <a href={`https://etherscan.io/token/${PUSDToken?.address}`}>
            <div className="flex-jc-start ">
              <div className="flex-jc-center">
                <TokenSymbol symbol="PUSD" size={25} />
              </div>
              <div className="margin-left-10">
                <div>
                  <Value value={PUSDTotalSupply} />{" "}
                </div>
                <div>PUSD</div>
              </div>
            </div>
          </a>

          <Spacer size="md" />
          <a href={`https://etherscan.io/token/${PETHToken?.address}`}>
            <div className="flex-jc-start">
              <div className="flex-jc-center">
                <TokenSymbol symbol="PETH" size={25} />
              </div>
              <div className="margin-left-10">
                <div>
                  <Value value={PETHTotalSupply} />{" "}
                </div>
                <div>PETH</div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <WalletModal
        isOpen={isOpen}
        key={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
      />
    </StyledNavRight>
  );
};

const StyledNavRight = styled.div`
  display: none !important;
`;

const StyledWallet = styled.div`
  height: 90px;
`;
const StyledLabel = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
`;

export default Right;
