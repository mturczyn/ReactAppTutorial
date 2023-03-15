export default class DataSource {
  constructor() {
    this.listeners = []
    this.timerId = setInterval(this.receiveMessage.bind(this), 1000)
  }

  getComments() {
    const comments = []
    for (let i = 0; i < 1; i++) {
      comments.push({
        author: 'Michal',
        text: 'this is awesome',
      })
    }

    return comments
  }

  addChangeListener(handler) {
    this.listeners.push(handler)
  }

  removeChangeListener(handler) {
    this.listeners.splice(this.listeners.indexOf(handler), 1)
    if (this.listeners.length === 0) {
      clearInterval(this.timerId)
    }
  }

  receiveMessage() {
    console.log('generating message')
    this.listeners.forEach(handler => {
      handler({
        author: 'Michal',
        text: 'this is awesome',
      })
    })
  }
}
