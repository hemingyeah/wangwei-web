//检索维权管理
app.factory('appraiseRightsService', ['dataExchange', function(dataExchange) {
    return {
        loadData: function($scope, data, fun) {
            dataExchange.loadData({type: 'GET', url: 'api/appraise-rights.json'}, {
            }, function(data) {
                if (fun) fun(data);
            })
        }
    };
}]);