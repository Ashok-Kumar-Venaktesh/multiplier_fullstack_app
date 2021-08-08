var app = angular.module("myApp", []);
        app.controller("multiplierCtrl", function ($scope) {
            // to test in the localhost MySql
            
            
          
        })
        app.service('db_operation', function ($http) {
            this.getHistory = function (baseURI) {
              return $http({
                method: "GET",
                url: baseURI + '/getHistory'
              })
            }
        
            this.setData = function (baseURI, body) {
              return $http({
                method: "POST",
                url: baseURI + '/setData',
                data: body
              })
            }
        
          });
        app.directive("w3TestDirective", function () {
            return {
                restrict: "EA",
                templateUrl: "./multiplier.html",
                controller: function($scope, db_operation){
                    $scope.resultInvalid = true;
                    $scope.baseURI = 'http://localhost:5000';
                    $scope.message = 'welcome home';
                    $scope.num1 = 0;
                    $scope.num2 = 0;
                    $scope.onResultsClick = function(){
                        $scope.result =  $scope.num1*$scope.num2;
                        var body = {
                            "num1": $scope.num1,
                            "num2": $scope.num2,
                            "result": $scope.result,
                          }
                        db_operation.setData($scope.baseURI, body)
                    }
                    $scope.validateResultButton = function(){
                        if($scope.num1 <= -1 && $scope.num2 <= -1){
                            $scope.resultInvalid = true;
                        } else {
                            $scope.resultInvalid = false;
                        }
                    }
                    $scope.validateResultButton();
                    $scope.num1Change = function(){
                        if($scope.num1 <= -1){
                            $scope.num1Invalid = true;
                        }
                        $scope.validateResultButton();
                    }
                    $scope.num2Change = function(){
                        if($scope.num2 <= -1){
                            $scope.num2Invalid = true;
                        } 
                        $scope.validateResultButton();
                    }
                }
            };
        });
        app.directive("history", function () {
            return {
                restrict: "EA",
                templateUrl: "./history.html",
                controller: function($scope, db_operation){
                    $scope.baseURI = 'http://localhost:5000';
                    db_operation.getHistory($scope.baseURI).then(function(res){
                        let data = res.data;
                        console.log(data);
                        $scope.histNum1 = data.Number1;
                        $scope.histNum2 = data.Number2;
                        $scope.histResult = data.Result;
                    });
                }
            };
        });