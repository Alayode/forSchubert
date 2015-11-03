//Chris Samuel
//ksamuel.chris@icloud.com
//
// Is JavaScript single threaded or multithreaded??
//




//  JavaScript is known to be single thread in all modern browser implementations,
//  but that is specified in most standard textbooks explanations.
//  We would us something like nodeJS to work on developing new strategies to get the most out of our
//  JavaScript applications!!!





// An Example of how you would write a program with a single thread HTTP monitor!!!

//This is something you would use in NodeJS a powerful server side application for writing in JS
// for single thread programming models


//    NodeJS Approach

            function ping (host, callback){
                //lets get the http request here
                // when finish do a callback
                callback(status);
            }

            function query_host (host){
                ping(host, function(status){
                    //.. do something like save the status updates in  the database or get new date blah blah....
                    setTimeout (query_host(host), 2000)//this is for the next ping to occur in the next predefined interval
                })
}
//main
foreach(var host in list_of_hosts)
{
    setTimeout (query_host(host), 2000) //queue job. Every 2 seconds, query_host will be called.
}
