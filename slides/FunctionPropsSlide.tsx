import * as React from 'react'
import Slide from '../components/Slide'
import Background from '../parts/Background'
import Stepper from '../components/Stepper'
import Base from '../parts/Base'

export default Slide.create({
  background: <Background/>,
  elements: {
    props: Stepper.array(["Totality", "Determinism", "Purity"], (v, active) => 
      active && <div>{v}</div>
    )
  },
  render: elements => 
    <Base title='Function'>
      <div style={{textAlign: 'center', fontSize: 55, lineHeight: 1.9, marginTop: 60}}>
        {elements.props}
      </div>
    </Base>,
  notes: `
    There are 3 properties that a function must exhibit that we care about:
    * Totality
    * Determinism
    * Purity
  `
})
