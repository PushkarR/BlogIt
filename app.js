var app=angular.module('myApp',['ui.router']);

app.config(function($stateProvider, $locationProvider, $urlRouterProvider){
    Stamplay.init("blogitpushkar");
    localStorage.removeItem('https://blogit-pushkarraj.c9users.io-jwt');
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: "HomeCtrl"
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: "LoginCtrl"
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'templates/signup.html',
            controller: "SignUpCtrl"
        })
        .state('MyBlogs', {
            url: '/myBlogs',
            templateUrl: 'templates/myBlogs.html',
            controller: "MyBlogsCtrl"
        });
    $urlRouterProvider.otherwise("/");
});

app.controller('HomeCtrl', function(){
});

app.controller('LoginCtrl', function($scope){
    $scope.login = function(){
        Stamplay.User.currentUser()
        .then(function(res){
            console.log(res);
            if(res.user){
                $timeout(function(){
                    $location.path("/myBlogs");
                });    
            }
            else{
                Stamplay.User.login($scope.user)
                .then(function(res){
                    console.log("Logged in "+res);
                    $timeout(function() {
                        $location.path("/myBlogs");
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

app.controller('SignUpCtrl', function($scope) {
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

app.controller('MyBlogsCtrl', function() {
    
})

app.controller('myCtrl',function($scope){
// 	$scope.message="Welcome to BlogIt!"
});