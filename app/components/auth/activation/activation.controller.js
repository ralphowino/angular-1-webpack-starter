export class ActivationController {

  constructor($auth, $state, SweetAlert) {
    'ngInject';

    this.$auth = $auth;
    this.$state = $state;
    this.SweetAlert = SweetAlert;
  }

  $onInit() {
    this.activate();
  }

  activate() {
      this.$auth.activate(this.$state.params.id, this.$state.params.code).then(() => {
        this.SweetAlert.swal('Activation', 'Activation of account successful', 'success');
        this.$state.go('app.dashboard');
      }, (response) => {
        this.SweetAlert.swal('Failure', response.data.message, 'error');
        this.$state.go('auth.login');
      });
  }
}