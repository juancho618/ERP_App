(function () {
    angular
        .module('ERP_App')
        .controller('productsController', ['$http', '$scope', function ($http, $scope) {
            $scope.productList = {};
            $scope.categories = {};
            $scope.units = {};

            $scope.loaded = false;

            init();
            

            function init() {
                $scope.loaded = true;
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

            function GetUnits() {
                $http({
                    method: 'Get',
                    url: '/Category/GetCategories',
                }).success(function (e) {
                    console.log(e.data);
                    $scope.categories=e.data;
                }).error(function (e) {
                    console.log(e);
                });
            }
            function GetCategories() {
                $http({
                    method: 'Get',
                    url: '/Unit/GetUnits',
                }).success(function (e) {
                    console.log(e.data);
                    $scope.units = e.data;
                }).error(function (e) {
                    console.log(e);
                });
            }

            $scope.addProduct = function () {
                $scope.token = $('[name="__RequestVerificationToken"]').val();
                $http({
                    method: 'post',
                    url: '/Products/Create/',
                    data: $scope.product,
                    headers: {
                        'RequestVerificationToken': $scope.token
                    }
                    }).success(function(e){
                        console.log(e.data);
                        $scope.product = e.data;
                    }).error(function(e){
                        console.log(e);
                    });
            }

            $scope.open_modal = function (id_modal) {
                GetCategories();
                GetUnits();
                $('#' + id_modal).modal('show');
            }
        }]);
})();