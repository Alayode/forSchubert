/*
* Chris Samuel
* ksamuel.chris@icloud.com
*
*
* */





//4. what is a directive and why it is used?

/**
 *With Directives you can extend HTML to add declarative syntax to do whatever
 you like. By Doing so, you can replace generic , <div> and <span> with elements and attributes
 that actually mean something specific to the application. The ones that come with angular
 provide basic functionality, but you can create your own to do things specific to you application.
 **/

<div ng-app="" ng-init="firstName='John'">

    <p>Name: <input type="text" ng-model="firstName"></p>
    <p>You wrote: {{ firstName }}</p>

</div>

    //when angular is bootsrapped all of the DOM elements are overwritten and turned into angular directives
    // This is how angular can be so powerful cause now you have full control with in the application.
    //as far as you use the ng-app OR create a directive on the angular module.