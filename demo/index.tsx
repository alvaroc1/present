import React from 'react'
import ReactDOM from 'react-dom'
import Deck from '../src/components/Deck'
import SlideData from '../src/components/SlideData'
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'

const generateClassName = createGenerateClassName({
  productionPrefix: 'present',
})

ReactDOM.render(
    <StylesProvider generateClassName={generateClassName}>
  <Deck 
    width={800}
    height={600}
    slides={[
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content</div>
    }),
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content</div>
    }),
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content</div>
    }),
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content</div>
    }),
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content</div>
    }),
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content</div>
    }),
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content</div>
    }),
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content</div>
    }),
  ]}/>
    </StylesProvider>,
  document.getElementById('root')
)
