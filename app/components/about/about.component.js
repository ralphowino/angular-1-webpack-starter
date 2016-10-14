import template from './about.html';
import {AboutController} from './about.controller';

export let aboutComponent = {
  restrict: 'E',
  bindings: {},
  template,
  AboutController,
  controllerAs: 'vm'
};
