//白名单管理
app.factory('whiteListService', ['dataExchange', function(dataExchange) {
    return {
        loadData: function($scope, data, fun) {
            dataExchange.loadData({type: 'GET', url: 'api/white-list.json'}, {
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);