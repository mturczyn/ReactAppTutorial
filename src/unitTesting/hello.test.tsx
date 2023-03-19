import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Hello from './hello'

let container: Element | null

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container!)
  container!.remove()
  container = null
})

it('renders with or without a name', () => {
  render(<Hello />, container)
  expect(container!.textContent).toBe('Hey, stranger')
})

it('renders with or without a name 2', () => {
  render(<Hello name='Jenny' />, container)
  expect(container!.textContent).toBe('Hello, Jenny!')
})

it('renders with or without a name 3', () => {
  render(<Hello name='Margaret' />, container)
  expect(container!.textContent).toBe('Hello, Margaret!')
})
