var dashboard = angular.module("DashboardModel", [
    'AuthModel'
]);

dashboard.factory("dashboardModel", ['AuthModel', '$q',
    function (auth, $q) {
        function logout() {
            var d = $q.defer();

            auth.logout().then(function (success) {
                d.resolve();
            }, function (err) {
                d.reject();
            });

            return d.promise;
        }

        return {
            logout: logout
        };
    }]);
