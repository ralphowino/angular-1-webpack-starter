import angular from 'angular';
import {UserFactory} from './user.factory';

export let UserModule = angular.module('user', [])
    .factory('User', UserFactory);
