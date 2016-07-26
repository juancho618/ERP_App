(function () {
    angular
        .module('ERP_App')
        .controller('productsController', ['$http', '$scope', function ($http, $scope) {
            $scope.productList = {};
            $scope.categories = {};
            $scope.units = {};

            $scope.loaded = false;

            $scope.myConfigCategory = {
                create: true,
                valueField: 'Category',
                labelField: 'Category',
                delimiter: '|',
                placeholder: 'Pick something',
                onInitialize: function (selectize) {
                    // receives the selectize object as an argument
                },
                 maxItems: 1
            };
            $scope.myConfigUnit = {
                create: true,
                valueField: 'Unit',
                labelField: 'Unit',
                delimiter: '|',
                placeholder: 'Pick something',
                onInitialize: function (selectize) {
                    // receives the selectize object as an argument
                },
                maxItems: 1
            };

            init();
            

            function init() {
                $scope.loaded = true;
                //Llamado a los datos y ponerlos en un $scope
                $http({
                    method: 'get',
                    url: '/Products/ProductsList/'
                }).success(function (e) {
                    $scope.productList = e.data;
                    swal
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                    var error = errorHandling(textStatus);
                    showMessage('Error ' + textStatus, 'Hubo un error al traer la informacion. \n' + error, 'error');
                });
            }

            function GetCategories() {
                if(!$scope.categories.length) {
                    $http({
                        method: 'Get',
                        url: '/Category/GetCategories',
                    }).success(function (e) {
                        console.log(e.data);
                        $scope.categories=e.data;
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest);
                        var error = errorHandling(textStatus);
                        showMessage('Error ' + textStatus, 'Hubo un error al traer la informacion. \n' + error, 'error');
                    });
                }
            }
            function GetUnits() {
                console.log(!$scope.units.length);
                if (!$scope.units.length) {
                    $http({
                        method: 'Get',
                        url: '/Unit/GetUnits',
                    }).success(function (e) {
                        console.log(e.data);
                        $scope.units = e.data;
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest);
                        var error = errorHandling(textStatus);
                        showMessage('Error ' + textStatus, 'Hubo un error al traer la informacion. \n' + error, 'error');
                    });
                }
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
                        $scope.productList.push(e.data);
                        $scope.product = {};
                        showMessage('Data saved', e.message, 'success');
                        $('#createProductModal').modal('hide');
                    }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(XMLHttpRequest);
                        var error = errorHandling(textStatus);
                        showMessage('Error ' + textStatus, 'Hubo un error al traer la informacion. \n' + error, 'error');
                    });
            }

            $scope.open_modal = function (id_modal) {
               
                GetCategories();
                GetUnits();
                //Inicializar los selectsize
                //$('#category,#unit').selectize({
                //    delimiter: ',',
                //    persist: false,
                //    maxItems: 1,
                //    create: function (input) {
                //        return {
                //            value: input,
                //            text: input
                //        }
                //    }
                //});
               
                $('#' + id_modal).modal('show');
            }

            function errorHandling(error) {
                var message = "";

                switch (error) {
                    case 400:
                        message = 'El Servidor ha recibido la solicitud, pero el contenido de solicitud no es válida. [400]';
                        break;
                    case 401:
                        message = 'Acceso no autorizado. [401]';
                        break;
                    case 403:
                        message = 'El recurso que ha solicitado no se puede acceder en el momento. [403]';
                        break;
                    case 404:
                        message = 'La página solicitada no se encuentra. [404]';
                        break;
                    case 500:
                        message = 'Error en el servidor interno. [500]';
                        break;
                    case 503:
                        message = 'Servicio no disponible. [500]';
                        break;
                }

                return message;
            }

            function showMessage(title, message, type) {
                swal(title, message, type)
            }
        }]);
})();