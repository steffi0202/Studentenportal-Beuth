var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', ['$scope','$http',function($scope, $http){
 console.log('Hello world from controller');
 
 //Refresh-Funktion, damit alles automatisch geladen wird und man den Browser nicht aktualisieren muss
 var refresh = function(){
	 $http({
	  method: 'GET',
	  url: '/beuthportal'
	 }).then(function successCallback(response){
	  console.log("I got the data I requested");
	  $scope.contactlist = response.data;
	 }, function errorCallback(response){
		//content error
	 });
 };
 refresh();
	
	//Neuen Kontakt anlegen
	$scope.addContact = function() {
    console.log($scope.contact);
	
	$scope.contact._id="";
	
    $http({
          method: 'POST',
          url: '/beuthportal',
          data: $scope.contact
        }).then(function successCallback(response) {			
          $scope.contact = {}; //Clear input box
		  refresh();
          console.log('POST Response: '+ response.statusText);         
		}, function errorCallback(response){
			
		});
	};﻿
	
	//Eintrag löschen
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/beuthportal/' + id).then(function successCallback(response){
			refresh();
		}, function errorCallback(response){});		
	};
	
	//Bearbeiten
	$scope.edit = function(id){
		console.log(id);
		$http.get('/beuthportal/' + id).then(function successCallback(response){
			$scope.contact = response.data;
		}, function errorCallback(response){});
	};
	
	//Datensatz nach Bearbeitung updaten
	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/beuthportal/' + $scope.contact._id, $scope.contact).then(function successCallback(response){
			refresh();
		}, function errorCallback(response){});
	};
	
}])﻿