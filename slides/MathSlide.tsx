import * as React from 'react'
import Slide from "../components/Slide"
import mathbg from '../mathbg.jpg'
import Center from '../layout/Center'

const mathBackground = 
  <div style={{
    height: '100%',
    background: `linear-gradient(rgba(50,70,150,.8), rgba(50,70,150,.8)), url(${mathbg})`
    }}></div>

const h1Styles: React.CSSProperties = {
  fontSize: 240,
  color: 'rgb(100,225,225)'
}

export default Slide.create({
  background: mathBackground,
  elements: {},
  render: () => 
    <Center>
      <h1 style={h1Styles}>MATH</h1>
    </Center>,
  notes: `
    Essentially Algebra
  `
})