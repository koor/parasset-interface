import { useMemo, useState } from 'react'
import './index.scss'

import telegram from '../../assets/images/links/telegram_icon.svg'
import telegramActive from '../../assets/images/links/telegram_icon(1).svg'
import audit from '../../assets/images/links/audit_icon.svg'
import auditActive from '../../assets/images/links/audit_icon(1).svg'
import docs from '../../assets/images/links/docs_icon.svg'
import docsActive from '../../assets/images/links/docs_icon(1).svg'
import github from '../../assets/images/links/github_icon.svg'
import githubActive from '../../assets/images/links/github_icon(1).svg'
import medium from '../../assets/images/links/medium_icon.svg'
import mediumActive from '../../assets/images/links/medium_icon(1).svg'
import twitter from '../../assets/images/links/twitter_icon.svg'
import twitterActive from '../../assets/images/links/twitter_icon(1).svg'
import whitepaper from '../../assets/images/links/whitepaper_icon.svg'
import whitepaperActive from '../../assets/images/links/whitepaper_icon(1).svg'

const Icon = ({ name, img, imgActive, link }) => {
  const [hover, setHover] = useState(false)

  const toggleHover = () => {
    setHover(!hover)
  }

  return (
    <a
      className="icon"
      href={link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}>
      <img src={hover ? imgActive : img} alt={name} />
    </a>
  )
}

const Index = () => {
  const links = useMemo(() => {
    return [
      {
        name: 'telegram',
        img: telegram,
        imgActive: telegramActive,
        link: 'https://t.me/parasset_chat'
      },
      {
        name: 'twitter',
        img: twitter,
        imgActive: twitterActive,
        link: 'https://twitter.com/Parasset2021'
      },
      {
        name: 'github',
        img: github,
        imgActive: githubActive,
        link: 'https://github.com/Parasset'
      },
      {
        name: 'medium',
        img: medium,
        imgActive: mediumActive,
        link: 'https://parasset2021-55646.medium.com/'
      },
      {
        name: 'docs',
        img: docs,
        imgActive: docsActive,
        link: '#'
      },
      {
        name: 'whitepaper',
        img: whitepaper,
        imgActive: whitepaperActive,
        link: 'https://www.parasset.top/file/Parasset_WhitePaper.pdf'
      },
      {
        name: 'audit',
        img: audit,
        imgActive: auditActive,
        link: 'https://www.parasset.top/file/Certik_Parasset_final.pdf'
      }
    ]
  }, [])

  return (
    <section className="community flex flex-row-reverse" id="community">
      <div className="title">
        <span>community</span>
      </div>
      <div className="flex-1">
        <div className="community-desc">
          <div className="md:px-2">
            deeply understand parasset, communicate with the team, and build a new parallel universe
            together.
          </div>
        </div>
        <div className="community-links">
          <div className="md:px-2 flex justify-between">
            {links.map(item => (
              <Icon key={item.name} img={item.img} imgActive={item.imgActive} link={item.link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Index
