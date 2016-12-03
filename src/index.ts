/// <reference path="../typings/ts.d.ts" />
import Hello from "./Hello"

require('../static/style.less')

let hello = new Hello()
document.getElementById('btn').addEventListener('click', () => {
    hello.saySomething() // в этой строке tslint будет ругаться пробелы вместо табуляции
})
