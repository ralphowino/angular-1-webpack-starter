import template from './navbar.html';
import {NavbarController} from './navbar.controller';
import './navbar.scss';

export let navbarComponent = {
  restrict: 'E',
  bindings: {
    sidebar: '<'
  },
  template,
  NavbarController,
  controllerAs: 'vm'
};