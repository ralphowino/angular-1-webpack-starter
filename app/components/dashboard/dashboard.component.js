import template from './dashboard.html';
import {DashboardController} from './dashboard.controller';
import './dashboard.scss';

export let dashboardComponent = {
  restrict: 'E',
  bindings: {},
  template,
  DashboardController,
  controllerAs: 'vm'
};
