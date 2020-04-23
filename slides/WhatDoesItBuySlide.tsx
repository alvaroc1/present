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
      <Heading>What does it buy us?</Heading>
    </Center>,
  notes: `
    So, that seems very limitting. We are having to give up a lot of things, so
    the upside must be pretty good.
  `
})