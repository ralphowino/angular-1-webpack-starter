import angular from 'angular';

import {SatellizerConfig} from './config/satellizer.config';
import {SatellizerInterceptor} from './config/satellizer.config';
import {AuthDecorator} from './decorators/auth.decorator';
import {EnvService} from './services/env.service';

export let GlobalModule = angular.module('app.global', [])
    .config(AuthDecorator)
    .config(SatellizerConfig)
    .config(SatellizerInterceptor)
    .service('Env', EnvService);
