/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo, useCallback, useEffect, useState } from 'react'
import './index.scss'
import Part from '../../components/Part'
import Community from '../../components/Community'
import Danmu from '../../components/Danmu'
import { ethers, Contract } from 'ethers'
import ERC20 from '../../basis-cash/ERC20'
import { web3ProviderFrom } from '../../utils'
import { config, debtDefinitions } from '../../utils/config'

import logo from '../../assets/images/logo.svg'
import featuresBg from '../../assets/images/features-bg.png'
import faqBg from '../../assets/images/faq-bg.png'

const Index = () => {
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

  const [debt, setDebt] = useState({})

  const provider = new ethers.providers.Web3Provider(
    web3ProviderFrom('https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'),
    1
  )

  const fetchPools = useCallback(async () => {
    const contracts = {}
    for (const [name, deployment] of Object.entries(config.deployments)) {
      contracts[name] = new Contract(deployment.address, deployment.abi, provider)
    }
    const externalTokens = {}
    for (const [symbol, [address, decimal]] of Object.entries(config.externalTokens)) {
      externalTokens[symbol] = new ERC20(address, provider, symbol, decimal) // TODO: add decimal
    }

    const debts = []
    for (const debtInfo of Object.values(debtDefinitions)) {
      debts.push({
        ...debtInfo,
        address: config.deployments[debtInfo.contract].address,
        mortgagePoolContract: contracts[debtInfo.contract],
        mortgageToken: externalTokens[debtInfo.depositTokenName],
        uToken: externalTokens[debtInfo.earnTokenName]
      })
    }
    console.log(debts)
    setDebt(debts[1])

    const balance = await debts[1].mortgageToken.balanceOf(
      '0x505eFcC134552e34ec67633D1254704B09584227'
    )
    console.log(balance)
  }, [])

  useEffect(() => {
    fetchPools()
  }, [])

  return (
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
            <p className="amount">$131,233,574.45</p>
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
  )
}

export default Index
