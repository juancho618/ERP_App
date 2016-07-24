(function () {
    angular
        .module('ERP_App')
        .controller('productsController', ['$http', '$scope', function ($http, $scope) {
            $scope.productList = {};
            init()

            function init() {
                //Llamado a los datos y ponerlos en un $scope
                $http({
                    method: 'get',
                    url: '/Products/ProductsList/'
                }).success(function (e) {
                    console.log(e.data);
                    $scope.productList = e.data;
                }).error(function (e) {
                    console.log(e);
                });
            }
        }]);
})();