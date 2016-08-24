var moq = angular.module("moqService", []);

moq.service("moqService", ["$q", function($q) {
    // MOQ a successfull async call 
    this.successfulAsyncCall = function(time, data) {
        var d = $q.defer();

        setTimeout(function() {
            d.resolve(data);
        }, time);
        return d.promise;
    };

    // MOQ an unsuccessfull async call
    this.unsuccessfulAsyncCall = function(time, data) {
        var d = $q.defer();

        setTimeout(function() {
            d.reject(data);
        }, time);
        return d.promise;
    };
}]);