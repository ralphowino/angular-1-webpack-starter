export class ResetController {

  constructor($auth, $state, SweetAlert) {
    'ngInject';

    this.$auth = $auth;
    this.$state = $state;
    this.SweetAlert = SweetAlert;    
  }

  reset(password) {
        var details = {
          user_id: $state.params.id,
          code: $state.params.code,
          password: password
        };

        this.$auth.resetPassword(details).then(function () {
          this.SweetAlert.swal('Reset', 'Reset password is successful', 'success');
          this.$state.go('auth.login');
        }, function (response) {
          this.SweetAlert.swal('Failure', response.data.message, 'error');
        });
  }
}
