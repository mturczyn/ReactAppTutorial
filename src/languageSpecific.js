// Function.prototype.bind()
// The bind() method creates a new function that, when called, has its
// this keyword set to the provided value, with a given sequence of
// arguments preceding any provided when the new function is called.

/*
ATTACHING DEBUGGER TO APPLICATION
So far I have managed to attach debugger in this way:
- in .vscode/launch.json file we need to set "configurations:url": "http://localhost:3000",
- run 'npm start'
- in VS Code go to 'Run and Debug' from Activity Bar on the left side,
and from the top dropdown select configuration 'Launch Chrome against localhost'
and press run.
After this steps debugger should be attached.

# What not worked:
- running Opera against localhost:3000 (I guess it's because of browser),
- running different configurations (which in turn just execute 'npm run start' command)
*/

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

export function boundingExamples() {
    const person = {
        name: "Michal",
        sayHi: function (welcoming) {
            if (this === undefined) {
                return "this is undefined";
            }
            return this.name + ' says ' + welcoming;
        }
    }

    let unboundSayHi = person.sayHi;
    let hi = unboundSayHi("hello");
    // Expected: this is undefined
    console.log(hi);

    let boundSayHi = person.sayHi.bind(person);
    let hibound = boundSayHi("hello");
    // Expected: Michal says hello
    console.log(hibound);

    let wrappedBound = boundSayHi.bind({ name: "Not Michal" });
    let hiWrappedBound = wrappedBound("hello");
    // Expected: Michal says hello
    console.log(hiWrappedBound);

    let willItWork = person.sayHi.bind({ name: "Not Michal" });
    let hiWillItWork = willItWork('hello');
    // Expected: Not Michal says hello
    console.log(hiWillItWork);
}

export function argsExample() {
    let logFunction = log;

    log(1, 2);
    console.log(1, 2);

}

function log(...args) {
    console.log(...args);
}

export function computedPropertiesExample() {
    let name = 'age'
    let person = {
        name: 'Michal',
        [name]: 24,
    }

    console.log(person.name)
    console.log(person[name])
    console.log(person.age)

    let person2 = {
        name: 'Mateusz'
    }
    person2[name] = 30
    console.log(person2.name)
    console.log(person2[name])
    console.log(person2.age)
}