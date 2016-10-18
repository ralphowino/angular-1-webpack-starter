import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'restangular';
import 'angular-sweetalert';
import {CommonModule} from './common/common.module';
import {ComponentsModule} from './components/components.module';
import {GlobalModule} from './global/global.module';
import {AppComponent} from './app.component';
import EnvModule from './env.module';

angular.module('app', [
    uiRouter,
    'restangular',
    'oitozero.ngSweetAlert',
    EnvModule.name,
    CommonModule.name,
    ComponentsModule.name,
    GlobalModule.name
])
    .config(($locationProvider, $stateProvider) => {
        'ngInject';

        $stateProvider
            .state('app', {
                template: '<div ui-view></div>',
                resolve: {
                    isLoggedIn: () => {
                        return true;
                    }
                }
            });
        $locationProvider.html5Mode(true).hashPrefix('!');
    })
    .component('app', AppComponent);
