export function SatellizerConfig($authProvider, Env) {
	'ngInject';

    $authProvider.baseUrl = Env.get('API_URL');
    $authProvider.signupUrl = 'auth/register';
	$authProvider.loginUrl = '/api/auth/login';
	$authProvider.signupUrl = '/api/auth/register';
	$authProvider.tokenRoot = 'data';//compensates success response macro
}

export function SatellizerInterceptor($httpProvider) {
	'ngInject';

	$httpProvider.interceptors.push(function ($injector, $q) {
		return {
			'responseError': function (rejection) {
				if (rejection.status == 401) {
					var $auth = $injector.get('$auth');
					var $http = $injector.get('$http');
					var $location = $injector.get('$location');
					var token = $auth.getToken();
					if (token) {
						return $auth.refreshToken(token).then(function () {
							return $http(rejection.config);
						}, function () {
							$auth.removeToken();
							$location.path('auth/login');
						});
					}
				}
				return $q.reject(rejection);
			}
		};
	});
}