app.controller('appraiseRightsCtrl', ['$scope', 'gridService', 'appraiseRightsService',
    function($scope, gridService, appraiseRightsService) {
        $scope.service = appraiseRightsService;
        gridService.gridInit($scope);
        //构造业务按钮
        $scope.businessBtns = [{
            "code": "output",
            "name": "导出excel",
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
            headerName: "投诉Id",
            /*打印机编号*/
            // checked: true,
            field: "complaintId",
            width: 100
        }, {
            headerName: "品牌批次",
            /*打印单据类型*/
            checked: true,
            field: "brandBatches",
            width: 200,
        }, {
            headerName: "淘宝链接",
            /*运输单位*/
            checked: true,
            field: "taobaoUrl",
            width: 150
        }, {
            headerName: "卖家昵称",
            /*作业区*/
            checked: true,
            field: "sellerNickname",
            width: 100
        }, {
            headerName: "店铺信誉",
            /*IP*/
            checked: true,
            field: "storeCredit",
            width: 80
        }, {
            headerName: "组合购物",
            /*端口*/
            checked: true,
            field: "groupShopping",
            width: 80
        }, {
            headerName: "投诉时间",
            /*端口*/
            checked: true,
            field: "complaintTime",
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
            //导出excel
            output:  $scope.exportAsExcel
        });
    }
])
