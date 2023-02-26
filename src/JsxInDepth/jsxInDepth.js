import React, { useState } from 'react'

function GreenButton() {
  return (
    <button
      style={{ color: 'green', backgroundColor: '#AAFFAA', fontWeight: 1000 }}
    >
      I SHOULD BE GREEN
    </button>
  )
}

function RedButton() {
  return (
    <button
      style={{ color: 'red', backgroundColor: '#FFAAAA', fontWeight: 1000 }}
    >
      I SHOULD BE RED
    </button>
  )
}

const green = 'green'
const red = 'red'
const coloredButtons = { [green]: GreenButton, [red]: RedButton }

function ChoosingTypeAtRuntime() {
  const [colorState, setColorState] = useState(green)
  const switchColor = () => setColorState(x => (x === red ? green : red))
  const ColoredButton = coloredButtons[colorState]
  return (
    <div>
      <button onClick={switchColor}>Switch color</button>
      <ColoredButton />
    </div>
  )
}

/**
 * Spread operator:
 * Below are equivalent
 *
 * function Comp1() {
 *   return <Greeting fName='michal' lName='turczyn' />
 * }
 *
 * function Comp2(){
 *   const props = { fName: 'michal', lName: 'turczyn' }
 *   return <Greeting {...props} />
 * }
 *
 * Extracting particular property:
 *
 * const { kind, ...passThrough } = props
 * // use kind variable
 * return <SomeComponent {...passThrough} />
 */

/**
 * Children as function
 * It's also possible to pass as children functions, but it's not usual to do so.
 */
function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {index => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  )
}

function Repeat(props) {
  let items = []
  for (let i = 1; i <= props.numTimes; i++) {
    items.push(props.children(i))
  }
  return <div>{items}</div>
}

function BoldString(props) {
  return <b>{String(props.value)}</b>
}

export default function JsxInDepth() {
  return (
    <div>
      <h3>ChoosingTypeAtRuntime</h3>
      <ChoosingTypeAtRuntime />
      <h3>ListOfTenThings</h3>
      <ListOfTenThings />
      <div className='container-with-border'>
        <h3>String() method over .toString() method</h3>
        <p>
          String is more powerful function as it correctly handles{' '}
          <BoldString value={null} /> and <BoldString /> (it should be
          undefined), which acutally were generated using that function.
        </p>
      </div>
    </div>
  )
}
