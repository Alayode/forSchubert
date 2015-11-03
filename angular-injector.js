//
//Chris  Kayode Samuel
//ksamuel.chris@me.com
//
//github: github.com/alayode




    //The angular injector service is used to retrieve an object instances as defined by the provider, and instantiates types, invoke
    // methods  and load modules.

    ///Example one From angularjs.org
    var $injector = angular.injector();
    expect($injector.get('$injector')).toBe($injector);
    expect($injector.invoke(function($injector) {
        return $injector;
    })).toBe($injector);


    //Example two from one of my projects

    //angular module name is alert drawer and the dependencies are alertService and ctaArrowLink
    angular.module('alertDrawer', ['alertsService','ctaArrowLink']).run(['$rootScope', function($rootScope){
            var statics = {};
            $rootScope.once = function(name, func){
                if(!(name in statics)){
                    statics[name] = _.once(func);
                }
                return statics[name];
            };
        }])
        .factory('AlertAPI', function() {
            return {
                type: null,
                index: null,
                currentAlert: function(currentAlert) {
                    this.type = currentAlert;
                },
                currentAlertIndex: function(index) {
                    this.index = index;
                },
                clear: function() {
                    this.type = null;
                    this.index = null;
                }
            };
        })
        //This is our directive called alertDrawer and has our link function
        .directive('alertDrawer', function() { return {
            restrict: 'EA',
            scope: {},
            transclude: true,
            replace: true,
            controller: 'AlertDrawerCtrl',
            templateUrl: '/parts/alert-drawer/alert-drawer.html',
            link: function(scope, elm, attrs, ctrl) {
                // no custom DOM logic at the moment
            }
        };})


