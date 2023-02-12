export function DataTable(props) {
  return (
    <dl>
      {props.items.map((x, idx) => (
        <>
          <dt
            style={{
              backgroundColor: idx % 2 == 0 ? '#88DDDD' : 'lightgray',
              padding: '10px',
            }}
          >
            {x.name}
          </dt>
          <dd
            style={{
              backgroundColor: idx % 2 == 0 ? '#AAFFFF' : '#AAAAAA',
              padding: '10px',
            }}
          >
            {x.description}
          </dd>
        </>
      ))}
    </dl>
  )
}

export function ExampleDataTable(props) {
  const size = props.size
  const items = []
  for (let i = 0; i <= size; i++) {
    items.push({
      name: 'ITEM ' + (i + 1),
      description: 'this item has score ' + ((i * 1.0) / size) * 100,
    })
  }
  return DataTable({
    items: items,
  })
}
