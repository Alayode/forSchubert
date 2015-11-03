
/*
 * Chris Samuel
 * ksamuel.chris@icloud.com
 *
 *
 * */





// 6. What are angular modules?

        //
        //An AngularJS module defines an application.
        //    The module is a container for the different parts of an application.
        //    The module is a container for the application controllers.
        //    Controllers always belong to a module.



// a module with one controller

var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";



    // a module with a directive
    angular.module('dropdowns', [
            'clickout',
            'ngSanitize',
            'toggle',
            'sheet',
            'if',
            'isViewportSize',
            'transcludeTemplates'
        ])

        .directive('dropdownSimple', [
            '$compile', '$parse', '$rootScope', 'transcludeTemplates',
            function($compile, $parse, $rootScope, transcludeTemplates) {

                return {
                    restrict    : 'EA',
                    require     : ['toggle', '?ngModel'],
                    scope       : true,
                    transclude  : 'element',
                    replace     : true,
                    templateUrl : '/parts/dropdown-simple/dropdown-simple-template.html',
                    compile     : function(tElement, tAttrs, transclude) {

                        transclude($rootScope, function(transcludeEl) { // transcludeEl = 'clone'

                            transcludeTemplates(tElement, transcludeEl);

                            if (transcludeEl.hasContent()) {
                                tElement.find('.text-truncate').removeClass('text-truncate').children().addClass('text-truncate');
                            }

                        });

                        return function postLink(scope, element, attrs, controllers) {
                            console.log("attrs "+attrs);
                            var toggleController  = controllers[0];
                            var ngModelController = controllers[1];
                            var selectedOptions = [];
                            var dropdown = {
                                mobileDatePickerDates:element.is(".mobileDatePickerDates"),
                                mobileDatePickerTimes:element.is(".mobileDatePickerTimes"),
                                currentOption: null,
                                disableOptionMobileDatePicker:0,
                                inSheetAccordion: element.closest(".sheet").length > 0 && element.is(".dropdown--accordion"),
                                selectOptionByIndex: function(index) {
                                    selectOption(dropdown.options[index]);
                                },
                                selectOptionByValue: function(value) {
                                    if (dropdown.isMultiple && _.isArray(value)) {
                                        selectOption(value);
                                    } else {
                                        selectOption(_.find(dropdown.options, {value: value}));
                                    }
                                },
                                options: [],
                                loadOptions: function(newOptions) {

                                    dropdown.clearOptions();
                                    _.each(newOptions, dropdown.appendOption);
                                    dropdown.addPlaceholderAttribute();

                                    if (ngModelController && ngModelController.$modelValue) {
                                        dropdown.selectOptionByValue(ngModelController.$modelValue);
                                    } else {
                                        dropdown.selectOptionByIndex(0);
                                    }
                                },
                                clearOptions: function() {
                                    dropdown.options = [];
                                },
                                appendOption: function() {
                                    dropdown.options.push(dropdown.formatOption.apply(null, arguments));
                                },
                                prependOption: function() {
                                    dropdown.options.unshift(dropdown.formatOption.apply(null, arguments));
                                },
                                formatOption: function(label, value) {
                                    return isOption(label) ? label : {label:label, value:value};
                                    function isOption(label) {
                                        return _(label).isPlainObject() && _(label).has('value') && _(label).has('label');
                                    }
                                },

                                isSelected: function(option) {
                                    return _.contains(selectedOptions, option);
                                },

                                valueIsEmpty: function(option) {
                                    return typeof option.value === null || typeof option.value === "";
                                },

                                addPlaceholderAttribute: function() {
                                    if (attrs.placeholder) {
                                        dropdown.prependOption(attrs.placeholder, '');
                                    }
                                },

                                // UI
                                maybeToggle: function(){
                                    if (! dropdown.isMultiple && ! dropdown.isAccordion) {
                                        dropdown.toggle();
                                    }
                                },
                                toggle: function(toState) {
                                    toggleController.toggle(toState);
                                },

                                isOpen: false,
                                isDisabled: false,
                                isAlwaysPlaceholder: false,
                                isMultiple: false,
                                isAccordion: element.is(".dropdown--accordion")
                            };

                            if (_.has(attrs,'alwaysPlaceholder')) {
                                scope.$watch($parse(attrs.alwaysPlaceholder), function(isAlwaysPlaceholder){
                                    dropdown.isAlwaysPlaceholder = Boolean(isAlwaysPlaceholder);
                                });
                            }

                            if (_.has(attrs,'multiple')) {
                                scope.$watch($parse(attrs.multiple), function(isMultiple){
                                    dropdown.isMultiple = Boolean(isMultiple);
                                    if (dropdown.isMultiple) {
                                        registerMultipleWatch();
                                    }
                                    element.toggleClass("dropdown--multiple", dropdown.isMultiple);
                                });
                            }

                            if (_.has(attrs,'disabled')) {
                                scope.$watch($parse(attrs.disabled), function(isDisabled){
                                    dropdown.isDisabled = Boolean(isDisabled);
                                });
                            }

                            scope.$watch(attrs.toggle, function(newState) {
                                $(document).ready(function() {
                                    $('.js-add-ddfix .sheet__body').height = $(window).height();
                                });
                            });

                            function registerMultipleWatch() {
                                var lastView;
                                // Stolen from angular's select directive
                                // we have to do it on each watch since ngModel watches reference, but
                                // we need to work of an array, so we need to see if anything was inserted/removed
                                scope.$watch(function selectMultipleWatch() {
                                    if (! angular.equals(lastView, ngModelController.$viewValue)) {
                                        lastView = angular.copy(ngModelController.$viewValue);
                                        ngModelController.$render();
                                    }
                                });
                            }

                            dropdown.addPlaceholderAttribute();
                            dropdown.selectOptionByIndex(0);

                            if (_.has(attrs,'options')) {
                                scope.$watch(attrs.options, function(newOptions) {
                                    if (newOptions) {
                                        dropdown.loadOptions(newOptions);
                                    } else {
                                        //console.log('$watch attrs.options, newOptions = null');
                                        dropdown.clearOptions();
                                    }
                                }, true);
                            }


                            //  Update view when model changes

                            if (ngModelController) {
                                ngModelController.$render = function() {
                                    dropdown.selectOptionByValue(ngModelController.$modelValue);
                                };
                            }

                            // @api private

                            function selectOption(option) {
                                var value, found, oldViewValue;

                                if (dropdown.isMultiple) {
                                    if (dropdown.options.length === 0) {
                                        return; // If $render is called before options are loaded
                                    }
                                    if (angular.isArray(option)) {
                                        // Setting the entire value
                                        value = option;
                                        selectedOptions = _.map(value, function(v){
                                            return _.find(dropdown.options, {value: v});
                                        });
                                    } else {
                                        // Toggling a particular option
                                        if (option.value === null || (angular.isString(option.value) && option.value === "")) {
                                            selectedOptions = [];
                                        } else if ((found = _.findIndex(selectedOptions, option)) !== -1) { // If it is already selected
                                            selectedOptions.splice(found, 1); // Remove it
                                        } else {
                                            selectedOptions.push(option);
                                        }
                                    }
                                    if (selectedOptions.length === 1) {
                                        dropdown.currentOption = selectedOptions[0];
                                    } else if (selectedOptions.length > 1) {
                                        dropdown.currentOption = {label: selectedOptions.length + " selected"};
                                        selectedOptions = _.sortBy(selectedOptions, function(o){ // Place in same order as options
                                            return _.indexOf(dropdown.options, _.find(dropdown.options, o));
                                        });
                                    } else {
                                        dropdown.currentOption = _.find(dropdown.options, function(o){
                                            return o.value === null || o.value === "";
                                        });
                                    }
                                    if (dropdown.isAlwaysPlaceholder) {
                                        dropdown.currentOption = _.find(dropdown.options, function(o){
                                            return o.value === null || o.value === "";
                                        });
                                    }
                                    if (selectedOptions.length === 0 && angular.isArray(value)) {
                                        value.length = 0;
                                    } else {
                                        value = _.map(selectedOptions, function(option){
                                            return option.value;
                                        });
                                    }
                                    if (ngModelController) {
                                        if (angular.isArray(ngModelController.$viewValue)) {
                                            oldViewValue = ngModelController.$viewValue;
                                            oldViewValue.length = 0;
                                            _.each(value, function(o) {
                                                oldViewValue.push(o);
                                            });
                                            ngModelController.$setViewValue(oldViewValue);
                                        } else {
                                            ngModelController.$setViewValue(value);
                                        }
                                    }
                                } else {
                                    // Single dropdown
                                    if (option) {
                                        if (dropdown.isAlwaysPlaceholder) {
                                            dropdown.currentOption = _.find(dropdown.options, function(o){
                                                return o.value === null || o.value === "";
                                            });
                                        } else {
                                            dropdown.currentOption = option;
                                            if(dropdown.mobileDatePickerTimes){
                                                $rootScope.fallDST = option.fallDST;
                                                if($rootScope.timeIndexLimit===11){
                                                    dropdown.disableOptionMobileDatePicker = ($rootScope.todaysTimeIndex)-4;
                                                }
                                                //$rootScope.timeIndexLimit=11;
                                                if($rootScope.springDSTMobile && !$rootScope.mobileDatePickerMeridianChangeToPM){
                                                    if(dropdown.options.length===24){
                                                        dropdown.options.splice(4,2);
                                                    }
                                                    $rootScope.timeIndexLimit=10;
                                                    dropdown.disableOptionMobileDatePicker = ($rootScope.todaysTimeIndex)-6;
                                                    $rootScope.springDSTMobile=false;
                                                }
                                                if($rootScope.fallDSTMobile && !$rootScope.mobileDatePickerMeridianChangeToPM){
                                                    if(dropdown.options.length===24){
                                                        dropdown.options.splice(4,0,{'value':'1:00','label':'1:00'},{'value':'1:30','label':'1:30'});
                                                    }
                                                    $rootScope.timeIndexLimit=12;
                                                    dropdown.disableOptionMobileDatePicker = ($rootScope.todaysTimeIndex)-2;
                                                    $rootScope.fallDSTMobile=false;
                                                }
                                            }
                                            if(dropdown.mobileDatePickerDates){
                                                if((_.findIndex(dropdown.options, option))!==0){
                                                    $rootScope.mobileDatePickerDateChanged = true;
                                                }else{
                                                    $rootScope.mobileDatePickerDateChanged = false;
                                                }
                                            }
                                        }

                                        selectedOptions = [option];
                                        if (ngModelController) {
                                            ngModelController.$setViewValue(option.value);
                                        }
                                    }
                                }
                            }


                            scope.dropdown = dropdown;
                            // TODO disable outer-scroll http://jsfiddle.net/mrtsherman/eXQf3/33/
                        }; // link function
                    } // compile function

                };}]);

    var sheetHeight = $('.js-add-ddfix .sheet__body').height() + $('.js-add-ddfix .sheet__head').height();
    var windowHeight = $(window).height();

    $('.dropdown').click(function(){
        $('.js-add-ddfix').height = windowHeight;
    });




