import * as React from 'react'
import Slide from '../components/Slide'
import Background from '../parts/Background'
import 'typeface-montserrat'
import Center from '../layout/Center'

const styles: React.CSSProperties = {
  boxSizing: 'border-box',
  fontFamily: 'Montserrat',
  fontSize: 70,
  padding: 30,
  textAlign: 'center'
}

export default Slide.create({
  background: 
    <Background/>,
  elements: {},
  render: () => 
    <Center>
      <h1 style={styles}>Functional Programming</h1>
    </Center>,
  notes: `Hello`
})
