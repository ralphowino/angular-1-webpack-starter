import angular from 'angular';

export class Resource {

    constructor(Restangular, $q) {
        this.Restangular = Restangular;
        this.$q = $q;
    }

    make(resource_path, parent) {
        var path = '';

        if (angular.isDefined(parent)) {
            path = ''.concat(parent.path).concat('/').concat(parent.id).concat('/').concat(resource_path);
        } else {
            path = resource_path;
        }

        var $model = this.Restangular.service(path);
        $model.route = path;
        $model.name = resource_path.charAt(0).toUpperCase() + resource_path.substr(1);
        $model.schema = {};
        $model.defaultSort = [];
        $model.defaultFilters = [];
        $model.form = [];
        $model.filters = [];

        $model.getSchema = () => {
            return this.$q.when($model.schema).then((schema) => {
                return schema
            });
        };

        $model.getForm = () => {
            return $model.form
        };

        $model.getColumns = () => {
            return $model.getSchema().then((schema) => {
                return _(schema.properties)
                    .map((elem, key) => {
                        elem.slug = key;
                        return elem;
                    })
                    .filter((elem) => {
                        return _.isUndefined(elem.listview) || elem.listview;
                    })
                    .map((elem) => {
                        var columnDef = _.isUndefined(elem.columnDef) ? {} : elem.columnDef;

                        if (_.isUndefined(columnDef.name)) {
                            columnDef.name = angular.isDefined(elem.title) && elem.title && elem.title.length > 0 ? elem.title : elem.slug;
                        }

                        if (_.isUndefined(columnDef.type)) {
                            columnDef.type = elem.format ? elem.format : elem.type;
                        }

                        if (_.isUndefined(columnDef.main)) {
                            columnDef.main = false;
                        }

                        columnDef.optional = !columnDef.main;
                        if (columnDef.main) {
                            columnDef.visible = true;
                        }

                        if (angular.isDefined(elem.format)) {
                            columnDef.type = elem.format;
                        }

                        if (_.isUndefined(columnDef.field)) {
                            columnDef.field = angular.isDefined(elem.field) ? elem.field : elem.slug;
                        }

                        if (_.isUndefined(columnDef.visible)) {
                            columnDef.visible = _.isUndefined(elem.listview) || elem.listview !== 'hidden';
                        }

                        if (_.isUndefined(columnDef.enableSorting)) {
                            columnDef.enableSorting = true;
                        }

                        if (_.isUndefined(columnDef.enableFiltering)) {
                            columnDef.enableFiltering = true;
                        }

                        if (_.isUndefined(columnDef.enum) && angular.isDefined(elem.enum)) {
                            if (columnDef.type == 'string') columnDef.type = 'select';
                            columnDef.enum = elem.enum;
                        }

                        if (_.isUndefined(columnDef.titleMap) && angular.isDefined(elem['x-schema-form']) && angular.isDefined(elem['x-schema-form'].titleMap)) {
                            columnDef.titleMap = angular.copy(elem['x-schema-form'].titleMap);

                        }

                        if (_.isUndefined(columnDef.titleMap) && angular.isDefined(columnDef.enum)) {
                            columnDef.titleMap = _.map(columnDef.enum, (item) => {
                                return {value: item, name: item};
                            });

                        }

                        if (columnDef.type !== 'boolean' && !_.isUndefined(columnDef.titleMap)) {
                            if (!_.find(columnDef.titleMap, {value: 'EMPTY', name: 'EMPTY'})) {
                                columnDef.titleMap.unshift({value: 'EMPTY', name: 'EMPTY'});
                            }
                        }

                        if (_.isUndefined(columnDef.column_size)) {
                            columnDef.column_size = 'size-medium';
                        }

                        if (_.isUndefined(columnDef.export) && !_.isUndefined(elem.export)) {
                            columnDef.export = elem.export;
                        }

                        return columnDef;
                    })
                    .value();
            });
        };

        $model.getExportColumns = () => {
            return $model.getSchema().then((schema) => {
                return _(schema.properties)
                    .map((elem, key) => {
                        elem.slug = key;
                        return elem;
                    })
                    .filter((elem) => {
                        return elem.export;
                    })
                    .map((elem) => {
                        var columnDef = _.isUndefined(elem.columnDef) ? {} : elem.columnDef;

                        if (_.isUndefined(columnDef.name)) {
                            columnDef.name = angular.isDefined(elem.title) && elem.title && elem.title.length > 0 ? elem.title : elem.slug;
                        }

                        if (_.isUndefined(columnDef.field)) {
                            columnDef.field = angular.isDefined(elem.field) ? elem.field : elem.slug;
                        }

                        if (_.isUndefined(columnDef.include)) {
                            columnDef.include = _.isUndefined(elem.listview) || elem.listview !== 'hidden';
                        }

                        if (_.isUndefined(columnDef.export) && !_.isUndefined(elem.export)) {
                            columnDef.export = elem.export;
                        }

                        if (_.isUndefined(columnDef.export.field)) {
                            columnDef.export.field = columnDef.field;
                        }

                        return columnDef;
                    })
                    .value();
            });
        };

        $model.getFields = () =>  {
            return $model.getSchema().then((schema) => {
                return _(schema.properties)
                    .map((elem, key) => {
                        elem.slug = key;
                        return elem;
                    })
                    .filter((elem) => {
                        return _.isUndefined(elem.listview) || elem.listview;
                    })
                    .map((elem) => {
                        var field = {};
                        field.slug = elem.slug;
                        field.name = angular.isDefined(elem.title) && elem.title && elem.title.length > 0 ? elem.title : elem.slug;
                        field.mergeable = angular.isDefined(elem.mergeable) ? elem.mergeable : true;

                        field.type = _.isUndefined(elem.format) ? elem.type : elem.format;
                        if (angular.isDefined(elem['x-schema-form']) && angular.isDefined(elem['x-schema-form'].titleMap)) {
                            field.titleMap = elem['x-schema-form'].titleMap;
                        }

                        return field;
                    })
                    .value();
            });
        };

        $model.getFilters = () => {
            return this.$q.resolve($model.defaultFilters);
        };

        $model.search = (term) => {
            return $model.getList({search: term}).then((result) => {
                return result;
            });
        };

        $model.getSort = () => {
            return this.$q.resolve($model.defaultSort);
        };

        $model.getPredefinedFilters = () => {
            return this.$q.when($model.filters);
        };

        $model.getArchived = () => {
            return $model.getList({archived: 'only'});
        };

        $model.archiveMany = (collection) => {
            var model = $model.one();
            model.keys = {
                items: _.pluck(collection, 'id')
            };
            return model.customDELETE();
        };

        $model.restoreMany = (collection) => {
            return $model.one().customPUT({keys: collection}, 'restore');
        };

        $model.deleteMany = (collection) => {
            var model = $model.one();
            model.keys = collection;
            return model.customDELETE('', {force: true});
        };

        this.Restangular.extendCollection(path, (collection) => {
            collection.addRestangularMethod('getArchived', 'get', '', {archived: 'only'});
            return collection;
        });

        this.Restangular.extendModel(path, (model) => {
            model.selectiveSave = (data) => {
                return model.customPUT(data);
            };
            model.addRestangularMethod('restore', 'put', 'restore');
            model.addRestangularMethod('forceDelete', 'remove', '', {force: true});
            return model;
        });

        return $model;
    };
}