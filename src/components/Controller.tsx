import React from 'react'
import qs from 'qs'

export default () => {
  const [currentPos, setCurrentPos] = React.useState(0)
  
  React.useEffect(() => {
    const initialize = () => {
      const hash = qs.parse(window.location.hash.substring(1))
      const focus = hash['focus']
    }
    const handleKeyUp = (ev: KeyboardEvent) => {
      const hash = qs.parse(window.location.hash.substring(1))
      const focus = hash['focus']

      console.log(focus)

      /*
      switch (ev.key) {
        case "ArrowRight":  next(); break;
        case "ArrowLeft":   prev(); break;
        case "ArrowUp": setCurrentPos(findSlidePos(currentSlideIdx - 1)); break;
        case "ArrowDown": setCurrentPos(findSlidePos(currentSlideIdx + 1)); break;
        case "f":           requestFullcreen(); break;
      }
      */
    }

    const handleHashChange = (ev) => {
      console.log(ev)
    }

    const handleResize = (_: UIEvent) => {
      console.log(_)
      /*
      console.log(presentationRef.current)
      setPresentationSize([
        presentationRef.current?.clientWidth ?? 0, 
        presentationRef.current?.clientHeight ?? 0
      ])
      */
    }
  

    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('resize', handleResize)
    window.addEventListener('hashchange', handleHashChange)

    initialize()
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('hashchange', handleHashChange)
    }
  })
  return (
    <div>controller <a href='#focus=3'>Change</a></div>
  )
}
