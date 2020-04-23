import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/styles'
import Steppers, { RenderedSteppers, steppersSize, renderSteppers } from './Steppers'

const styles = createStyles({
  root: {
    position: 'relative',
    boxSizing: 'border-box',
    width: 800,
    height: 600,
    padding: 10,
    background: 'blue'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  foreground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

interface SlideCompProps extends WithStyles<typeof styles> {
  background: React.ReactNode,
  children: React.ReactNode
}
const SlideComp = withStyles(styles)((props: SlideCompProps) => 
  <div className={props.classes.root}>
    <div className={props.classes.background}>{props.background}</div>
    <div className={props.classes.foreground}>{props.children}</div>
  </div>
)

class Slide {

  constructor (
    readonly size: number,
    private readonly renderBody: (currentElementIdx: number) => React.ReactNode,
    private readonly background: React.ReactNode,
    readonly notes?: string
  ) {}

  render = (current: number) => 
    <SlideComp background={this.background}>
      {this.renderBody(current)}
    </SlideComp>

  static create = <E extends Steppers>(params: {
    background?: React.ReactNode,
    elements: E,
    render: (elems: RenderedSteppers<E>) => React.ReactNode,
    notes?: string
  }): Slide => {
    const { elements, background, notes } = params

    const totalSize = 1 + steppersSize(elements)
    return new Slide (
      totalSize,
      (current: number) => {
        const renderedElems = renderSteppers(elements, current - 1)

        return (
          <SlideComp background={params.background}>
            {params.render(renderedElems)}
          </SlideComp>
        )
      },
      background,
      notes
    )
  }
}

export default Slide
