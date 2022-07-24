import React from 'react'
import './EmptyView.scss'


const styleObj = {
  "center": {
    "display": "table",
    "padding": "200px 0"
  }
};

export default function EmptyView(props) {
  
  const { text="No Results", center } = props

  return (
    <div className="emptyView" style={center && styleObj.center}>{text}</div>
  )
}
