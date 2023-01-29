export function DoubledNumbers(props) {
    const listItems = props.numbers
        .map(n => n * 2)
        // React uses key attribute to track items in
        // lists, so it's important to define them uniquely.
        // When ID is not provided on handled data, hadny
        // solution an be to use index in collection,
        // which is default behaviour in React, but 
        // is not recommended, ex.:
        // 
        // .map((n, index) => (
        //     <li key={index}>{n}</li>
        // ));
        .map(n => (
            <li key={n}>{n}</li>
        ));

    // Keys only make sense in the context of the surrounding array.
    // In below example we set key attribute directly on the NumberDescription
    // component, not in <li> element inside, which is correct way.
    const descriptions = props.numbers
        .map(n => n * 2)
        .map(n => <NumberDescription key={n} number={n} />);

    // Moreover keys must be inly unique within
    // their siblings, so they don't have to be 
    // globally unique among all lists.
    // Also, it is not accessiblt inside component
    // through props.key.
    return (
        <div>
            <h2>Doubled numbers</h2>
            <ul>
                {listItems}
            </ul>
            <h2>Number descriptions</h2>
            <ul>
                {descriptions}
            </ul>
        </div>
    )
}

function NumberDescription(props) {
    const number = props.number;
    const isPositive = number > 0;
    const decimalPart = number % 1;
    const isEven = number % 2 == 0;
    return (
        <li>
            <div style={{ border: "1px solid black", padding: "10px", margin: "5px" }}>
                <h3>Info about {number}</h3>
                <p><b>Greater than zero:</b> {isPositive.toString()}</p>
                <p><b>Decimal part:</b> {decimalPart}</p>
                <p><b>Is even:</b> {isEven.toString()}</p>
            </div>
        </li>
    )
}