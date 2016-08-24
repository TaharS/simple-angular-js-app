var app = angular.module('ticketSystemApp', [
    'ui.router',
    "AuthModel",
    "DashboardModel",
    'htmlTemplate']);

app.run(['$rootScope', 'AuthModel', '$state', function(rootScope, auth, state) {
    rootScope.$on('$stateChangeStart', function(e, next, current) {
        // Checking authenticated user to a restricted page.
        if (next.restricted && !auth.isAuthenticated()) {
            console.log("Can't access route " + next.name);
            e.preventDefault();
            state.go('main');
        }
    });
}]);