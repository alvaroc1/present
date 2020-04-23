import * as React from 'react'
import Slide from '../components/Slide'
import Base from '../parts/Base'
import Background from '../parts/Background'

export default Slide.create({
  background: <Background/>,
  elements: {

  },
  render: elements => 
    <Base title={<>Pure on the Inside<br/> Impure at the edges</>}>
      <div style={{padding: '0 50px'}}>
        <p style={{fontSize: 30}}>

        </p>
      </div>
    </Base>,
  notes: `
  `
})
