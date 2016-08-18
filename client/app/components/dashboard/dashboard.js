import angular from 'angular';
import uiRouter from 'angular-ui-router';
import dashboardComponent from './dashboard.component';

let dashboardModule = angular.module('dashboard', [
  uiRouter
])

    .config(($stateProvider, $urlRouterProvider) => {
    "ngInject";

$urlRouterProvider.otherwise('/');

$stateProvider
  .state('app.dashboard', {
    url: '/dashboard',
    template: '<dashboard></dashboard>'
  });
})
.component('dashboard', dashboardComponent);

export default dashboardModule;
