var dashboard = angular.module('DashboardModel');

dashboard.config(["$stateProvider", function (stateProvider) {
    stateProvider.state("dashboard", {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardController',
        restricted: true
    });
}]);

dashboard.controller("dashboardController", [
    '$scope', 'dashboardModel', '$state',
    function ($scope, dashboard, state) {
        $scope.logout = function () {
            $scope.loading = true;
            dashboard.logout().then(function (success) {
                $scope.loading = false;
                state.go('main');
            }, function (err) {

            });
        };
    }]);