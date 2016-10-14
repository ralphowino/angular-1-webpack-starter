export class LogoutController {

  constructor($auth, $state, SweetAlert) {
    'ngInject';

    this.$auth = $auth;
    this.$state = $state;
    this.SweetAlert = SweetAlert;
  }

  $onInit() {
    this.logout();
  }

  logout() {
    this.$auth.logout().then(() => {
      this.SweetAlert.swal('Logout', 'User has been logged out.', 'success');
      this.$state.go('auth.login');
    });
  }
}