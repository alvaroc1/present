import React from 'react'
import ReactDOM from 'react-dom'
import Deck from '../src/components/Deck'
import SlideData from '../src/components/SlideData'
import { StylesProvider, createGenerateClassName } from '@material-ui/styles'
import Controller from '../src/components/Controller'

const generateClassName = createGenerateClassName({
  productionPrefix: 'present',
})

/*
ReactDOM.render(
  <Controller/>,

  document.getElementById('root')
)
*/

ReactDOM.render(
    <StylesProvider generateClassName={generateClassName}>
  <Deck 
    width={800}
    height={600}
    slides={[
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content <h1>1</h1></div>
    }),
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content<h2>2</h2></div>,
      id: 'second'
    }),
    SlideData.create({
      elements: {},
      render: _elems => <div>slide content<h1>3</h1></div>
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
