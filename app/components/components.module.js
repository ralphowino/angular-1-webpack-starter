import angular from 'angular';

import {AboutModule} from './about/about.module';
import {AuthModule} from './auth/auth.module';
import {HomeModule} from './home/home.module';
import {DashboardModule} from './dashboard/dashboard.module';

export let ComponentsModule = angular.module('app.components', [
    AboutModule.name,
    AuthModule.name,
    AboutModule.name,
    HomeModule.name,
    DashboardModule.name,
]);