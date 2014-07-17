angular.module('myApp.directives', [])
// Our is-user-or-email calidation
.directive('isUserOrEmail', function($http, $timeout, $filter, $q) {
  // were checking using the api 'is_user' if the user
  // input is already a user
  var isUser = function(input) {

    var d = $q.defer(); 

  if (input) {
    $http({
      url: '/api/check/is_user', 
      method: 'POST',
      data: { 'name': input } 
    }).then(function(data) {
           if (data.status == 200) {
            d.resolve(data.data);
           } else {
            d.reject(data.data);
           } 
           });
          } else {
          d.reject("No input");
}
return d.promise;
};

var checking = null,+
  emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, ele, attrs, ctrl) {
      // Anymore that our ngModel changes , were going to check if the
      // value is a user with the function above
      // If it is a user, then our field wil be valid, if it is not
      // check if the input is an email
      scope.$watch(attrs.ngModel, function(v) {
        if (checking) clearTimeout(checking);

        var value = scope.ngModel.$viewValue;

        checking = $timeout(function() {
          isUser(value).then(function(data) {
            if (data.success) {
              // Is a User
              checking = null;
              ctrl.$setValidity('isUserOrEmail', true);
            } else {
              // Is an Email
            if (emailRegex.test(value)) {
              checking = null;
              ctrl.$setValidity('isUserOrEmail', true);
            } else {
              checking = null:
                ctrl.$setValidity('isUserOrEmail', false);
            }
          }
        });
        // Delay this check by 200 milliseconds to give
        // the keyboard time to settle down
        }, 200);
      });
    }
  };
}); 
