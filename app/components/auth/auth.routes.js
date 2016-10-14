import { ActivationController } from './activation/activation.controller';
import { AuthController } from './auth.controller';
import { ResetController } from './reset/reset.controller';
import { LogoutController } from './logout/logout.controller';

export function authRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('auth', {
      templateUrl: 'auth/views/auth.tpl.html',
      data: {
        bodyClass: 'page-auth'
      },
      resolve: {
        skipIfLoggedIn: skipIfLoggedIn
      }
    })
    .state('auth.login', {
      url: '/auth/login',
      templateUrl: 'auth/views/login.tpl.html',
      controller: AuthController,
      controllerAs: 'auth',
      data: {
        pageTitle: 'Auth Login'
      }
    })
    .state('auth.register', {
      url: '/auth/register',
      templateUrl: 'auth/views/register.tpl.html',
      controller: AuthController,
      controllerAs: 'auth',
      data: {
        pageTitle: 'Auth Register'
      }
    })
    .state('activate', {
      url: '/auth/activate/{id}/{code}',
      controller: ActivationController,
      controllerAs: 'auth'
    })
    .state('auth.forgot', {
      url: '/auth/forgot',
      templateUrl: 'auth/views/forgot.tpl.html',
      controller: AuthController,
      controllerAs: 'auth',
      data: {
        pageTitle: 'Forgot Password'
      }
    })
    .state('auth.reset', {
      url: '/auth/reset/{id}/{code}',
      templateUrl: 'auth/views/reset.tpl.html',
      controller: ResetController,
      controllerAs: 'auth',
      data: {
        pageTitle: 'Reset Password'
      }
    })
    .state('app.logout', {
      url: '/auth/logout',
      controller: LogoutController,
      controllerAs: 'logout'
    });

  function skipIfLoggedIn($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }
}