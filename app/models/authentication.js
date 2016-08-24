var auth = angular.module('AuthModel', [
    'moqService'
]);

auth.factory("AuthModel", ['moqService', function (moq) {
    var logged = false;

    var data = {
        message: "Successful action"
    };

    function login(username, password) { logged = true; return moq.successfulAsyncCall(500, data); }
    function logout(token) { logged = false; return moq.successfulAsyncCall(500, data); }
    function isAuthenticated() { return logged; }

    return {
        login: login,
        logout: logout,
        isAuthenticated: isAuthenticated
    };
}]);