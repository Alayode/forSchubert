

//
//Chris  Kayode Samuel
//ksamuel.chris@me.com
//
//github: github.com/alayode


//3. What is the difference between factory, service and provider in angularjs?

it

//
//Services are defined in the module object's API.
//
//#Provider(name, Object OR constructor() )
//A configurable service with complex creation logic. If you pass an Object,
//    it should have a function named $get that returns an instance of the service.
//    Without this object being passed a constructor that when called, creates the instance.
//
//


angular.module('authenticationHandler', [])

    // Intercept unauthenticated error responses
    .config([
        '$httpProvider',
        function ($httpProvider) {
            var interceptor = [
                '$rootScope',
                '$q',
                function ($rootScope, $q) {

                    function unauthenticated(response) {
                        return response.status === 401;
                    }

                    return function (promise) {
                        return promise.then(function (response) {
                            return response;
                        }, function (response) {
                            if (unauthenticated(response)) {
                                $rootScope.$broadcast('authenticationHandler:unauthenticated', response);
                            }
                            return $q.reject(response);
                        });
                    };

                }
            ];

            $httpProvider.responseInterceptors.push(interceptor);
        }
    ]);

//Status API Training Shop Blog About Pricing





//#Factory(name,$getFunction() )
//A non-configurable service with complex creation logic. You specify a function that,
//when called returns the service instance. You could think of this as provider(name, { $get: $getFunction() } ).


// Create a module to support our shopping views
var shoppingModule = angular.module('ShoppingModule');

// Set up service factory to create our items interface to the
// server-side database

shoppingModule.factory('Items',function(){
    var items = {};
    items.query = function(){
        // in real apps, we'd pull this data from the server...
        return[


            {
                title: 'Paint pots',
                description: "Pots full of paint",
                price: 3.95
            },
            {
                title: 'Kerosene can',
                description: "For when the paint is not needed",
                price: 23.95
            },
            {
                title: 'Pebbles',
                description: "used for superficial purposes only",
                price: 15.65
            }


        ];
    };

    return items;

});






//#Service(name, constructor() )
//A non-configurable service with simple creation logic. Like the constructor option with
//    provider. Angular calls it to create the service instance.
//
//


var myModule = angular.module('myModule', []);
myModule.factory('serviceId', function() {
    var shinyNewServiceInstance;
    // factory function body that constructs shinyNewServiceInstance
    return shinyNewServiceInstance;
});

