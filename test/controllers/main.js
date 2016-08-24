describe('MainController', function () {
    var scope, controller, state, authModel, d;

    // // Initialization of the AngularJS application before each test case
    // beforeEach(module('ticketSystemApp'));

    beforeEach(module('ticketSystemApp'));

    // Injection of dependencies
    beforeEach(inject(function ($rootScope, $controller, $state, AuthModel, $q) {
        scope = $rootScope;
        state = $state;
        authModel = AuthModel;
        d = $q.defer();
        controller = $controller('MainController', {
            "$scope" : scope
        });
    }));

    it('should exist', function () {
        expect(controller).toBeDefined();
    });

    it('should change state to dashboard', function () {
        var credentials = { 
            username: 'u',
            password: 'v'
        };

        spyOn(authModel, "login").and.returnValue(d.promise);
        spyOn(authModel, "isAuthenticated").and.returnValue(true);
        
        scope.login(credentials);
        d.resolve();
        scope.$apply();

        expect(scope.loading).toBe(false);
        expect(state.current.name).toBe('dashboard');
    });

    it('should not change state to dashboard', function () {
        var credentials = { 
            username: 'u',
            password: 'v'
        };

        spyOn(authModel, "login").and.returnValue(d.promise);
        spyOn(authModel, "isAuthenticated").and.returnValue(false);
        
        scope.login(credentials);
        d.reject();
        scope.$apply();

        expect(scope.loading).toBe(false);
        expect(state.current.name).toBe('main');
    });
});