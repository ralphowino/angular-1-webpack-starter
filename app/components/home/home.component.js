import template from './home.html';
import {HomeController} from './home.controller';
import './home.scss';

export let homeComponent = {
  restrict: 'E',
  bindings: {},
  template,
  HomeController,
  controllerAs: 'vm'
};
