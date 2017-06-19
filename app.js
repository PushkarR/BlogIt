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

app.controller('SignUpCtrl',function() {
})

app.controller('myCtrl',function($scope){
// 	$scope.message="Welcome to BlogIt!"
})