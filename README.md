This program analyses TypeScript and JavaScript code according to the [Cognitive Complexity metric](https://www.sonarsource.com/docs/CognitiveComplexity.pdf).

Right now it creates a JSON output. In future I expect to add an interactive html output.

## Disclaimer

Myself and this project are completely unaffiliated with Sonar Source.


## Simple Overview of the Cognitive Complexity Metric

Each function, class, namespace, type, and file has a complexity score based on the total complexity of all code written inside. The complexity score is not increased by code that is referenced.

### Inherent Cost

The following structures increase the complexity score by 1.

* `if`, `else`, `else if`, `? :` for types and data
* `switch`
* `for`, `while`, `do while`
* `catch`
* `break label`, `continue label`
* a sequence of the same operator `&&`, `||`, `??`, intersection `&`, union `|`
* a recursive call
* mapped type `{ [K in T]: ... }`

### Nesting Increments

The following structures increase the complexity score by a number equal to the depth the code is at. The depth of code is defined in the next section.

* `if`, `? :` for types and data
* `switch`
* `for`, `while`, `do while`
* `catch`
* mapped type `{ [K in T]: ... }`

The following structures increment the depth by 1.

* `if`, `else`, `else if`, the code after `?` and `:` in conditional expressions
* `switch`
* `for`, `while`, `do while`
* `catch`
* nested functions, nested classes


## Differences

Classes have a score
Files have a score

TODO Explain folder structure
TODO explain what the examples are for

## Type Operators

mapped types have inherent cost
mapped types don't increase depth

conditionals have cost and increase depth

recursive types have an increment