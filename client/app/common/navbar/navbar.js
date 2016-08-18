import angular from 'angular';
import navbarComponent from './navbar.component';
import uibDropdown from 'angular-ui-bootstrap/src/dropdown';

let navbarModule = angular.module('navbar', [
  uibDropdown
])

.component('navbar', navbarComponent);

export default navbarModule;
