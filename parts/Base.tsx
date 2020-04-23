import * as React from 'react'

interface Props {
  title: React.ReactNode,
  children: React.ReactNode
}

const h1Styles: React.CSSProperties = {
  fontSize: 50, 
  textAlign: 'center',
  color: '#fc6986'
}
export default (props: Props) => 
  <>
    <h1 style={h1Styles}>{props.title}</h1>
    {props.children}
  </>
