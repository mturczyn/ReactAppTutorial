/*
CONTAINMENT
If we want to have 'dynamic' component, some sort of container,
which needs, for example, to decorate its children, we can use special
property of props props.children. This gives us access to child 
elements/components, if we defined such, ex.
<OurCustomContainer>
    <h1>hello world<h1/>
    <p>blablabla<p/>
<OurCustomContainer/>
*/

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  )
}

function WelcomeDialog() {
  return (
    <FancyBorder color='blue'>
      <h1 className='Dialog-title'>Welcome</h1>
      <p className='Dialog-message'>Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  )
}

/*
SPECIALIZATION
If one component is special case of another, we also use composition
to achieve that, specialized component just renders more generic one.
*/

function Dialog(props) {
  return (
    <FancyBorder color='green'>
      <h1 className='Dialog-title'>{props.title}</h1>
      <p className='Dialog-message'>{props.message}</p>
    </FancyBorder>
  )
}

function SpecializedDialog() {
  return (
    <Dialog
      title='SpecializedDialog welcome'
      message='Thanks for using specialized dialog!'
    />
  )
}

function CompositionAndInheritanceTestArea(props) {
  return (
    <div>
      <WelcomeDialog />
      <SpecializedDialog />
    </div>
  )
}

export default CompositionAndInheritanceTestArea
