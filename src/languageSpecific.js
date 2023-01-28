// Function.prototype.bind()
// The bind() method creates a new function that, when called, has its
// this keyword set to the provided value, with a given sequence of 
// arguments preceding any provided when the new function is called.

// Here's exampe of binding this to a function.
export function boundFunctionsExample() {
    let person = {
        name: "Brendan Eich",
        hello: function (thing) {
            console.log(this + " says hello " + thing);
        }
    }

    let p2 = person
    p2.name = 'chnaged name'
    console.log('person name after change: ' + person.name);
    let p3 = { ...person, name: 'p3 name' }
    console.log('p3 name ' + p3.name);
    console.log('person name' + person.name);

    let boundHello = function (thing) { person.hello.call(person, thing) }
    boundHello("world");

    let hi = function (thing) { console.log(this + " SAYS HI " + thing) };
    let boundHi = function (thing) { hi.call(person, thing) }
    boundHi("world")

    let boundHi2 = hi.bind(person);
    boundHi2('world 2')

}

export function anotherExampleOfBoundFunctions() {
    const someNumber = 4201
    const module = {
        x: someNumber,
        getX: function () {
            // In strict mode, we need this ? operator, as this would end
            // in error, without strict mode this is replaced by global 
            // object and undefined is the result.
            return this?.x;
        }
    }

    const unboundGetX = module.getX;
    console.log("Expected: undefined")
    console.log(unboundGetX());

    const boundGetX = module.getX.bind(module);
    console.log("Expected: " + someNumber)
    console.log(boundGetX());
}