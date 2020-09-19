import * as React from 'react'
import Slide from './SlideData'
import ReactMarkdown from 'react-markdown'
import { WithStyles, createStyles, withStyles } from '@material-ui/styles'
import { useTransition, animated } from 'react-spring'
import { stripIndent } from 'common-tags'
import Layout from '@alvaroc1/layout/Layout'
import 'typeface-clear-sans'

const styles = createStyles({
  notes: {
    height: 200,
    color: 'rgb(50,50,50)',
    padding: '0 20px',
    overflow: 'auto'
  },
  navSlide: {
    transformBox: 'border-box',
    transformOrigin: 'left top',
  },
  slide: {
    position: 'absolute',
    margin: 'auto'
  }
})

interface DeckProps extends WithStyles<typeof styles> {
  width: number,
  height: number,
  slides: Slide[]
}

export default withStyles(styles)((props: DeckProps) => {
  const [currentPos, setCurrentPos] = React.useState(0)
  const [forward, setForward] = React.useState(true)
  const [presentationSize, setPresentationSize] = React.useState<[number,number]>([1,1])
  const presentationRef = React.useRef<HTMLDivElement>(null)

  const calculateScale = (presentationSize: [number,number]): number => {
    return Math.min(presentationSize[0] / props.width, presentationSize[1] / props.height)
  }

  const findSlidePos = (slideIdx: number) => {
    const go = (sIdx: number, slides: Slide[]): number => {
      if (slides.length === 0) throw 'error'
      const [first, ...rest] = slides
      return sIdx === 0 ? 
        0 : 
        (first.size + go(sIdx-1, rest))
    }
    return go(slideIdx, props.slides)
  }

  const size = props.slides.reduce((acc,s) => acc + s.size, 0)

  const next = () => {
    setForward(true)
    if (currentPos < size -1) setCurrentPos(currentPos + 1)
  }
  const prev = () => {
    setForward(false)
    if (currentPos > 0) setCurrentPos(currentPos - 1)
  }

  const handleKeyUp = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case "ArrowRight":  next(); break;
      case "ArrowLeft":   prev(); break;
      case "ArrowUp": setCurrentPos(findSlidePos(currentSlideIdx - 1)); break;
      case "ArrowDown": setCurrentPos(findSlidePos(currentSlideIdx + 1)); break;
      case "f":           requestFullcreen(); break;
    }
  }
  const requestFullcreen = () => {
    presentationRef.current!.requestFullscreen()
  }

  const handleResize = (_: UIEvent) => {
    console.log(presentationRef.current)
    setPresentationSize([
      presentationRef.current?.clientWidth ?? 0, 
      presentationRef.current?.clientHeight ?? 0
    ])
  }


  React.useEffect(() => {
    setPresentationSize([
      presentationRef.current?.clientWidth ?? 0, 
      presentationRef.current?.clientHeight ?? 0
    ])
  }, [])

  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('resize', handleResize)
    }
  })

  const presentationContentStyles: React.CSSProperties = {
    transform: `scale(${calculateScale(presentationSize)})`,
  }

  const findCurrent = (idx: number, curPos: number): [number,number] => {
    const slide = props.slides[idx]
    return curPos < slide.size ? 
      [idx, curPos] :
      findCurrent(idx+1, curPos - slide.size)
  }

  const [currentSlideIdx, currentElementIdx] = findCurrent(0, currentPos)

  const transitionsForward = useTransition(currentSlideIdx, null, {
    from: {position: 'fixed', transform: 'translate(120%,0)'},
    enter: {position: 'fixed', transform: 'translate(0%,0)'},
    leave: {position: 'fixed', transform: 'translate(-120%,0)'}
  })
  const transitionsBackward = useTransition(currentSlideIdx, null, {
    from: {position: 'fixed', transform: 'translate(-120%,0)'},
    enter: {position: 'fixed', transform: 'translate(0%,0)'},
    leave: {position: 'fixed', transform: 'translate(120%,0)'}
  })

  const ratio = props.width / props.height
  const scaleMain = calculateScale(presentationSize)
  const thumbnailWidth = 160

  return (
    <Layout.layout height='fill' color='rgb(200,200,200)' fontFamily='Clear Sans'>
      <Layout.row height='fill' width='fill' fontFamily='Clear Sans'>

        <Layout.column height='fill' background='rgb(40,40,40)'>
          <Layout.el height='fill' spacing={10}>
            <Layout.el centerX>
              {currentSlideIdx}:{currentElementIdx} - {currentPos + 1} of {size}
            </Layout.el>
            <Layout.el scrollbarY padding={10} spacing={10}>
              {props.slides.map((s, k) =>
                <Layout.el key={k} width={thumbnailWidth} height={thumbnailWidth / ratio} outline={k === currentSlideIdx ? '2px solid lime' : undefined} 
                  onClick={() => setCurrentPos(findSlidePos(k))}>
                  <Layout.el width={props.width} height={props.height} transform={`scale(${thumbnailWidth / props.width})`} transformOrigin='top left'>
                  <div className={props.classes.navSlide}>
                    {s.render(s.size - 1)}
                  </div>
                  </Layout.el>
                </Layout.el>
              )}
            </Layout.el>
          </Layout.el>
        </Layout.column>
        <Layout.column height='fill' fillPortion={9}>
          <Layout.el fillPortion={5} width='fill' background='black' ref={presentationRef}>

            <Layout.el centerX centerY width={props.width} height={props.height} transform={`scale(${scaleMain})`}>
              {(forward ? transitionsForward : transitionsBackward).map(d => 
                <animated.div className={props.classes.slide} style={d.props} key={d.key}>
                  {props.slides[d.item].render(currentElementIdx)}
                </animated.div>
              )}
            </Layout.el>

          </Layout.el>
          <Layout.el fillPortion={1} width='fill' height={200}>
            <ReactMarkdown source={stripIndent(props.slides[currentSlideIdx].notes ?? '')}/> NOTES
          </Layout.el>
        </Layout.column>
      </Layout.row>
    </Layout.layout>
  )
})
