/* eslint-disable react/react-in-jsx-scope */
import './index.scss'
import Content from '../Content'

export const Title = ({ children, isRight, titleBg }) => {
  return (
    <div className={`title ${isRight ? 'right' : ''}`} style={{ background: titleBg }}>
      <span>{children}</span>
    </div>
  )
}

const Index = ({ title, subTitle, list, titleBg, isRight, id, collapse }) => {
  return (
    <section className={`part flex ${isRight ? 'flex-row-reverse' : ''}`} id={id}>
      <Title titleBg={titleBg} isRight={isRight}>
        {title}
      </Title>
      {subTitle ? (
        <div className={`sub-title ${isRight ? 'right' : ''}`}>
          <span>{subTitle}</span>
        </div>
      ) : null}
      <Content list={list} collapse={collapse} />
    </section>
  )
}

Index.defaultProps = {
  isRight: false
}

export default Index
