var app=angular.module('myApp',[]);

app.config(function(){
    Stamplay.init("blogitpushkar")
})

app.controller('myCtrl',function($scope){
	$scope.message="Welcome to BlogIt!"
})