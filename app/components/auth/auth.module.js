import angular from 'angular';
import uiRouter from 'angular-ui-router';
import satellizer from 'satellizer';
import {authRoutes} from './auth.routes';

export let AuthModule = angular.module('auth', [
  uiRouter,
  satellizer
])
.run(routeChange)
.config(authRoutes);

function routeChange($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeError', function (event) {
    if (event.currentScope) {
      $state.go('app.dashboard');
    }
  });
}

