angular.module('starter.controllers', ['ionic'])


/**
* 
* @autthor: Rommel A. Suarez
* @description: This code contains the controller of the front end.
*               This is where we call the service layer that calls the
*                REST API      
*/
.controller('CustomerCtrl', function($scope, $stateParams, $ionicPopup, CustomerService) {
   
    $scope.responseMessage = {};
    
    // Populate the list UI with customer info
    CustomerService.getAllCustomers(function(response){
       $scope.customers = response.data;
    });

    // Retrieve the customer info of the selected customer on the list
    CustomerService.getCustomer($stateParams.id,function(response){
       $scope.formData = response.data[0];
    });
  
    // function that collects the customer info add creates a new customer
    $scope.addCustomer = function() {

  
     CustomerService.addCustomer($scope.formData,function(data){
           $scope.formData = {}
           $scope.responseMessage = data;
           
           var title='Add new Record'
           var message ='Record Saved Successfully'
           if (data.messageCode != '1'){
              message = data.message;
           } 

           $ionicPopup.alert({
              title: title,
              template: message
           });
      });

    }; 

   // function that collects the customer info add edit an existing customer
   $scope.editCustomer = function() {
     CustomerService.editCustomer($scope.formData,function(data){
           $scope.formData = {}
           $scope.responseMessage = data;

           var title='Edit Record'
           var message ='Record Saved Successfully'
           if (data.messageCode != '1'){
              message = data.message;
           } 

           $ionicPopup.alert({
              title: title,
              template: message
           });
      });
  };

 // function that deletes an existing customer
  $scope.deleteCustomer = function() {
   CustomerService.deleteCustomer($scope.formData.id,function(data){
           $scope.formData = {}
           $scope.responseMessage = data;
           
           var title='Delete Record'
           var message ='Record Deleted Successfully'
           if (data.messageCode != '1'){
              message = data.message;
           } 

           $ionicPopup.alert({
              title: title,
              template: message
           });
    });
  };
   
  
  this.showAlert = function (title,message) {
    $ionicPopup.alert({
              title: title,
              template: message
           });
  }

  $scope.doRefresh = function () {
    
   CustomerService.getAllCustomers(function(response){
       $scope.customers = response.data;
       $scope.$broadcast('scroll.refreshComplete');
    });
  }

})

