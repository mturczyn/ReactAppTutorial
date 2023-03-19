import React from 'react'

interface ShoppingListProps {
  name: string
}

class ShoppingList extends React.Component {
  constructor(props: ShoppingListProps) {
    super(props)
  }

  render() {
    return (
      <div className='shopping-list'>
        <h1>Shopping List for {(this.props as ShoppingListProps).name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    )
  }
}
