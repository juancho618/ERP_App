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
                }).error(function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest);
                    var error = errorHandling(textStatus);
                    showMessage('Error ' + textStatus, 'Hubo un error al traer la informacion. \n' + error, 'error');
                });
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