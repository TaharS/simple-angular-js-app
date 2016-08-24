angular.module('htmlTemplate', ['views/dashboard.html', 'views/main.html']);

angular.module("views/dashboard.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/dashboard.html",
    "<h1>Dashboard</h1>\n" +
    "<input type=\"button\" ng-click=\"logout()\" value=\"Logout\"/>");
}]);

angular.module("views/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/main.html",
    "<form>\n" +
    "    <label>Email/Username</label><input type=\"text\" ng-model=\"credentials.email\" /><br />\n" +
    "    <label>Password</label><input type=\"password\" ng-model=\"credentials.pwd\" /><br />\n" +
    "    <input type=\"submit\" ng-click=\"login(credentials)\" value=\"Login\" />\n" +
    "</form>");
}]);
