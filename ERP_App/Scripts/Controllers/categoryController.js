(function () {
    angular
        .module('ERP_App')
        .controller('categoryController', ['$http', '$scope', function ($http, $scope) {
            $scope.categoryList = {};

            $scope.loaded = false;
            init();

            function init() {
                $scope.loaded = true;

                $http({
                    method: 'get',
                    url: '/Category/GetCategories'
                }).success(function (e) {
                    $scope.categoryList = e.data;
                }).error(function (e) {
                    console.log(e);
                });
            }
        }]);
})();