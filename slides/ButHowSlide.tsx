import * as React from 'react'
import Slide from '../components/Slide'
import Background from '../parts/Background'
import Heading from '../ui/Heading'
import Center from '../layout/Center'

export default Slide.create({
  background: <Background/>,
  elements: {},
  render: elements => 
    <Center>
      <Heading>But the World is Impure!</Heading>
    </Center>,
  notes: `
    Ultimately we have to do some impure things.

    At some point we NEED to save to the database, write to a log file, or show something 
    on the screen.

    Recognize that we don't have to change everything to benefit from functional programming, 
    We want to do this incrementally.
  `
})
