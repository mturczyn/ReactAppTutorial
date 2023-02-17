import { createContext, useContext } from 'react'

// This also can be defined in separate file and exported.
const LevelContext = createContext(5)

export default function SectionedHeaders() {
  return (
    <div className='conainer-with-border'>
      <LevelContext.Provider value={1}>
        <Heading />
        <Heading />
        <Heading />
      </LevelContext.Provider>
      <div className='conainer-with-border'>
        <Heading />
        <Heading />
        <Heading />
      </div>
    </div>
  )
}

function Heading(props) {
  /**
   * Previously, we had to get it from props, passed from parent.
   * const level = props.level
   * Now we use convenient method to get it from context.
   * Other way is to use Context.Consumer and provided by it `value`,
   * but is not as clean as below.
   */
  const level = useContext(LevelContext)
  const content = level
    ? 'Level ' + level + ' heading'
    : 'Undefined level heading'
  switch (level) {
    case 2:
      return <h2>{content}</h2>
    case 3:
      return <h3>{content}</h3>
    case 4:
      return <h4>{content}</h4>
    case 5:
      return <h5>{content}</h5>
    case 6:
      return <h6>{content}</h6>
    default:
      return <h1>{content}</h1>
  }
}
