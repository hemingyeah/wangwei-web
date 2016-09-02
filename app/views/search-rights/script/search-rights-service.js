//检索维权管理
app.factory('searchRightsService', ['dataExchange', function(dataExchange) {
    return {
        loadData: function($scope, data, fun) {
            dataExchange.loadData({type: 'GET', url: 'api/printers.json'}, {
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);