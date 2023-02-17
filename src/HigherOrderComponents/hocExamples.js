import DataSource from './DataSource'
import React from 'react'

const dataSource = new DataSource()

/**
 * A higher order component (HOC) is an advanced
 * technique in React for reusing component logic.
 * HOCs are not part of the React API, per se. They are
 * a pattern that emerges from React's compositional nature.
 *
 * In other words, a higher order component is a function
 * that takes a component and returns a new component:
 *
 * const EnhancedComponent = higherOrderComponent(WrappedComponent);
 *
 * Whereas a component transforms props into UI, a higher order component
 * transforms a component into another component.
 */

class CommentList extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      comments: dataSource.getComments(),
    }
  }

  componentDidMount() {
    dataSource.addChangeListener(this.handleChange)
  }

  componentWillUnmount() {
    dataSource.removeChangeListener(this.handleChange)
  }

  handleChange(comment) {
    if (!this.props.enabled) {
      return
    }

    this.setState(ps => {
      return {
        comments: [...ps.comments, comment],
      }
    })
  }

  render() {
    return (
      <div className='container-with-border'>
        {this.state.comments.map(x => (
          <div style={{ backgroundColor: 'aqua' }}>
            <label>{x.author}</label>
            <p>{x.text}</p>
          </div>
        ))}
      </div>
    )
  }
}

function withSubscription(WrappedComoponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
      this.state = {
        data: selectData(dataSource, props),
      }
    }

    componentDidMount() {
      dataSource.addChangeListener(this.handleChange)
    }

    componentWillUnmount() {
      dataSource.removeChangeListener(this.handleChange)
    }

    handleChange(comment) {
      this.setState(ps => {
        return { data: [...ps.data, comment] }
      })
    }

    render() {
      return (
        <WrappedComoponent
          data={this.state.data}
          {...this.props}
        />
      )
    }
  }
}

const CommentListHoc = withSubscription(CommentList, dataSource =>
  dataSource.getComments()
)

function getEnableDisableLabel(isEnabled) {
  return isEnabled ? 'Disable' : 'Enable'
}

export default function HocTestArea() {
  const [commentListEnabled, setCommentListEnabled] = React.useState(false)
  const [hocCommentListEnabled, setHocCommentListEnabled] =
    React.useState(false)
  return (
    <div>
      <div>
        <button onClick={() => setCommentListEnabled(x => !x)}>
          {getEnableDisableLabel(commentListEnabled)} updates on normal list
        </button>
        <button onClick={() => setHocCommentListEnabled(x => !x)}>
          {getEnableDisableLabel(hocCommentListEnabled)} updates on HOC comment
          list
        </button>
      </div>
      <p>Comment list using some data source</p>
      <CommentList enabled={commentListEnabled} />
      <p>Higher Order Component Comment list using some data source</p>
      <CommentListHoc enabled={hocCommentListEnabled} />
    </div>
  )
}
