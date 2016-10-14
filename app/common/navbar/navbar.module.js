import angular from 'angular';
import {navbarComponent} from './navbar.component';
import uibDropdown from 'angular-ui-bootstrap/src/dropdown';

export let NavbarModule = angular.module('navbar', [
  uibDropdown
])
.component('navbar', navbarComponent);
