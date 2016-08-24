var app = angular.module('ticketSystemApp');

// Config of the application
app.config(['$stateProvider', '$urlRouterProvider', function(stateProvider, urlRouterProvider) {
    stateProvider.state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainController',
        restricted: false
    });

    urlRouterProvider.otherwise('/');
}]);

app.controller("MainController", ["$scope", "AuthModel", '$state', function($scope, auth, state) {
    function init() {
        $scope.credentials = {};
    }

    init ();

    $scope.login = function(credentials) {
        $scope.loading = true;

        auth.login(credentials.username, credentials.password)
            .then(function(success) {
                $scope.loading = false;
                state.go('dashboard');
            }, function (err) {
                console.log(err);
                $scope.loading = false;
            });
    };

    console.log("MainController loaded");
}]);