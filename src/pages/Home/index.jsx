/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo } from 'react'
import './index.scss'
import Part from '../../components/Part'
import Community from '../../components/Community'
import Danmu from '../../components/Danmu'

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
      // 找到锚点
      let anchorElement = document.getElementById(anchorName)
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="wrapper flex">
      <aside className="left">
        <section className="top flex items-center justify-center">
          <img src={logo} alt="logo" className="logo" />
        </section>
        <section className="bottom">
          <ul className="flex flex-row-reverse">
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
            <Danmu speed="3">stake your crypto</Danmu>
            <Danmu speed="4">assets to mint</Danmu>
            <Danmu speed="5">parallel assets</Danmu>
            <p className="desc">Value reengineering based on oracle</p>
            <a href="https://parasset.top/">
              <div className="button">app</div>
            </a>
          </div>
          <div className="total">
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
