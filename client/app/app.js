import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';

angular.module('app', [
    uiRouter,
    Common.name,
    Components.name
  ])
  .config(($locationProvider, $stateProvider) => {
    "ngInject";
    $stateProvider
      .state('app', {
        template: '<div ui-view></div>',
        resolve: {
          isLoggedIn: ()=>{
            return true;
          }
        }
      });

    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
