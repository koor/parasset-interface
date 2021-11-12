import './index.scss'
import Content from '../Content'

const Index = ({ title, subTitle, list, titleBg, isRight, id, collapse }) => {
  return (
    <section className={`part flex ${isRight ? 'flex-row-reverse' : ''}`} id={id}>
      <div className={`title ${isRight ? 'right' : ''}`} style={{ background: titleBg }}>
        <span>{title}</span>
      </div>
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
