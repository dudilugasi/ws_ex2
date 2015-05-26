var booksApp = angular.module("booksApp",[]);

var model = {};

booksApp.run(function($http){
    $http.get("https://ws-ex1-dudi.herokuapp.com/textbooks").success(function(data){
        model.items = data.textbooks;
    });
});

booksApp.controller('booksCtrl',function($scope,$http){
    $scope.books = model;

    $scope.error = "";

    $scope.header = "first function - all the books";

    $scope.getBookByISBN = function(actionText){
        if(isNaN(actionText) || 0 === actionText.length){
            $scope.error = "Please Enter A Valid ISBN";
        }
        else {
            $scope.error = "";
            $http.get("https://ws-ex1-dudi.herokuapp.com/ISBN/" + actionText).success(function (data) {
                $scope.header = "second function - book by ISBN";
                $scope.books.items = [data.textbooks];
                console.log("books returned: " + JSON.stringify($scope.books.items));
                if (data.textbooks == null) {
                    $scope.error = "No Books Were Found!";
                }
            });
        }
    };

    $scope.getBooksByPublisher = function(actionText){
        console.log(actionText);
        if (!actionText || 0 === actionText.length) {
            $scope.error = "Please Enter A Publisher Name";
        }
        else {
            $scope.error = "";
            $http.get("https://ws-ex1-dudi.herokuapp.com/publisher/" + actionText).success(function(data){
                $scope.header = "third function - book by publisher";
                $scope.books.items = data.textbooks;
                console.log("books returned: " + JSON.stringify($scope.books.items));
                if (data.textbooks == 0) {
                    $scope.error = "No Books Were Found!";
                }
            });
        }
    };
});