import React from 'react'
import ReactDOM from 'react-dom'
import Deck from './components/Deck'
import SlideData from './components/SlideData'

ReactDOM.render(
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
  ]}/>,
  document.getElementById('root')
)