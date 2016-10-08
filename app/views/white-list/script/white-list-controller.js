app.controller('whiteListCtrl', ['$scope', 'gridService', 'whiteListService', 'dialog',
    function($scope, gridService, whiteListService, dialog) {
        $scope.service = whiteListService;
        gridService.gridInit($scope);
        $scope.dialog = dialog;
        $scope.businessBtns = [{
            "code": "input",
            "name": "导入白名单",
            "index": 1008,
            "icon": "fa fa-trash-o",
            "group": false
        }, {
            "code": "output",
            "name": "导出白名单",
            "index": 1009,
            "icon": "fa fa-trash-o",
            "group": false
        }]
        $scope.itemArray1 = [
            { id: 1, name: '品牌批次    ' },
            { id: 2, name: '投诉Id' },
            { id: 3, name: '卖家昵称' }
        ];
        $scope.selected = { value: $scope.itemArray1[0] };

        $scope.columnDefs = $scope.columnDefs.concat([{
            headerName: "状态",
            /*打印机编号*/
            // checked: true,
            field: "state",
            width: 100
        }, {
            headerName: "平台类型",
            /*打印单据类型*/
            checked: true,
            field: "platformType",
            width: 150,
        }, {
            headerName: "店铺链接",
            /*运输单位*/
            checked: true,
            field: "taobaoUrl",
            width: 300
        }, {
            headerName: "卖家Id",
            /*作业区*/
            checked: true,
            field: "sellerNickname",
            width: 200
        }]);
        var rowData = [
            { make: "丰田", model: "塞利卡", price: 35000, solder: "李克强", sex: "男", like: "敞篷" },
            { make: "福特", model: "蒙迪欧", price: 32000, solder: "李克强", sex: "男", like: "敞篷" },
            { make: "保时捷", model: "博古特", price: 72000, solder: "李克强", sex: "男", like: "敞篷" }
        ];
        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            showToolPanel: false,
            headerCellRenderer: $scope.headerCellRenderer,
            onSelectionChanged: function() {}
        };

        $scope.gridOptions = $.extend($scope.options, $scope.gridOptions);
        var consMethods = gridService.construtor($scope);
        $scope.event = $.extend(consMethods, {
            add: function function_name() {
                // 添加
                $scope.dialog.show('views/white-list/white-list-add.html', 'whiteListEditCtrl', 'md', {
    
                }, function() {
                })
            },
            delete: function() {
                // 删除
            },
            input: function() {
                // 导入白名单
            },
            output: function() {
                // 导出白名单
            }
        });
    }
]);
app.controller('whiteListEditCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    /**
     * 模态框保存、关闭时间
     * 
     */
    $scope.event = {
        save: function () {
            //保存
            $uibModalInstance.close();
        },
        close: function () {
            //关闭
            $uibModalInstance.close();
        }
    }

    $scope.itemArray1 = [
        { id: 1, name: '品牌批次    ' },
        { id: 2, name: '投诉Id' },
        { id: 3, name: '卖家昵称' }
    ];
}])
