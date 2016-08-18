import angular from 'angular';
import Navbar from './navbar/navbar';
import Hero from './hero/hero';
import User from './user/user';
import 'font-awesome/scss/font-awesome.scss';
import './common.scss';


let commonModule = angular.module('app.common', [
  Navbar.name,
  Hero.name,
  User.name
]);

export default commonModule;
