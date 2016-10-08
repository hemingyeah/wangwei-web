app.controller('alipayCtrl', ['$scope', 'gridService', 'alipayService',
    function($scope, gridService, alipayService) {
        $scope.service = alipayService;
        gridService.gridInit($scope);
        //构造业务按钮
        $scope.businessBtns = [{
            "code": "editAlipay",
            "name": "修改代付支付宝",
            "index": 1010,
            "icon": "fa fa-pencil",
            "group": false
        }]
        $scope.itemArray1 = [
            { id: 1, name: '品牌批次    ' },
            { id: 2, name: '投诉Id' },
            { id: 3, name: '卖家昵称' }
        ];
        $scope.selected = { value: $scope.itemArray1[0] };

        $scope.columnDefs = $scope.columnDefs.concat([{
            headerName: "账号",
            /*打印机编号*/
            // checked: true,
            field: "account",
            width: 300
        }, {
            headerName: "所属合同主体",
            /*打印单据类型*/
            checked: true,
            field: "belongsTo",
            width: 200,
        }, {
            headerName: "使用状态",
            /*运输单位*/
            checked: true,
            field: "usingState",
            width: 150
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
            editAlipay: function () {
                //修改代付支付宝
            }
        });
    }
])
