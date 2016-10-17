import angular from 'angular';

import {SatellizerConfig} from './config/satellizer.config';
import {SatellizerInterceptor} from './config/satellizer.config';
import {RestangularConfig} from './config/restangular.config';
import {AuthDecorator} from './decorators/auth.decorator';
import {Resource} from './factories/resource.factory';

export let GlobalModule = angular.module('app.global', [])
    .config(AuthDecorator)
    .config(SatellizerConfig)
    .config(SatellizerInterceptor)
    .config(RestangularConfig)
    .factory('Resource', Resource);
