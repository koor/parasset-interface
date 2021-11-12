import './index.scss'
import { Collapse } from 'react-collapse'
import { useState } from 'react'

const Item = ({ item, collapse }) => {
  const [open, setOpen] = useState(false)

  return (
    <li className={`item ${collapse ? 'clickable' : ''}`} onClick={() => setOpen(!open)}>
      <div className="md:px-2">
        <p className="name">{item.name}</p>
        {collapse ? (
          <Collapse isOpened={open}>
            <p className="desc">{item.desc}</p>
          </Collapse>
        ) : (
          <p className="desc">{item.desc}</p>
        )}
      </div>
    </li>
  )
}

const Index = ({ list, collapse }) => {
  return (
    <ul className="item-list flex-1">
      {list.map((item, index) => (
        <Item key={item.name + index} item={item} collapse={collapse} />
      ))}
    </ul>
  )
}

export default Index
