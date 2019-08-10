var app = angular.module("abcApp", []);

app.controller('abcCtrl', function($scope, $http) {
  $scope.title = "";
  $scope.details = "";

  function view() {
    var config = {
      method : "POST",
      url : "connection.php",
      data: {
        "fun" : "view",
      }
    }

    var request = $http(config);

    request.then(function mySuccess(response) {
      console.log(response.data);
      $scope.blogList = response.data;
    }, function myError(response) {
      alert("Try again later");
    });
  }

  view();



  $scope.submit = function () {
    if ($scope.title == "" || $scope.details == "") {
      $scope.error = "Please fill the following details.";
    }else{
      $scope.error = "";


      var config = {
        method : "POST",
        url : "connection.php",
        data: {
          "fun" : "sub",
          "title": $scope.title,
          "details" : $scope.details
        }
      }

      var request = $http(config);

      request.then(function mySuccess(response) {
        console.log(response.data);
        $scope.title = "";
        $scope.details = "";
        view();


      }, function myError(response) {
        alert("Try again later");
      });



    }
  }


  $scope.textChange = function () {
    if ($scope.title == "" || $scope.details == "") {
      $scope.error = "Please fill the following details.";
    }else{
      $scope.error = "";
    }
  }


  $scope.del = function (index) {
    var id = $scope.blogList[index].id;
    var config = {
      method : "POST",
      url : "connection.php",
      data: {
        "fun" : "del",
        "id" : id
      }
    }

    var request = $http(config);

    request.then(function mySuccess(response) {
      console.log(response.data);
      view();
    }, function myError(response) {
      alert("Try again later");
    });
  }

});
