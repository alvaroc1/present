import * as React from 'react'
import Slide from '../components/Slide'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import 'typeface-roboto'
import 'typeface-montserrat'
import Background from '../parts/Background'
import Center from '../layout/Center'
import Quote from '../ui/Quote'

export default Slide.create({
  background: <Background/>,
  elements: {},
  render: () => 
    <Center>
      <Quote author='@djspiewak'>
        The only requirement for FP is an earnest desire to write 
        software that is more <em>testable</em>, more <em>composable</em>, and <em>easier 
        to understand and maintain</em>.
      </Quote>
    </Center>,
  notes: `
    The goal here is testable, composable, understandable, and maintainable code.
    
  `
})
