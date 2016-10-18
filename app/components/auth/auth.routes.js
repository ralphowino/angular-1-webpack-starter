import { ActivationController } from './activation/activation.controller';
import { AuthController } from './auth.controller';
import { ResetController } from './reset/reset.controller';
import { LogoutController } from './logout/logout.controller';

export function authRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('auth', {
      templateUrl: 'components/auth/views/auth.html',
      data: {
        bodyClass: 'page-auth'
      },
      // resolve: {
      //   skipIfLoggedIn: skipIfLoggedIn
      // }
    })
    .state('auth.login', {
      url: '/auth/login',
      templateUrl: 'components/auth/views/login.html',
      controller: AuthController,
      controllerAs: 'auth',
      data: {
        pageTitle: 'Auth Login'
      }
    })
    .state('auth.register', {
      url: '/auth/register',
      templateUrl: 'components/auth/views/register.html',
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
      templateUrl: 'components/auth/views/forgot.html',
      controller: AuthController,
      controllerAs: 'auth',
      data: {
        pageTitle: 'Forgot Password'
      }
    })
    .state('auth.reset', {
      url: '/auth/reset/{id}/{code}',
      templateUrl: '/components/auth/views/reset.html',
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