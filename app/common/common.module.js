import angular from 'angular';
import {NavbarModule} from './navbar/navbar.module';
import {UserModule} from './user/user.module';

import 'font-awesome/scss/font-awesome.scss';
import './common.scss';

export let CommonModule = angular.module('app.common', [
  NavbarModule.name,
  UserModule.name
]);
