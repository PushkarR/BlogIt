var app=angular.module('myApp',['ui.router','ngToast']);

app.run(function($rootScope){
    Stamplay.User.currentUser()
    .then(function(res){
       if(res.user){
           $rootScope.loggedIn = true;
           console.log($rootScope.loggedIn);
       }
       else{
           $rootScope.loggedIn = false;
           console.log($rootScope.loggedIn);
       }
    },
    function(err){
        console.log("An error occurred while getting current user!");
    });
});

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

app.controller('LoginCtrl', function($scope, $state, $timeout, $rootScope, ngToast){
    $scope.login = function(){
        Stamplay.User.currentUser()
        .then(function(res){
            console.log(res);
            if(res.user){
                $rootScope.loggedIn = true;
                $rootScope.displayName = res.user.firstName+" "+res.user.lastName;
                $timeout(function(){
                    $state.go('MyBlogs');
                });    
            }
            else{
                Stamplay.User.login($scope.user)
                .then(function(res){
                    console.log("Logged in "+res);
                    $timeout(function() {
                        ngToast.create("Logged in successfully!");
                    });
                    $rootScope.loggedIn = true;
                    $rootScope.displayName = res.user.firstName+" "+res.user.lastName;
                    $timeout(function(){
                        $state.go('MyBlogs');
                    });
                },
                function(err){
                    console.log(err);
                    $rootScope.loggedIn = false;
                    $timeout(function() {
                        ngToast("Login failed!");
                    });
                })
            }
        },
        function(error){
            $timeout(function() {
                ngToast.create("An error has occurred. Please try again!");
            });
            console.log(error);
        });
    };
});

app.controller('SignUpCtrl', function($scope, $timeout, ngToast) {
    $scope.newUser = {};
    $scope.signup = function(){
        if($scope.newUser.firstName && $scope.newUser.lastName && $scope.newUser.email && $scope.newUser.password && $scope.newUser.confirmPassword){
            console.log("All fields valid!");
            if($scope.newUser.password == $scope.newUser.confirmPassword){
                console.log("All good!");
                Stamplay.User.signup($scope.newUser)
                .then(function(response){
                    $timeout(function() {
                        ngToast.create("Your account has been successfully created! Please login.");
                    });    
                    console.log(response);
                }, 
                function(error){
                    $timeout(function() {
                        ngToast.create("An error has occurred. Please try again!");
                    });    
                    console.log(error);
                });
            }
            else{
                $timeout(function() {
                    ngToast.create("Passwords do not match!");
                });    
                console.log("Passwords do not match!");
            }
        }    
        else{
            $timeout(function() {
                ngToast.create("Some fields are invalid!");
            });    
            console.log("Some fields invalid!");
        }    
    };
});

app.controller('MyBlogsCtrl', function($scope) {
    
});

app.controller('MainCtrl', function($scope, $rootScope, $timeout, ngToast){
    $scope.logout = function(){
        console.log("Logout called");
        //localStorage.removeItem('https://blogit-pushkarraj.c9users.io-jwt');
        Stamplay.User.logout(true, function(){
            console.log("Logged out!");
            $timeout(function(){
                $rootScope.loggedIn = false;
            })
        })
        $timeout(function() {
            ngToast.create("Logged out successfully!");
        });
    };
});