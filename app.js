var app=angular.module('myApp',['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    Stamplay.init("blogitpushkar");
    
    $locationProvider.hashPrefix('');
    
    $routeProvider
    .when('/',{
        templateUrl: 'templates/home.html',
        controller: "HomeCtrl"
    })
    .when('/login',{
        templateUrl: 'templates/login.html',
        controller: "LoginCtrl"
    })
    .when('/signup',{
        templateUrl: 'templates/signup.html',
        controller: "SignUpCtrl"
    })
})

app.controller('HomeCtrl',function(){
})

app.controller('LoginCtrl',function(){
})

app.controller('SignUpCtrl',function($scope) {
    $scope.newUser = {};
    $scope.signup = function(){
        if($scope.newUser.firstName && $scope.newUser.lastName && $scope.newUser.email && $scope.newUser.password && $scope.newUser.confirmPassword){
            console.log("All fields valid!");
            if($scope.newUser.password == $scope.newUser.confirmPassword){
                console.log("All good!");
            }
            else{
                console.log("Passwords do not match!");
            }
        }    
        else{
            console.log("Some fields invalid!");
        }    
    };
})

app.controller('myCtrl',function($scope){
// 	$scope.message="Welcome to BlogIt!"
})