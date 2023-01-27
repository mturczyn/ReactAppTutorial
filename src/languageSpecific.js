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