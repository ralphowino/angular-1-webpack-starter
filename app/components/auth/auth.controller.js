export class AuthController {

  constructor($auth, $state, SweetAlert) {
    'ngInject';

    this.$auth = $auth;
    this.$state = $state;
    this.SweetAlert = SweetAlert;
  }

  login(credentials, first_time) {
    this.$auth.login(credentials)
      .then(() => {
        if (first_time) {
          this.SweetAlert.swal('Login', 'Welcome back, Name', 'success');
        }
        this.$state.go('app.dashboard', {}, { reload: true });
      })
      .catch((response) => {
        this.SweetAlert.swal('Failure', response.data.message, 'error');
      });
  }

  register(user) {
    this.$auth.signup(user)
      .then((response) => {
        this.SweetAlert.swal('Registration', 'User has been registered.', 'success');
        this.login(_.pick(user, ['email', 'password']), true);
      })
      .catch((response) => {
        this.SweetAlert.swal('Failure', response.data.message, 'error');
      });
  }

  forgot(email) {
    this.$auth.recoverPassword(email).then((response) => {
      this.SweetAlert.swal('Recover', 'Check email on instructions to reset password', 'success');
      this.$state.go('auth.login');
    }, (response) => {
      this.SweetAlert.swal('Failure', response.data.message, 'error');
    });
  }
}

