//
//Chris  Kayode Samuel
//ksamuel.chris@me.com
//
//github: github.com/alayode



    //AngularJS is a Framework written in JavaScript to extend the HTML and promote a cleaner way to write JS applications

        //1. What is the difference between compile and link?

            /*
            * In angular directives we use $compile to COMPILE a HTML  or DOM
            * into a template and produces a template function, which can then be used to LINK scope
             * and the template together
            *
            * */


var app = angular.module('schubert', []);

function createDirective(name){
    return function(){
        return {
            restrict: 'E',
            compile: function(tElem, tAttrs){
                console.log(name + ': compile');
                return {
                    pre: function(scope, iElem, iAttrs){
                        console.log(name + ': pre link');
                    },
                    post: function(scope, iElem, iAttrs){
                        console.log(name + ': post link');
                    }
                }
            }
        }
    }
}

app.directive('levelOne', createDirective('levelOne'));
app.directive('levelTwo', createDirective('levelTwo'));
app.directive('levelThree', createDirective('levelThree'));

// HERE THE ELEMENTS ARE STILL THE ORIGINAL TEMPLATE ELEMENTS

// COMPILE PHASE
// levelOne:    compile function is called on original DOM
// levelTwo:    compile function is called on original DOM
// levelThree:  compile function is called on original DOM

// AS OF HERE, THE ELEMENTS HAVE BEEN INSTANTIATED AND
// ARE BOUND TO A SCOPE
// (E.G. NG-REPEAT WOULD HAVE MULTIPLE INSTANCES)

// PRE-LINK PHASE
// levelOne:    pre link function is called on element instance
// levelTwo:    pre link function is called on element instance
// levelThree:  pre link function is called on element instance
