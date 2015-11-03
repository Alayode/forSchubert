
//
//Chris  Kayode Samuel
//ksamuel.chris@me.com
//
//github: github.com/alayode



// What are the levels of scope in JS????
    //global scope

     var  scope = " global scope"; // this si a global variable

    function checkscope(){
        //function scope Everthing in the function block is locally accessable to the function only!!!
        var scope = "local scope" // local variable

        // create a local variable!!
        var scope = "local scope" // a local variable
        function f(){ return scope;} // another local variable

        return f();  //Return the value in the scope here
    }



    //invoke the checkscope function
    console.log(checkscope());
    console.log(scope);


        