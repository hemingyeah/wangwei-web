//调用底层httpService.ajax,按调用类型封装ajax方法(eg: loadData, save...)
app.factory('dataExchange', ['httpService', function(httpService) {
    var obj = {
        loadData: function(route, param, fun) {
            httpService.ajax({
                    type: route.type,
                    url: route.url,
                    data: param
                })
                .success(function(data) {
                    httpService.responseHandle(data, function(data) {
                        if (fun) fun(data);
                    });
                });
        }
    }
    return obj;
}]);
app.factory('loading', [function() {
    var ajaxCount = 0;

    var loading = {
        show: function() {
            ajaxCount++;
            $(".iscsloading").css("display", "block");
        },
        hide: function() {
            ajaxCount--;
            if (ajaxCount === 0) {
                $(".iscsloading").css("display", "none");
            }
        }
    };
    return loading;
}]);
