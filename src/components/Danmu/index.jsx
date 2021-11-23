/* eslint-disable react/react-in-jsx-scope */
import './index.scss'

const Index = ({ children, speed }) => {
  return (
    <div className="track">
      <div
        className="child"
        style={{
          animation: `scrollTo linear ${speed}s infinite`
        }}>
        {children}
      </div>
    </div>
  )
}

export default Index
