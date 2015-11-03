
//
//Chris  Kayode Samuel
//ksamuel.chris@me.com
//
//github: github.com/alayode




/*
  When a constructor creates an object, that object implicitly references the constructor's "prototype" property
  for the purpose of resolving property references. The constructor's "prototype" property for the purpose of property
  references. The constructor's "prototype" property can be reference by the program expression constructor.prototype
  and Properties added to an object's prototype are shared, through inheritance, by all objects sharing the prototype.
  Alternatively a new object may be created with an explicity specified prototype by using the Object.create built-in function.

Another way to look at prototypes is when a object that creates a new Array() uses the Array.Prototype as its prototype, and the object
created by new Date() uses Date.Prototype as its prototype.

One of the rare objects with no prototype is

Object.prototype this does not inherit any properites

*/

var o1 = Object.create({x:1, y:2});
// o1 inherits the properties of x and y.




// Example #2

/**
 * Point a child's prototype to a parent's prototype
 **/
var extendObj = function(childObj, parentObj) {
    childObj.prototype = parentObj.prototype;
};



    /*
    * JavaScript has its on set of properties and the also inherit a set of properties from their prototype
    * object.
    * */


// base human object
var Human = function() {};
// inhertiable attributes / methods
Human.prototype = {


    name: '',
    gender: '',
    planetOfBirth: 'Earth',
    sayGender: function () {
        console.log(this.name + ' says my gender is ' + this.gender);
    },
    sayPlanet: function () {
        console.log(this.name + ' was born on ' + this.planetOfBirth);
    }
};



// male
var Male = function (name) {
    this.gender = 'Male';
    this.name = 'Battler';
};
// inherits human
extendObj(Male, Human);

// female
var Female = function (name) {
    this.name = name;
    this.gender = 'Female';
};
// inherits human
extendObj(Female, Human);

// new instances
var battler = new Male('Battler');
var beatrice = new Female('Beatrice');



battler.sayGender(); // Battler says my gender is Male
beatrice.sayGender(); // Jane says my gender is Female