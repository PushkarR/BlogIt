var app=angular.module('myApp',['ngRoute']);

app.config(function($routeProvider, $locationProvider){
    Stamplay.init("blogitpushkar");
    localStorage.removeItem('https://blogit-pushkarraj.c9users.io-jwt');
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
    .when('/viewBlogs',{
        templateUrl: 'templates/viewBlogs.html',
        controller: "ViewBlogsCtrl"
    })
});

app.controller('HomeCtrl',function(){
});

app.controller('LoginCtrl',function($scope){
    $scope.login = function(){
        Stamplay.User.currentUser()
        .then(function(res){
            console.log(res);
            if(res.user){
                $timeout(function(){
                    $location.path("/viewBlogs");
                });    
            }
            else{
                Stamplay.User.login($scope.user)
                .then(function(res){
                    console.log("Logged in "+res);
                    $timeout(function() {
                        $location.path("/viewBlogs");
                    });
                },
                function(err){
                    console
                    .log(err);
                })
            }
        },
        function(error){
            console.log(error);
        });
    };
});

app.controller('SignUpCtrl',function($scope) {
    $scope.newUser = {};
    $scope.signup = function(){
        if($scope.newUser.firstName && $scope.newUser.lastName && $scope.newUser.email && $scope.newUser.password && $scope.newUser.confirmPassword){
            console.log("All fields valid!");
            if($scope.newUser.password == $scope.newUser.confirmPassword){
                console.log("All good!");
                Stamplay.User.signup($scope.newUser)
                .then(function(response){
                    console.log(response);
                }, 
                function(error){
                    console.log(error);
                });
            }
            else{
                console.log("Passwords do not match!");
            }
        }    
        else{
            console.log("Some fields invalid!");
        }    
    };
});

app.controller('ViewBlogsCtrl',function(){
    
});

app.controller('myCtrl',function($scope){
// 	$scope.message="Welcome to BlogIt!"
});