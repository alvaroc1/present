import * as React from 'react'
import Steppers, { RenderedSteppers, steppersSize, renderSteppers } from './Steppers'

class SlideData {

  constructor (
    readonly size: number,
    private readonly renderBody: (currentElementIdx: number) => React.ReactNode,
    readonly id?: string,
    readonly notes?: string
  ) {}

  render = (current: number) => this.renderBody(current)

  static create = <E extends Steppers>(params: {
    elements: E,
    render: (elems: RenderedSteppers<E>) => React.ReactNode,
    id?: string
    notes?: string
  }): SlideData => {
    const { elements, id, notes } = params

    const totalSize = 1 + steppersSize(elements)
    return new SlideData (
      totalSize,
      (current: number) => {
        const renderedElems = renderSteppers(elements, current - 1)

        return params.render(renderedElems)
      },
      id,
      notes
    )
  }
}

export default SlideData