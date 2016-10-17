export function AuthDecorator($provide) {
  'ngInject';
  
  $provide.decorator('$auth', function ($delegate, Env, $http, SweetAlert, $state, $q) {
    var checkAuth = $delegate.isAuthenticated,
      logout = $delegate.logout;

    $delegate.recoverPassword = function (email) {
      var opts = {};
      opts.url = Env.API_URL + '/auth/recover';
      opts.data = { email: email };
      opts.method = 'POST';
      return $http(opts);
    };

    $delegate.refreshToken = function (token) {
      var opts = {};
      opts.url = Env.API_URL + '/auth/token/refresh';
      opts.data = { token: token };
      opts.method = 'POST';
      return $http(opts).then(function (response) {
        $delegate.setToken(response.data.token);
        return $delegate.getToken();
      });
    };

    $delegate.isAuthenticated = function () {
      var token = $delegate.getToken();
      var isAuthenticated = checkAuth();
      if (!token)
        return isAuthenticated;
      if (!isAuthenticated) {
        return $delegate.refreshToken(token).then(function () {
          isAuthenticated = checkAuth();
          return isAuthenticated;
        });
      }
      return isAuthenticated;
    };

    $delegate.resetPassword = function (data) {
      var opts = {};
      opts.url = Env.API_URL + '/auth/reset';
      opts.data = data;
      opts.method = 'POST';
      return $http(opts);
    };

    $delegate.activate = function (id, code) {
      var opts = {};
      opts.url = Env.API_URL + '/auth/activate/' + id + '/' + code;
      opts.method = 'GET';

      return $http(opts).then(function (response) {
        $delegate.setToken(response.data.token);
      }, function (response) {
        return response;
      });
    };

    $delegate.getUser = function () {
      if (!$delegate.user) {
        var config = {
          params: {
            include: 'company'
          }
        };
        $delegate.user = $http.get(Env.API_URL + '/auth/profile', config)
          .then(function (response) {
            $delegate.user = response.data.data;
            return response.data.data;
          })
        return $delegate.user;
      }
      return $q.resolve($delegate.user);
    };

    $delegate.updateUser = function () {
      var config = {
        params: {
          include: 'company'
        }
      };
      $delegate.user = $http.get(Env.API_URL + '/auth/profile', config).then(function (response) {
        return response.data.data;
      });
      return $delegate.user;
    };

    $delegate.confirmPermission = function (permission) {
      return $delegate.getUser().then(function (user) {
        if (user.permissions[permission]) {
          return user;
        }
        SweetAlert.error('You are not permitted to perform this task');
        $state.go('app.dashboard');
        return $q.reject('Not permitted');
      }, function () {
        SweetAlert.error('You must be logged in to perform this task');
        $state.go('auth.login');
        return $q.reject('Not loggedin');
      })
    };

    $delegate.logout = function () {
      return logout().then(function () {
        $delegate.user = undefined;
      });
    };

    return $delegate;
  });
}