//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import useIsMobile from "../../hooks/useIsMobile";
import { $isFiniteNumber, $isPositiveNumber } from "./../../utils/utils";

import BigValue from "../../components/BigValue";
import TableTitle from "./components/TableTitle";
import TableList from "./components/TableList";
import Value from "../../components/Value";

import Footer from "./components/Footer";
import useBasisCash from "./../../hooks/useBasisCash";
import useDebt from "../../hooks/debt/useDebt";
import useTVL from "../../hooks/debt/useTVL";
import useStaked from "../../hooks/debt/useStaked";
import useDebtInfo from "../../hooks/debt/useDebtInfo";
import useMaxRatio from "./../../hooks/coin/useMaxRatio";
import useTotalSupply from "./../../hooks/useTokenTotalSupply";
import useItanks from "./../../hooks/itank/useItanks";
import useItankInfo from "./../../hooks/itank/useItankInfo";

import './index.scss'
import Part from '../../components/Part'
import Community from '../../components/Community'
import Danmu from '../../components/Danmu'

import logo from '../../assets/images/logo.svg'
import featuresBg from '../../assets/images/features-bg.png'
import faqBg from '../../assets/images/faq-bg.png'

const Home: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const basisCash = useBasisCash();
  const itanks = useItanks();
  //两个保险池相加
  const { itankInfo: itankInfo1 } = useItankInfo(
    itanks.length ? itanks[0] : null
  );
  const { itankInfo: itankInfo2 } = useItankInfo(
    itanks.length ? itanks[1] : null
  );
  const ETHDebt = useDebt("ETHPUSD");
  const NESTPUSDDebt = useDebt("NESTPUSD");
  const NESTPETHDebt = useDebt("NESTPETH");
  const { info: ETHDebtInfo } = useDebtInfo(ETHDebt);
  const { info: NESTPUSDDebtInfo } = useDebtInfo(NESTPUSDDebt);
  const { info: NESTPETHDebtfo } = useDebtInfo(NESTPETHDebt);
  const ETHPUSDTVL = useTVL(
    ETHDebt?.mortgagePoolContract,
    ETHDebt?.mortgageToken,
    ETHDebtInfo?.mortgagePrice
  );

  const NESTPUSDTVL = useTVL(
    NESTPUSDDebt?.mortgagePoolContract,
    NESTPUSDDebt?.mortgageToken,
    NESTPUSDDebtInfo?.mortgagePrice
  );
  const NESTPETHTVL = useTVL(
    NESTPETHDebt?.mortgagePoolContract,
    NESTPETHDebt?.mortgageToken,
    NESTPETHDebtfo?.mortgagePrice
  );

  const ETHPUSDStaked = useStaked(
    ETHDebt?.mortgagePoolContract,
    ETHDebt?.mortgageToken
  );

  const NESTPUSDStaked = useStaked(
    NESTPUSDDebt?.mortgagePoolContract,
    NESTPUSDDebt?.mortgageToken
  );
  const NESTPETHStaked = useStaked(
    NESTPETHDebt?.mortgagePoolContract,
    NESTPETHDebt?.mortgageToken
  );

  const maxRatioETH = useMaxRatio(
    ETHDebt?.mortgagePoolContract,
    ETHDebt?.mortgageToken
  );
  const maxRatioNEST = useMaxRatio(
    NESTPUSDDebt?.mortgagePoolContract,
    NESTPUSDDebt?.mortgageToken
  );

  const PUSDTotalSupply = useTotalSupply(basisCash?.externalTokens["PUSD"]);
  const PETHTotalSupply = useTotalSupply(basisCash?.externalTokens["PETH"]);

  const ETHTVL = useMemo(() => {
    return $isPositiveNumber($isFiniteNumber(ETHPUSDTVL));
  }, [ETHPUSDTVL]);
  const NESTTVL = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(NESTPUSDTVL).plus(NESTPETHTVL).toNumber())
    );
  }, [NESTPUSDTVL, NESTPETHTVL]);

  const ETHStaked = useMemo(() => {
    return $isPositiveNumber($isFiniteNumber(ETHPUSDStaked));
  }, [ETHPUSDStaked]);

  const NESTStaked = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(
        new BigNumber(NESTPUSDStaked).plus(NESTPETHStaked).toNumber()
      )
    );
  }, [NESTPUSDStaked, NESTPETHStaked]);

  const list = useMemo(() => {
    return [
      {
        name: "ETH",
        TVL: ETHTVL,
        staked: ETHStaked,
        maxRatio: $isPositiveNumber(
          $isFiniteNumber(new BigNumber(maxRatioETH).times(100).toNumber())
        ),

        liqRatio: $isPositiveNumber(
          $isFiniteNumber(
            new BigNumber(ETHDebtInfo.liqRatio).times(100).toNumber()
          )
        ),
        balance: "",
        active: "PUSD",
        selectList: [
          {
            name: "PUSD",
            id: "PUSD",
          },
        ],
      },
      {
        name: "NEST",
        TVL: NESTTVL,
        staked: NESTStaked,
        maxRatio: $isPositiveNumber(
          $isFiniteNumber(new BigNumber(maxRatioNEST).times(100).toNumber())
        ),
        liqRatio: $isPositiveNumber(
          $isFiniteNumber(
            new BigNumber(NESTPUSDDebtInfo.liqRatio).times(100).toNumber()
          )
        ),
        balance: "",
        active: "PUSD",
        selectList: [
          {
            name: "PUSD",
            id: "PUSD",
          },
          {
            name: "PETH",
            id: "PETH",
          },
        ],
      },
    ];
  }, [
    ETHTVL,
    NESTTVL,
    maxRatioETH,
    maxRatioNEST,
    ETHDebtInfo,
    NESTPUSDDebtInfo,
    ETHStaked,
    NESTStaked,
  ]);
  const totalmortgageAssetValue = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(ETHTVL).plus(NESTTVL).toNumber())
    );
  }, [ETHTVL, NESTTVL]);

  const totalParassetValue = useMemo(() => {
    //两个平行资产总供应*对U价值
    const PUSDValue = new BigNumber(PUSDTotalSupply).times(1);

    const PETHValue = new BigNumber(PETHTotalSupply).times(
      ETHDebtInfo?.mortgagePrice
    );
    return $isPositiveNumber(
      $isFiniteNumber(PUSDValue.plus(PETHValue).toNumber())
    );
  }, [PUSDTotalSupply, PETHTotalSupply, ETHDebtInfo?.mortgagePrice]);

  const totalItankValue = useMemo(() => {
    //保险池内资产两种币的总和换成USDT
    let tvl1 = new BigNumber(itankInfo1.depositFundValue).plus(
      itankInfo1.earnFundValue
    );
    let tvl2 = new BigNumber(itankInfo2.depositFundValue).plus(
      itankInfo2.earnFundValue
    );
    tvl1 = $isPositiveNumber($isFiniteNumber(tvl1.toNumber()));
    tvl2 = $isPositiveNumber($isFiniteNumber(tvl2.toNumber()));
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(tvl1).plus(tvl2).toNumber())
    );
  }, [
    itankInfo1.depositFundValue,
    itankInfo1.earnFundValue,
    itankInfo2.depositFundValue,
    itankInfo2.earnFundValue,
  ]);

  const featureList = useMemo(() => {
    return [
      {
        name: 'oracle',
        desc: 'ADOPT A COMPLETELY DECENTRALIZED NEST ORACLE TO ENSURE THAT THE PRICE OF MORTGAGE ASSETS IS REASONABLE.'
      },
      {
        name: 'Coll.ratio',
        desc: 'the mortgage rate mechanism designed based on asset volatility greatly reduces the probability of extreme market penetration.'
      },
      {
        name: 'insurance pool',
        desc: 'The insurance pool not only enjoys the stability fee, exchange handling fee and liquidation residual value, but also bears the risk of systematic cross position compensation.'
      },
      {
        name: 'liquidation',
        desc: 'The stable 10% return gives the liquidator enough motivation to complete the liquidation before the system crosses the position.'
      }
    ]
  }, [])

  const stabilityList = useMemo(() => {
    return [
      {
        name: 'Stability fee',
        desc: 'bond holders need to pay a growing stability fee to the insurance pool to hedge the insurer’s compensation risk.'
      },
      {
        name: '1 PUSD = 1 USDT',
        desc: 'the system always allows the underlying assets to be exchanged for parallel assets 1:1 through the insurance pool to ensure the stability of parallel assets'
      }
    ]
  }, [])

  const diversityList = useMemo(() => {
    return [
      {
        name: 'Mortgaged assets',
        desc: 'support the vast majority of mains team assets to mint prarallet assets'
      },
      {
        name: 'parallel assets',
        desc: 'Parallel assets are not unique. most mainstream assets have corresponding parallel assets.'
      }
    ]
  }, [])

  const faqList = useMemo(() => {
    return [
      {
        name: '○ what is parasset?',
        desc: 'Parasset is a new type of mortgage synthetic asset protocol, which is open to all on-chain native asset protocols and builds a new on-chain asset service platform. Users can mint parallels assets on Parasset by stake ETH/NEST, such as pETH, pUSD, etc.'
      },
      {
        name: '○ How to mint parallel assets?',
        desc: 'Just launch Parasset APP, mortgage ETH,NEST or other mainstream assets mint parallel assets, such as pETH, pUSD.Or use the underlying asset to quickly mint parallel assets in the exchange function module.'
      },
      {
        name: '○ How can I earn money on Parasset?',
        desc: 'Depositing ETH/USDT and other underlying assets in the insurance pool can earn stability fees, exchange fees and liquidation residual value, and at the same time stake LP tokens to mine ASET.'
      },
      {
        name: '○ Which institutions invest in paraset?',
        desc: "Parasset investment institutions include: Huobi Ventures, FBG Capital, OKEx Blockdream Ventures, 21DAO, AU21, Gravity Resource, LD Capital, Infinity Labs, HOT LABS, Kernel Ventures, LINKVC, Kyros Ventures, All For Ventures, 100X Capital, YBB. Foundation, 7 O'Clock Capital"
      }
    ]
  }, [])

  const scrollToAnchor = anchorName => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName)
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
  }


  return (
    // <>
    //   <BigValue
    //     text={t("dyzcsdsz")}
    //     color="#DD8751"
    //     value={<Value value={totalmortgageAssetValue} prefix="$" />}
    //   />
    //   <BigValue
    //     text={t("pxzcltsz")}
    //     color="#77A89A"
    //     value={<Value value={totalParassetValue} prefix="$" />}
    //   />
    //   <BigValue
    //     text={t("bxcldxzsz")}
    //     color="#5DB3D3"
    //     value={<Value value={totalItankValue} prefix="$" />}
    //   />
    //   {/* <TableTitle />
    //   <TableList list={list} />
    //   <Footer /> */}
    // </>
    <div className="wrapper flex">
    <aside className="left flex-shrink-0">
      <section className="top flex items-center justify-center">
        <img src={logo} alt="logo" className="logo" />
      </section>
      <section className="bottom flex">
        <ul className="flex flex-row-reverse mx-auto">
          <li>
            <a onClick={() => scrollToAnchor('home')}>HOME</a>
          </li>
          <li>
            <a onClick={() => scrollToAnchor('features')}>FEATURES</a>
          </li>
          <li>
            <a onClick={() => scrollToAnchor('faq')}>FAQ</a>
          </li>
          <li>
            <a onClick={() => scrollToAnchor('community')}>CONMMUNITY</a>
          </li>
        </ul>
      </section>
    </aside>
    <div className="right flex-1">
      <section className="top" id="home"></section>
      <section className="bottom">
        <div className="banner">
          <Danmu speed="5">stake your crypto</Danmu>
          <Danmu speed="6">assets to mint</Danmu>
          <Danmu speed="5.5">parallel assets</Danmu>
          <p className="desc">Value reengineering based on oracle</p>
          <a href="https://parasset.top/">
            <div className="button">app</div>
          </a>
        </div>
        <div className="total flex justify-between flex-col">
          <p>Total value locked</p>
          <p className="amount">
            <Value value={totalmortgageAssetValue ? totalmortgageAssetValue : '2714116.2945312187'} prefix="$" />
          </p>
        </div>
      </section>
      <Part
        id="features"
        title="features"
        subTitle="security"
        list={featureList}
        titleBg={`url(${featuresBg}) center center / cover no-repeat #459EB5`}
      />
      <Part id="stability" title="stability" list={stabilityList} isRight />
      <Part title="diversity" list={diversityList} />
      <Part
        id="faq"
        title="FAQ"
        list={faqList}
        titleBg={`url(${faqBg}) center center / cover no-repeat #EF7F63`}
        collapse
      />
      <Community />
      <section className="footer"></section>
    </div>
  </div>
  );
};

export default Home;
