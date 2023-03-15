import { Suspense } from 'react'

export default function SuspenseWrapper(props) {
  const message =
    props.message ?? 'The bundle is being fetched from server. Please wait'
  return (
    <Suspense
      fallback={
        <div style={{ backgroundColor: 'red' }}>
          <h1>Loading bundles</h1>
          <p>{message}</p>
        </div>
      }
    >
      {props.children}
    </Suspense>
  )
}
