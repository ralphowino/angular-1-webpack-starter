import angular from 'angular';

export function RestangularConfig(Env, RestangularProvider) {
    'ngInject';

    RestangularProvider
        .setBaseUrl(Env.API_URL)
        .setDefaultHttpFields({cache: true})
        .setDefaultHeaders({'Content-Type': 'application/json'})
        .addResponseInterceptor(transformIncludes)
        .addResponseInterceptor(transformMeta);

    function transformMeta(data, operation, what, url, response, deferred) {
        var transformed = data;
        if (angular.isDefined(data.data)) {
            transformed = data.data;
            if (angular.isDefined(data.meta)) {
                transformed.meta = data.meta
            }
        }
        return transformed;
    }

    function transformIncludes(data, operation, what, url, response, deferred) {
        var transformed, includes, params;
        deferred.promise.then(function () {
            if (angular.isDefined(data.data) && angular.isDefined(data.data.reqParams)) {
                params = data.data.reqParams;
                if (params !== null && 'include' in params) {
                    includes = params.include.split(',');
                    if (_.isArray(data.data)) {
                        transformCollection(data, includes);
                    }
                    else {
                        transformRecord(data.data, includes);
                    }
                }
            }
        });
        transformed = data;
        return transformed;
    }

    function transformCollection(data, includes) {
        angular.forEach(data.data, function (record) {
            transformRecord(record, includes);
            angular.forEach(includes, function (include) {
                if (angular.isDefined(record[include])) {
                    record[include].data.fromServer = true;
                }
            });
        });
    }

    function transformRecord(record, includes) {
        angular.forEach(includes, function (include) {
            var route = include;
            if (angular.isDefined(record[include]) && 'data' in record[include]) {
                if (record[include]['data'].length > 0) {
                    Restangular.restangularizeCollection(record, record[include].data, route);
                }
                else {
                    if (include == 'contact')
                        route = 'contacts';
                    Restangular.restangularizeElement(record, record[include].data, route);
                }

                record[include].data.fromServer = true;
            }
        });
    }
}