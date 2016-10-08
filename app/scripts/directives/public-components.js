// var app = angular.module('PublicApp', ["UrlConfig"]);
app.run(function() {
    //获取菜单数据
    // var id = Request("id") ? Request("id").substr(0, (Request("id") + "#").indexOf('#')) : 1; //获取页面请求参数:id

    // less.modifyVars({
    //  '@public-color': Set.ThemeColor ? Set.ThemeColor : "#478cd0",
    //  '@body-bgColor': Set.bodybgColor ? Set.bodybgColor : "white"
    // });
});
//-------------------------------------指令@表单控件------------------------------------
/**
 * 基于bootstrap封装的基础组件
 * 公用组件的指令都带有"cus"前缀,custom自定义的意思
 * 独孤宇云 2016-9-18
 */
//文件组件
app.directive("cusFile", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $("<div></div>");
            var item = $('<button class="btn btn-info file-btn" style="float: none; margin-top: 10px;">').appendTo(html);
            item.html(a.value || "选择文件")
            var input = $('<input type="file" id="fileInput" multiple="true" onchange="angular.element(this).scope().event.fileChange(event)">').appendTo(item);
            return html[0].outerHTML;
        }
    }
});

//搜索组件
app.directive("cusSearch", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $("<div class='input-group'/>");
            var text = $('<cus-input></cus-input>').appendTo(html);
            if (a.placeholder) {
                text.attr("placeholder", a.placeholder);
            }
            if (a.ngmodel) {
                text.attr("ngmodel", a.ngmodel);
            }
            $('<span class="input-group-addon input-sm"><i class="fa fa-search"></i></span>').appendTo(html);
            return html[0].outerHTML;
        },
        controller: function($scope) {}
    }
});

//单选组件
app.directive("cusRadio", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $('<div class="radio"></div>');
            var label = $('<Label class="i-checks i-checks-sm"></Label>').appendTo(html);
            label.text(a.value ? a.value : "");
            var input = $('<input type="radio" ng-model="' + a.ngmodel + '">').appendTo(label);
            input.attr({
                "ng-click": a.ngchange || "",
                "ng-disabled": a.ngdisabled || ""
            });
            for (var item in a) {
                if (item.startsWith("ng-")) {
                    input.attr(item, a[item]);
                }
            }
            $("<i></i>").appendTo(label);
            return html[0].outerHTML;
        }
    }
});

//开关组件
app.directive("cusSwitch", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $('<label class="i-switch bg-info m-t-xs"></label>');
            html.addClass(a.class || "");
            var input = $('<input type="checkbox"/>').appendTo(html);
            input.attr("ng-model", a.ngmodel);
            $("<i></i>").appendTo(html);
            for (var item in a) {
                if (item.startsWith("ng-")) {
                    input.attr(item, a[item]);
                }
            }
            return html[0].outerHTML;
        }
    }
});

//数字组件
app.directive("cusNumber", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var num = $('<input ui-jq="TouchSpin" type="text" value="0" class="form-control" ng-model=' + a.ngmodel + '>');

            num.attr({
                "data-step": a.step || "1",
                "data-decimals": a.decimals || "0",
                "data-min": a.rangemin || "0",
                "data-max": a.rangemax || "100"
            });
            if (a.buttonstyle === 'top') {
                num.attr({
                    "data-verticalbuttons": true,
                    "data-verticalupclass": "fa fa-caret-up",
                    "data-verticaldownclass": "fa fa-caret-down"
                });
            }
            if (a.typename) {
                if (a.type === "l") {
                    num.attr("data-prefix", a.typename);
                } else if (a.type === "r") {
                    num.attr("data-postfix", a.typename);
                }
            }
            for (var item in a) {
                if (item.startsWith("ng-")) {
                    num.attr(item, a[item]);
                }
            }
            return num[0].outerHTML;
        }
    }
});

//输入框组件
app.directive("cusInput", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $("<div/>");
            var textbox = $('<input type="text" class="form-control"/>').appendTo(html);
            a.maxlength = a.maxlength || 100;
            if (angular.isDefined(a.required)) {
                textbox[0].attributes.setNamedItem(document.createAttribute('Required'));
                // html.append('<span style="right:14px; color:green;" class="glyphicon glyphicon-ok form-control-feedback" ng-show="form.' + a.ngmodel.replace('.', '_') + '.$dirty && form.' + a.ngmodel.replace('.', '_') + '.$valid"></span>')
            }
            if (a.type) {
                textbox.attr("type", a.type);
            }
            if (a.placeholder) {
                textbox.attr("placeholder", a.placeholder);
            }
            if (a.ngmodel) {
                textbox.attr({
                    "ng-model": a.ngmodel,
                    "name": a.ngmodel.replace('.', '_')
                });
            }
            if (a.validtype) {
                var pattern = "";
                switch (a.validtype) {
                    case "Phone":
                        pattern = '/^[1][0-9]{10}$/';
                        break;
                    case "EnglishAndNum":
                        pattern = '/^[a-zA-Z0-9]$/';
                        break;
                    case "EnglishAndNumAndUnderline":
                        pattern = '/^[a-zA-Z0-9_]$/';
                        break;
                    case "EnglishAndChineseAndNumAndUnderline":
                        pattern = '/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/';
                        break;
                    case "English":
                        pattern = '/^[a-zA-Z]$/';
                        break;
                    case "IdCardNo":
                        pattern = '/^(\d{18,18}|\d{15,15}|\d{17,17}x)$/';
                        break;
                    case "IpNo":
                        pattern = '/^((([1-9]?|1\d)\d|2([0-4]\d|5[0-5]))\.){3}(([1-9]?|1\d)\d|2([0-4]\d|5[0-5]))$/';
                        break;
                    case "Telephone":
                        pattern = '/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}$/';
                        break;
                    case "Chinese":
                        pattern = '/^[\u4e00-\u9fa5]*$/';
                        break;
                    case "Number":
                        pattern = '/^[0-9]*$/';
                        break;
                }
                if (pattern) {
                    textbox.attr("ng-pattern", pattern);
                }
            }
            if (a.validtype || angular.isDefined(a.required)) {
                html.attr("ng-class", '{"has-error":!form.' + a.ngmodel.replace('.', '_') + '.$valid}')
            }
            if (a.ngdisabled) {
                textbox.attr("ng-disabled", a.ngdisabled);
            } else if (a.disabled === "") {
                textbox.attr("ng-disabled", a.ngdisabled);
            }
            if (a.maxlength) {
                textbox.attr("maxlength", a.maxlength);
            }
            if (a.minlength) {
                textbox.attr("minlength", a.minlength);
            }
            for (var item in a) {
                if (item.startsWith("ng-")) {
                    textbox.attr(item, a[item]);
                }
            }
            return html[0].outerHTML;
        },
        controller: function($scope) {}
    }
});

/**
 * 复合组件
 * 公用组件的指令都带有"cus"前缀,custom自定义的意思
 * 独孤宇云 2016-9-18
 */
app.directive("cusText", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $("<div/>");
            a.maxlength = a.maxlength || 100;

            var row = $((a.morerow ? "<Form-Row/>" : "<cus-form/>")).appendTo(html);
            if (a.padding) row.attr("padding", a.padding);
            if (a.margin) row.attr("margin", a.margin);
            if (a.colspan) row.attr("colspan", a.colspan);
            if (a.label) row.attr("label", a.label);
            var text = $("<cus-input maxlength=" + a.maxlength + "></cus-input>").appendTo(row);
            if (a.required || a.required == '') {
                text[0].attributes.setNamedItem(document.createAttribute('Required'));
                row[0].attributes.setNamedItem(document.createAttribute('Required'));
            }
            if (a.type) text.attr("type", a.type);
            if (a.placeholder) text.attr("placeholder", a.placeholder);
            if (a.ngmodel) text.attr("ngmodel", a.ngmodel);
            if (a.ngdisabled || a.disabled == "") text.attr("ngdisabled", a.ngdisabled);

            return html[0].outerHTML;
        },
        controller: function($scope) {}
    }
});


/**
 * 封装第三方组件
 * 公用组件的指令都带有"cus"前缀,custom自定义的意思
 * 独孤宇云 2016-9-18
 */
//富文本(wangEditor)
app.directive("cusRichText", function() {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        template: function(e, a) {
            var html;
            html = $('<div class="richtext"></div>');
            var textarea = $('<textarea id=' + (a.richtextid || 'textarea') + '></textarea>').appendTo(html);
            if (a.style) {
                textarea.attr("style", a.style);
            }
            for (var item in a) {
                if (item.startsWith("ng-")) {
                    textarea.attr(item, a[item]);
                }
            }
            return html[0].outerHTML;
        },
        controller: function($scope, service) {
            $scope.onchange = function(text) {
                console.log(text)
            }
            $scope.service = service;
            $scope.ossUpload = service.FileUpload.BuildUploadObj();

            //生成imgDom
            function CreateImgDom(file) {
                var windowURL = window.URL || window.webkitURL;
                var $img = $('<img src="" alt="" class="notice">');
                $img.css({
                    'width': '70%',
                    'margin': '5px'
                });
                var Url = "http://" + $scope.ossUpload._config.bucket + "." + $scope.ossUpload._config.endpoint.host + "/" + file.Id + file.Extension;
                $img[0].src = Url;
                $scope.editor.hideModal();
                $scope.editor.append($img);
            }

            //上传
            var Upload = function(row) {
                var GUID = service.FileUpload.BuildGUID();
                //'Upload/Import/' + GUID 上传到一级目录
                $scope.ossUpload.upload(service.FileUpload.BuildUploadSetting(row, GUID, function(res) {
                    $scope.tag = true;
                    $scope.$apply(function() {
                        row.state = true;
                        row.StateName = "已上传";
                        row.Id = GUID;
                        row.SavePath = 'Upload/Import/';
                    });
                    CreateImgDom(row);
                    console.log("上传成功！");
                }, function(res) {
                    console.log("上传失败！");
                    row.state = false;
                    row.StateName = "上传失败"
                }, function(res) {
                    $scope.$apply(function() {
                        row.progress = Math.floor((res.loaded / res.total) * 100);
                    })
                }));
            }
            $('body').delegate('#files', 'change', function(evt) {
                var file = evt.target.files[0];
                $scope.data = [];
                $scope.data.push(file)
                file.Extension = file.name.substr(file.name.lastIndexOf('.'));
                Upload(file)
            });
        },
        link: function($scope, element, attr, ngModel) {

            var $uploadContainer = $('#upload');
            $scope.editor = $('#' + (attr.richtextid || 'textarea')).wangEditor({
                uploadImgComponent: $uploadContainer,
                menuConfig: [
                    // ['viewSourceCode'],
                    ['bold', 'underline', 'italic', 'foreColor', 'backgroundColor', 'strikethrough'],
                    ['blockquote', 'fontFamily', 'fontSize', 'setHead', 'justify'],
                    ['createLink', 'insertTable', 'insertExpression'],
                    ['insertImage'],
                    // ['insertImage', 'insertLocation'],
                    ['undo', 'redo']
                ],
                onchange: $scope.onchange,
                'expressions': $scope.service.expression.getExpressionList()
            });
            // $scope.editor.html('<p style="text-align: center;"><h1><ol><li><span style="line-height: 1.42857;"><b><font color="#880000">fdasgfad</font></b></span></li></ol></h1></p><img src="http://doc-gtintel.oss-cn-hangzhou.aliyuncs.com/Upload/Import/27811adc-9cd7-4c7d-8ec4-bb2c526da9f8.jpg" alt="" style="width: 70%; margin: 5px;">')
            element.css({
                'margin-top': '10px',
                'height': '500px'
            });
        }
    }
});



//------------------------------------指令@布局控件---------------------------
/**
 * 布局组件
 * 公用组件的指令都带有"cus"前缀,custom自定义的意思
 * 独孤宇云 2016-9-18
 */
//面板组件
app.directive("cusPanel", function() {
    return {
        restrict: "E",
        replace: true,
        scope: false,
        template: function(e, a) {
            var html = $('<div class="panel panel-default"></div>');
            if (e.attr('style')) {
                html.attr('style', e.attr('style'));
            }
            if (a.add || a.Edit) {
                html.css("margin-right", 5);
            }

            if ($("phead", e).length > 0) {
                var head = $('<div class="panel-heading font-bold"><span>' + $("phead:eq(0)", e).html() + '</span></div>').appendTo(html);
                if (a.dialog === "") {
                    $('<div style="float:right;cursor:pointer;" ng-click="event.Close()"><i class="icon-gt-delete"></i></div>').appendTo(head);
                }
                //是否聚合按钮
                if (a.record === "") {
                    $('<div style="float:right;cursor:pointer;" ng-click="event.Record(Model, $event)"><i class="icon-gt-record" style="color:#929292;"></i></div>').appendTo(head);
                }
                if (a.edit) {
                    var editName = a.edit === "" ? "EditElse" : a.edit;
                    $('<div style="float:right;cursor:pointer;" ng-click="event.' + editName + '(Model, $event)"><i class="Btn btn-edit" style="color:#929292;">编辑</i></div>').appendTo(head);
                }
                if (a.add) {
                    var addName = a.add === "" ? "AddElse" : a.add;
                    $('<div style="float:right;cursor:pointer;" ng-click="event.' + addName + '(Model, $event)"><a class="btn-link"><span class="btn-add"></span>保存</a></div>').appendTo(head);
                }
                if (a.expand === "") {
                    head.attr("ng-click", "PanelEvent.ToggleBody()").css("cursor", "pointer");
                }
                if (a.selectuser) {
                    $('<div style="float:right;cursor:pointer;" ng-transclude> <selectuser button="true"></selectuser></div>').appendTo(head);
                }
            }
            if ($("pbody", e).length > 0) {
                var body = $('<div class="panel-body"></div>').appendTo(html);
                if (a.expand === "") {
                    $(body).attr("ng-hide", "HideBody");
                }
                body.html($("pbody", e).html());
                if ($("pbody", e).attr("style")) {
                    body.attr("style", $("pbody", e).attr("style"));
                }
            }
            if ($("pfoot", e).length > 0) {
                html.append('<div class="panel-footer text-center">' + $("pfoot", e).html() + '</div>');
            }
            return html[0].outerHTML;
        },
        link: function($scope, element, attr, ngModel) {
            $scope.HideBody = false;
            if (attr.hidebody === "") {
                $scope.HideBody = true;
            }
            $scope.PanelEvent = {
                ToggleBody: function() {
                    $scope.HideBody = !$scope.HideBody;
                }
            }
        }
    }
});

//输入框组组件
app.directive("cusForm", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            a.colspan = a.colspan ? a.colspan : 2;
            var html = $('<div class="form-group"></div>');
            var label = $('<label class="control-label"></label>').appendTo(html);
            label.addClass('col-sm-' + a.colspan);
            if (a.required || a.required == '') {
                label.addClass("GT-Must").addClass('col-sm-' + a.colspan);
            }
            var content = $('<div></div>').appendTo(html);
            content.html($(e.context).html());
            content.addClass('col-sm-' + (a.colspan === '12' ? a.colspan : (12 - parseInt(a.colspan))));
            if (a.label) {
                label.text(a.label);
            } else {
                content.addClass('col-sm-offset-' + a.colspan);
            }
            for (var item in a) {
                if (item.startsWith("ng-")) {
                    html.attr(item, a[item]);
                }
            }
            return html[0].outerHTML;
        },
        replace: true,
        controller: function($scope) {},
        link: function($scope, element, attr, ngModel) {}
    }
});

//输入框组组件
// app.directive("formRow", function() {
//     return {
//         restrict: "E",
//         replace: true,
//         transclude: true,
//         template: function(e, a) {
//             var html = $('<div class="form-group"></div>');
//             if (a.padding) {
//                 html.css("padding", a.padding)
//             }
//             var label = $('<label class="control-label"></label>').appendTo(html);
//             if (a.margin) {
//                 label.css("margin", a.margin)
//             }
//             if (a.required || a.required == '') {
//                 label.addClass("GT-Must").addClass('col-sm-' + a.colspan);
//             }
//             var content = $('<div ng-transclude></div>').appendTo(html);
//             if (a.label) {
//                 label.text(a.label);
//             } else {
//                 content.addClass('col-sm-offset-' + a.colspan);
//             }
//             return html[0].outerHTML;
//         },
//         controller: function($scope, service) {},
//         link: function($scope, element, attr, ngModel) {}
//     }
// });

//布局组件
app.directive("layout", function() {
    return {
        restrict: "E",
        replace: true,
        template: function(e, a) {
            var html = $('<div class="hbox hbox-auto-xs bg-light"></div>');
            angular.forEach(e[0].children, function(obj, i) {
                var $item = $('<div class="col lter b-r"><div class="vbox"></div></div>').appendTo(html);
                var $width = $(obj).attr("width");
                if ($(obj).attr("hidefilter")) {
                    $item.attr("ng-hide", "true");
                };
                if ($(obj).attr("label")) {
                    var title = $('<div class="wrapper b-b" style="height:50px;"><div class="font-thin h4" style="float:left;">' + $(obj).attr("label") + '</div></div>').appendTo($(".vbox", $item));
                    if ($(obj).attr("event")) {
                        title.append('<ButtonBar event="' + $(obj).attr("event") + '" style="float:right;"></ButtonBar>');
                    }
                }
                var content = $('<div class="row-row"><div class="cell scroll"><div class="cell-inner" ' + (obj.attributes.bgcolor ? 'style="background-color:' + obj.attributes.bgcolor.value + '"' : "") + '></div></div></div>').appendTo($(".vbox", $item));
                $(".cell-inner", content).html($(obj).html());
                if ($width) {
                    if ($width === 'sm') {
                        $item.addClass('w');
                    } else {
                        $item.width($width);
                    }
                } else {
                    $(".cell-inner", content).css("padding", "10px 10px 10px 6px");
                }
            })
            return html[0].outerHTML;
        }
    }
});

//
app.directive("dialog", function() {
        return {
            restrict: "A",
            replace: true,
            link: function(scope, e, a) {
                e.css("margin-bottom", 0);
                e.css("padding-bottom", 0);
            }
        }
    });
//------------------------------------指令@业务组件---------------------------
app.directive('demo', function () {
    return {
        restrict: "A",
        link: function () {
            
        }
    }
})
//------------------------------------过滤器-----------------------------------
app
    .filter('propsFilter', function() {
        return function(items, props) {
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    })
    .filter('SelectAll', function($sce) {
        return function(data) {
            var Sel_Count = 0;
            angular.forEach(data, function(obj, i) {
                if (obj.Checked) Sel_Count++;
            })
            if (!data) return false;
            return Sel_Count == data.length;
        }
    })
    .filter('ReturnListColumn', function($sce) {
        return function(List, ColumnName) {
            if (List) {
                return List.map(function(x) {
                    return x[ColumnName];
                }).join('、');
            } else {
                return "";
            }
        }
    })

//-------------------------------------服务-------------------------------------
app
    .service('MenuTypeList', function() {
        return [{
            PlatformName: "Web",
            PlatformId: 0,
            TreeObj: "Web_zTree"
        }, {
            PlatformName: "PC",
            PlatformId: 1,
            TreeObj: "PC_zTree"
        }, {
            PlatformName: "Andriod",
            PlatformId: 2,
            TreeObj: "Andriod_zTree"
        }, {
            PlatformName: "IOS",
            PlatformId: 3,
            TreeObj: "IOS_zTree"
        }];
    })
    .factory('DataOperate', function($http, service, $modal) {
        var ret = {
            //调试临时用
            Common: function(route, param, fun, data) {
                var s = {
                    contentType: "application/json",
                    dataType: "json",
                    type: "get",
                    async: true,
                    url: false,
                    data: false,
                    loadEle: false
                }
                $(".loading").css("display", "block");
                ajaxCount++;
                $http({
                    method: route.Type,
                    url: route.Url,
                    headers: {
                        SessionId: sessionStorage.getItem("SessionID")
                    },
                    params: param,
                    data: data
                }).success(function(data) {
                    if (fun) fun(data.RtnData);
                    ajaxCount--;
                    if (ajaxCount === 0) {
                        $(".loading").css("display", "none");
                    }
                }).error(function(data) {
                    ajaxCount--;
                    if (ajaxCount === 0) {
                        $(".loading").css("display", "none");
                    }
                });
            },
            Add: function(route, param, fun) {
                service.http.ajax({
                        type: route.Type,
                        url: route.Url,
                        data: param
                    })
                    .success(function(data) {
                        service.http.DataHandle(data, function(data) {
                            service.msg.popover(data ? "添加成功！" : "添加失败！");
                            if (fun) fun(data);
                        })
                    });
            },
            Edit: function(route, param, fun) {
                service.http.ajax({
                        type: route.Type,
                        url: route.Url,
                        data: param
                    })
                    .success(function(data) {
                        service.http.DataHandle(data, function(data) {
                            service.msg.popover(data ? "修改成功！" : "修改失败！");
                            if (fun) fun(data);
                        })
                    });
            },
            Save: function(route, param, fun) {
                service.http.ajax({
                        type: route.Type,
                        url: route.Url,
                        data: param
                    })
                    .success(function(data) {
                        service.http.DataHandle(data, function(data) {
                            service.msg.popover(data ? "保存成功！" : "保存失败！");
                            if (fun) fun(data);
                        })
                    });
            },
            Delete: function(route, param, fun) {
                var msg = "确定需要删除吗？";
                if (param.IdGuids && param.IdGuids.length > 1) {
                    msg = "确定要删除勾选的" + param.IdGuids.length + "条数据吗?";
                }
                service.msg.confirm(msg, function() {
                    service.http.ajax({
                            type: route.Type,
                            url: route.Url,
                            data: param
                        })
                        .success(function(data) {
                            service.http.DataHandle(data, function(data) {
                                if (data === 0) {
                                    service.msg.popover(data === 0 ? "删除成功！" : "删除失败！");
                                }
                                if (fun) fun(data);
                            })
                        });
                }, $.noop)
            },
            ResetPassword: function(route, param, fun) {
                service.msg.confirm("确定需要重置密码吗", function() {
                    service.http.ajax({
                            type: route.Type,
                            url: route.Url,
                            data: param
                        })
                        .success(function(data) {
                            service.http.DataHandle(data, function(data) {
                                service.msg.popover(data ? "重置成功！" : "重置失败！");
                                if (fun) fun(data);
                            })
                        });
                }, $.noop)
            },
            LoadData: function(route, param, fun) {
                service.http.ajax({
                        type: route.Type,
                        url: route.Url,
                        data: param
                    })
                    .success(function(data) {
                        service.http.DataHandle(data, function(data) {
                            if (fun) fun(data);
                        })
                    });
            },
            //同步请求
            LoadDataSync: function(route, param, fun) {
                service.http.asyncajax({
                    type: route.Type,
                    url: route.Url,
                    data: param,
                    success: function(data) {
                        if (fun) fun(data);
                    }
                })
            },
            ListDeff: function(List) {
                return List.filter(function(obj) {
                    if (obj.Checked) {
                        obj.Items = obj.Items.filter(function(o) {
                            if (o.Checked) {
                                o.DataState = 0;
                                return o;
                            } else {
                                if (o.OldCheck) {
                                    o.DataState = 1;
                                    return o;
                                }
                            }
                        })
                        return obj;
                    } else {
                        if (obj.OldCheck) {
                            obj.DataState = 1;
                            return obj;
                        }
                    }
                });
            },
            BuildListChecked: function(List, SelectList, filters, DotDelete) {
                if (!SelectList) {
                    return List;
                }
                return List = List.map(function(x) {
                    for (var i = 0; i < SelectList.length; i++) {
                        if (SelectList[i][filters] === x[filters] && SelectList[i].DataState !== 1) {
                            $.extend(x, {
                                checked: true,
                                Checked: true,
                                IsEnabled: SelectList[i].IsEnabled
                            });
                            if (!DotDelete) SelectList.splice(i, 1);
                            break;
                        }
                    }
                    return x;
                })
            },
            //根据ID获取数组中匹配项的DisplayName
            GetListName: function(ID, List, keyCode, valueCode) {
                return List.filter(function(x) {
                    return ID === x[keyCode];
                })[0][valueCode];
            },
            ClearTreeNode: function(tree) {
                //清空树所有的节点
                var list = tree.transformToArray(tree.getNodes());
                for (var i = 0; i < list.length; i++) {
                    tree.removeNode(list[i]);
                }
            }
        };
        return ret;
    })
    .factory('TreeOperate', function($http, service, $modal) {
        var ret = {
            removeNode: function(TreeData, node) {
                ret.eachNode(TreeData, node, "remove");
            },
            addNodes: function(TreeData, parentNode, newNodes) {
                for (var i = 0; i < newNodes.length; i++) {
                    if (parentNode) {
                        parentNode.Childrens.push(newNodes[i]);
                    } else {
                        TreeData.push(newNodes[i]);
                    }
                }
            },
            getNodes: function(TreeData) {
                return ret.eachNode(TreeData, null, "get");
            },
            eachNode: function(List, Node, type) {
                var all = [];
                for (var i = 0; i < List.length; i++) {
                    if (type == "get") {
                        all.push(List[i]);
                        if (List[i].Childrens) {
                            var children = ret.eachNode(List[i].Childrens, Node, type);
                            for (var j = 0; j < children.length; j++) {
                                all.push(children[j]);
                            };
                        }
                    } else {
                        if (Node === List[i]) {
                            if (type == "remove") {
                                List.splice(i, 1);
                            }
                            return true;
                        }
                        if (List[i].Childrens && ret.eachNode(List[i].Childrens, Node, type)) {
                            return false;
                        }
                    }
                }
                return all;
            }
        };
        return ret;
    })
    .factory('Dialog', function($http, service, $modal) {
        var ret = {
            Show: function(url, controller, size, param, fun) {
                var modal = $modal.open({
                    templateUrl: url,
                    controller: controller,
                    backdrop: "static",
                    size: size,
                    resolve: param
                });
                modal.result.then(function(result) {
                    if (fun) fun(result);
                });
            }
        };
        return ret;
    })
    .factory('ListOperate', function($http, service, $modal) {
        var ret = {
            Show: function(url, controller, size, param, fun) {
                var modal = $modal.open({
                    templateUrl: url,
                    controller: controller,
                    backdrop: "static",
                    size: size,
                    resolve: param
                })
                modal.result.then(function(result) {
                    if (fun) fun(result);
                })
            }
        };
        return ret;
    })
    .factory("zTreeOption", function() {
        var ret = {
            BuildConfig: function(config) {
                return $.extend(true, {
                    check: {
                        enable: true,
                        chkStyle: "checkbox"
                    },
                    data: {
                        simpleData: {
                            idKey: "Id",
                            pIdKey: "ParentId",
                            enable: true
                        }
                    }
                }, config);
            }
        }
        return ret;
    })
    .factory('manageService', function(service, Dialog, $compile, $timeout, $filter) {
        return {
            constructor: function($scope, gridOptions, controller, url) {
                var o = {};
                o.Page = {
                    PageIndex: 1,
                    PageSize: 50,
                    Count: 0
                };
                o.service = service; //$scope.service;
                o.$scope = $scope;
                o.gridOptions = gridOptions;
                o.dataService = $scope.dataService;
                o.dialog = Dialog; //$scope.dialog;
                o.controller = controller;
                o.url = url;
                o.userId = o.service.Cookie.Get("UserID");
                o.userName = o.service.Cookie.Get("UserName");
                o.appId = o.service.Cookie.Get("AppID");
                o.groupRelationId = o.service.Cookie.Get("GroupRelationID");
                o.groupRelationName = o.service.Cookie.Get("GroupRelationName");
                o.Add = function() {
                    var cur = this;
                    var data = {
                        DataState: state.Add,
                        DataSource: 2,
                        TypeId: "",
                        PluginId: "",
                        AddUser: cur.userId,
                        AddUserName: cur.userName,
                        AppId: cur.appId,
                        GroupRelationId: cur.groupRelationId,
                        GroupRelationName: cur.groupRelationName,
                        ModifyUser: cur.userId,
                        ModifyUserName: cur.userName
                    };
                    cur.dialog.Show(cur.url, cur.controller, "lg", {
                        data: function() {
                            return data;
                        }
                    }, function(result) {
                        if (result) {
                            if (cur.gridOptions.rowData.length > 0) {
                                cur.gridOptions.api.setFocusedCell(0, 0);
                            }
                            var curData = [];
                            curData.push(result);
                            if (cur.gridOptions.rowData.length >= cur.Page.PageSize) {
                                var data = cur.gridOptions.rowData.slice(0, cur.Page.PageSize - 1);
                                cur.gridOptions.rowData = curData.concat(data);
                            } else {
                                cur.gridOptions.rowData = curData.concat(cur.gridOptions.rowData);
                            }
                            cur.Page.PageIndex = 1;
                            cur.Page.Count++;
                            cur.gridOptions.api.onNewDatasource();

                        }
                    });
                };
                o.EditInfo = function(params) {
                    var cur = this;
                    if (!params && !cur.$scope.currentItem) {
                        cur.service.msg.alert("请选择要编辑的数据！");
                        return;
                    }
                    params = params || cur.$scope.currentItem.data;

                    var data = $.extend(params, {
                        DataState: state.Modify,
                        ModifyUser: cur.userId,
                        ModifyUserName: cur.userName
                    });
                    cur.dialog.Show(cur.url, cur.controller, "lg", {
                        data: function() {
                            return data;
                        }
                    }, function(result) {
                        if (result) {
                            $.extend(data, result);
                            var changeRows = [];
                            changeRows.push(data);
                            cur.gridOptions.api.rowDataChanged(changeRows);
                        }
                    });
                };
                o.DeleteSelect = function(params) {
                    var cur = this;
                    if (!params && !cur.$scope.currentItem) {
                        cur.service.msg.alert("请选择要删除的数据！");
                        return;
                    }
                    params = params || cur.$scope.currentItem.data;
                    cur.dataService.Delete(cur.$scope, params, function(data) {
                        if (data) {
                            if (cur.gridOptions.rowData.length < cur.Page.PageSize) {
                                cur.Page.PageIndex = 1;
                                cur.Page.Count = cur.Page.Count - 1;
                                cur.gridOptions.rowData.remove(params);
                                cur.gridOptions.api.setDatasource(cur.DataSource());
                            } else {
                                cur.Page.PageIndex = 1;
                                cur.gridOptions.rowData = undefined;
                                cur.gridOptions.api.setDatasource(cur.DataSource());
                            }
                            cur.$scope.currentItem = null;
                        }
                    });
                };
                o.DeleteAllSelect = function() {
                    var cur = this;
                    var checkedList = cur.$scope.getCheckedData(cur.gridOptions.rowData);
                    if (checkedList.length === 0) {
                        cur.service.msg.alert("请勾选要删除的数据");
                        return;
                    }
                    this.dataService.Delete(cur.$scope, checkedList, function(data) {
                        if (data > 0) {
                            cur.service.msg.alert("共有[" + data + "]条数据删除失败！");
                            if (data === checkedList.length) {
                                throw "";
                            }
                            return;
                        } else {
                            if (cur.gridOptions.rowData.length < cur.Page.PageSize) {
                                cur.Page.PageIndex = 1;
                                cur.Page.Count = cur.Page.Count - checkedList.length;
                                checkedList.forEach(function(obj) {
                                    cur.gridOptions.rowData.remove(obj);
                                });
                                cur.gridOptions.api.setDatasource(cur.DataSource());
                            } else {
                                cur.Page.PageIndex = 1;
                                cur.gridOptions.rowData = undefined;
                                cur.gridOptions.api.setDatasource(cur.DataSource());
                            }
                            cur.$scope.currentItem = null;
                        }
                    });
                };
                o.LoadData = function() {
                    var cur = this;
                    $timeout(function() {
                        cur.gridOptions.api.setDatasource(cur.DataSource());
                    }, 200);
                };
                o.DataSource = function() {
                    var cur = this;
                    return {
                        rowCount: null, // behave as infinite scroll
                        pageSize: cur.Page.PageSize,
                        overflowSize: 1,
                        maxConcurrentRequests: 1,
                        maxPagesInCache: 100,
                        getRows: function(params) {
                            if (!cur.gridOptions.Param) {
                                cur.gridOptions.Param = {};
                            }
                            cur.gridOptions.Param.filterModel = params.filterModel;

                            if (cur.gridOptions.enableServerSideFilter !== true && params.filterModel && Object.keys(params.filterModel).length > 0) {
                                var currentData = cur.gridOptions.api.gridOptionsWrapper.getRowData();
                                var resultDat = cur.Filter(params.filterModel, currentData, cur);
                                params.successCallback(resultDat, resultDat.length);
                            } else {
                                cur.Page.PageIndex = (params.startRow / cur.Page.PageSize) + 1;
                                cur.dataService.LoadPageData(cur.$scope, {
                                    PageIndex: cur.Page.PageIndex,
                                    PageSize: cur.Page.PageSize,
                                    Param: cur.gridOptions.Param
                                }, function(data) {
                                    //选择模式
                                    if (cur.gridOptions.selectMode === true && cur.gridOptions.selectData.length > 0) {
                                        var dic = cur.gridOptions.selectData.toDictionary();
                                        for (var i = 0; i < data.List.length; i++) {
                                            if (dic.hasOwnProperty(data.List[i].Id)) {
                                                data.List[i] = dic[data.List[i].Id];
                                            }
                                        }
                                    }
                                    if (cur.Page.PageIndex === 1) {
                                        cur.gridOptions.rowData = data.List;
                                        cur.Page.Count = data.Num;
                                    } else {
                                        cur.gridOptions.rowData = cur.gridOptions.rowData.concat(data.List);
                                    }
                                    var rowCount = -1; //计算是否到最后一行
                                    if (cur.gridOptions.rowData.length >= cur.Page.Count) {
                                        rowCount = cur.gridOptions.rowData.length;
                                    }
                                    params.successCallback(data.List, rowCount);
                                    if (cur.Page.PageIndex === 1) {
                                        cur.gridOptions.api.sizeColumnsToFit();
                                    }
                                });
                            }
                        }
                    }
                };
                o.Filter = function filterData(filterModel, data, cur) {
                    if (!data) {
                        return [];
                    }
                    var filterPresent = filterModel && Object.keys(filterModel).length > 0;
                    if (!filterPresent) {
                        return data;
                    }

                    var resultOfFilter = data;

                    for (var filter in filterModel) {
                        data = resultOfFilter;
                        for (var i = 0; i < data.length; i++) {
                            if (i === 0) {
                                resultOfFilter = [];
                            }
                            var item = data[i];
                            //字符串的
                            if (filterModel[filter].type && typeof(filterModel[filter].filter) === "string") {
                                if (filterModel[filter].type === 1) {
                                    if (item[filter].indexOf(filterModel[filter].filter) < 0) {
                                        continue;
                                    }
                                } else if (filterModel[filter].type === 2) {
                                    if (item[filter] !== filterModel[filter].filter) {
                                        continue;
                                    }
                                } else if (filterModel[filter].type === 3) {
                                    if (!item[filter].startsWith(filterModel[filter].filter)) {
                                        continue;
                                    }
                                } else {
                                    if (!item[filter].endsWith(filterModel[filter].filter)) {
                                        continue;
                                    }
                                }
                            }
                            //数组的
                            else if ($.isArray(filterModel[filter])) {
                                if (filterModel[filter].indexOf(item[filter]) < 0) {
                                    continue;
                                }
                            }
                            //数字
                            // EQUALS = 1;
                            // LESS_THAN = 2;
                            // GREATER_THAN = 3;
                            else if (typeof(filterModel[filter].filter) === "number") {
                                if (filterModel[filter] === 1) {
                                    if (item[filter] !== filterModel[filter].filter) {
                                        continue;
                                    }
                                } else if (filterModel[filter] === 2) {
                                    if (item[filter] >= filterModel[filter].filter) {
                                        continue;
                                    }
                                } else {
                                    if (item[filter] <= filterModel[filter].filter) {
                                        continue;
                                    }
                                }
                            }
                            resultOfFilter.push(item);
                        }
                    }
                    return resultOfFilter;
                }
                return o;
            },
            dataGridInit: function($scope) {
                $scope.no = $scope.no !== undefined ? $scope.no : true;
                $scope.checkBox = $scope.checkBox !== undefined ? $scope.checkBox : true;
                $scope.rowsAlreadyGrouped = $scope.rowsAlreadyGrouped !== undefined ? $scope.rowsAlreadyGrouped : false;
                $scope.enableColResize = $scope.enableColResize !== undefined ? $scope.enableColResize : true;
                $scope.enableSorting = $scope.enableSorting !== undefined ? $scope.enableSorting : false;
                $scope.rowHeight = $scope.rowHeight !== undefined ? $scope.rowHeight : 36;
                $scope.headerHeight = $scope.headerHeight !== undefined ? $scope.headerHeight : 36;
                $scope.angularCompileRows = $scope.angularCompileRows !== undefined ? $scope.angularCompileRows : true;
                $scope.groupSelectsChildren = $scope.groupSelectsChildren !== undefined ? $scope.groupSelectsChildren : true;
                $scope.showToolPanel = $scope.showToolPanel !== undefined ? $scope.showToolPanel : false;
                $scope.toolPanelSuppressPivot = $scope.toolPanelSuppressPivot !== undefined ? $scope.toolPanelSuppressPivot : true;
                $scope.cascadeChildren = $scope.cascadeChildren !== undefined ? $scope.cascadeChildren : true;
                $scope.enableServerSideFilter = $scope.enableServerSideFilter !== undefined ? $scope.enableServerSideFilter : true;
                $scope.columnDefs = [];
                if ($scope.no) {
                    $scope.columnDefs.push({
                        field: "No",
                        headerName: "#",
                        width: 40,
                        maxWidth: 40,
                        minWidth: 40,
                        suppressSorting: true,
                        suppressMenu: true,
                        suppressSizeToFit: false,
                        cellRenderer: function(params) {
                            return params.node.id + 1;
                        }
                    });
                }
                if ($scope.checkBox) {
                    $scope.columnDefs.push({
                        field: "CheckBox",
                        headerName: "选择",
                        gridOptionsName: "gridOptions",
                        suppressMenu: true,
                        width: 40,
                        maxWidth: 40,
                        minWidth: 40,
                        suppressSizeToFit: false,
                        suppressSorting: true
                    });
                }
                $scope.cellClicked = function(params) {
                    if (params.colDef.tree && params.node.expanded && !params.node.children) {
                        params.api.gridOptionsWrapper.gridOptions.event.LoadChildData(params.data, function(data) {
                            params.node.children = data;
                            if (params.data.IsChecked)
                                $scope.recursionData(params.node.children, params.data.IsChecked);
                            params.api.onNewRows();
                            params.api.sizeColumnsToFit();
                        });
                    } else if (params.colDef.field === "CheckBox") {
                        if (params.node.children && $scope.cascadeChildren) {
                            $scope.recursionData(params.node.children, !params.data.IsChecked);
                        }
                        if (params.api.gridOptionsWrapper.gridOptions.selectMode === true) {
                            if (!params.data.IsChecked) {
                                params.api.gridOptionsWrapper.gridOptions.selectData.push(params.data);
                            } else {
                                params.api.gridOptionsWrapper.gridOptions.selectData.remove(params.data);
                            }
                        }
                    }
                    $scope.currentItem = params;
                    $scope.currentGridOptions = params.api.gridOptionsWrapper.gridOptions;
                }
                $scope.rowClicked = function(params) {
                    if ($scope.preClass) {
                        $scope.preClass.classList.remove("ag-row-selected1");
                    }
                    params.eventSource.classList.add('ag-row-selected1');
                    $scope.preClass = params.eventSource;
                }
                $scope.groupExpanded = function() {
                    return '<img src="/Resources/images/ICON/minus.png" style="width: 16px;cursor: pointer;" />';
                }
                $scope.groupContracted = function() {
                    return '<img src="/Resources/images/ICON/plus.png" style="width: 16px;cursor: pointer;" />';
                }
                $scope.innerCellRenderer = function(params) {
                    var name = params.data.DisplayName || params.data.Name || params.data.GroupName;
                    var position = 10;
                    //    (params.node.level + 1) * 10;
                    //if (params.node.level === 0 && !params.node.group) {
                    //    position += 15;
                    //}
                    return "<span style='margin-left:" + position + "px'>" + name + "</span>";
                }
                $scope.headerCellRendererFunc = function(params) {
                    if (params.colDef.field === "CheckBox") {
                        params.colDef.cellStyle = {
                            'text-align': 'center'
                        };
                        params.colDef.width = 40;
                        params.colDef.maxWidth = 40;
                        params.colDef.suppressSorting = true;
                        params.colDef.suppressMenu = true;
                        params.colDef.checkboxSelection = true;
                        params.colDef.headerName = "选择";
                        params.colDef.suppressMenu = true;

                        var div =
                            "<CheckBox ngmodel='" + params.colDef.gridOptionsName + ".cascadeType' ngclass='headCheckbox' ngchange='headCheckChange(" + params.colDef.gridOptionsName + ")'></CheckBox>";
                        var content = $compile(div)($scope);
                        return content[0];
                    } else {
                        return params.colDef.headerName;
                    }
                }
                $scope.headCheckChange = function(gridOptions) {
                    var selectNodes = gridOptions.api.gridOptionsWrapper.getRowData();
                    $scope.recursionData(selectNodes, gridOptions.cascadeType);
                    if (gridOptions.selectMode === true) {
                        selectNodes.forEach(function(obj) {
                            if (gridOptions.cascadeType) {
                                gridOptions.selectData.push(obj);
                            } else {
                                gridOptions.selectData.remove(obj);
                            }
                        });
                    }
                }
                $scope.recursionData = function(data, isChecked) {
                    if (data)
                        angular.forEach(data, function(obj, index, array) {
                            if (obj.data) {
                                obj.data.IsChecked = isChecked;
                            } else {
                                obj.IsChecked = isChecked;
                            }
                            if (obj.children) {
                                $scope.recursionData(obj.children, isChecked);
                            }
                        });
                }
                $scope.operCellRendererFunc = function(params) {
                    var html = $('<div style="text-align:center;"></div>');
                    var btn = $('<div class="btn-group dropdown" dropdown />').appendTo(html);
                    btn.append('<button class="btn" dropdown-toggle style="border:0; background-color:transparent;">操作<span class="caret"></span></button>');
                    var btnList = $('<ul class="dropdown-menu"/>').appendTo(btn);
                    var isChild = false;
                    params.colDef.cellStyle = {
                        overflow: "visible",
                        padding: 0
                    };
                    ButtonList.GridButton.forEach(function(obj) {
                        if (params.api.gridOptionsWrapper.gridOptions.event.hasOwnProperty(obj.Code)) {
                            var event = (params.colDef.eventName || "gridOptions.event") + "." + obj.Code + "(data)";
                            btnList.append('<li ng-model="data" ng-click=' + event + ' title="' + (obj.Tip || obj.Name) + '"><a>' + (obj.Ico ? "<i class='Btn " + obj.Ico + "'></i>" : "") + '{{eventName.' + obj.Code + '||"' + obj.Name + '"}}</a></li>');
                            isChild = true;
                        }
                    });
                    return isChild ? html[0].outerHTML : "无操作";
                }
                $scope.serOldChecked = function(data) {
                    if (data)
                        angular.forEach(data, function(obj, index, array) {
                            if (obj.data) {
                                obj.data.OldChecked = obj.data.IsChecked;
                            } else {
                                obj.OldChecked = obj.IsChecked;
                            }
                            if (obj.children) {
                                $scope.serOldChecked(obj.children);
                            }
                        });
                }
                $scope.rowDoubleClicked = function(params) {
                    if (params.api.gridOptionsWrapper.gridOptions.event && params.api.gridOptionsWrapper.gridOptions.event.hasOwnProperty("EditInfo"))
                        params.api.gridOptionsWrapper.gridOptions.event.EditInfo(params.data);
                }
                $scope.sexCellRendererFunc = function(params) {
                    if (params.data.GroupUserGender === 0) {
                        return "女";
                    } else if (params.data.GroupUserGender === 1) {
                        return "男";
                    } else {
                        return "保密";
                    }
                };
                $scope.dateTimeToFormatFunc = function(params) {
                    return $filter('date')(params.data[params.colDef.field], 'yyyy-MM-dd HH:mm:ss');;
                };
                //
                $scope.CodeToDisplayFunc = function(params) {
                    var displayName;
                    switch (params.data[params.colDef.field]) {
                        case 0:
                            displayName = "已发布"
                            break;
                        case 1:
                            displayName = "已撤销"
                            break;
                        default:
                            displayName = "其他"
                            break;
                    }
                    return displayName;
                };

                function getChecked(data, result) {
                    angular.forEach(data, function(obj, index, array) {
                        if (obj.data && obj.data.IsChecked !== undefined && obj.data.IsChecked === true) {
                            result.push(obj.data);
                        } else if (obj.IsChecked !== undefined && obj.IsChecked === true) {
                            result.push(obj);
                        }
                        if (obj.children) {
                            getChecked(obj.children, result);
                        }
                    });
                }

                $scope.getCheckedData = function(data) {
                    var result = [];

                    if ($scope.checkBox) {
                        getChecked(data, result);
                    }
                    return result;
                }

                function getCheckedLeaf(data, result) {
                    if (data)
                        angular.forEach(data, function(obj, index, array) {
                            if (obj.children) {
                                angular.forEach(obj.children, function(o) {
                                    if (o.data.IsChecked && o.group === false) {
                                        result.push(o.data);
                                    }
                                });
                                getCheckedLeaf(obj.children, result);
                            } else {
                                if (obj.data.IsChecked && obj.group === false) {
                                    result.push(obj.data);
                                }
                            }
                        });
                }

                function getAllLeaf(data, result) {
                    if (data)
                        angular.forEach(data, function(obj, index, array) {
                            if (obj.children) {
                                angular.forEach(obj.children, function(o) {
                                    if (o.group === false) {
                                        result.push(o.data);
                                    }
                                });
                                getAllLeaf(obj.children, result);
                            }
                        });
                }

                $scope.getAllLeafData = function(data) {
                    var result = [];
                    if ($scope.checkBox) {
                        getAllLeaf(data, result);
                    }
                    return result;
                }
                $scope.getCheckedLeafData = function(data) {
                    var result = [];
                    if ($scope.checkBox) {
                        getCheckedLeaf(data, result);
                    }
                    return result;
                }

                function getCheckedLeafContainParent(data, result) {
                    if (data)
                        angular.forEach(data, function(obj, index, array) {
                            if (obj.children) {
                                var children = [];
                                angular.forEach(obj.children, function(o) {
                                    if (o.data.IsChecked) {
                                        children.push(o.data);
                                    }
                                });
                                if (children.length > 0) {
                                    result.push(obj);
                                }
                                getCheckedLeafContainParent(obj.children, result);
                            }
                        });
                }

                $scope.getCheckedLeafContainParentData = function(data) {
                    var result = [];
                    if ($scope.checkBox) {
                        getCheckedLeafContainParent(data, result);
                    }
                    return result;
                }

                $scope.getChangedCheckedLeafData = function(data) {
                    var result = $scope.getAllLeafData(data);
                    var changeReslut = [];
                    angular.forEach(result, function(obj, index, array) {
                        if (obj.IsChecked !== obj.OldChecked) {
                            if (obj.IsChecked === false) {
                                obj.DataState = 1;
                            } else {
                                obj.DataState = 0;
                            }
                            changeReslut.push(obj);
                        }
                    });
                    return changeReslut;
                }

                $scope.options = {
                    rowSelection: 'single',
                    rowsAlreadyGrouped: $scope.rowsAlreadyGrouped,
                    enableColResize: $scope.enableColResize,
                    enableSorting: $scope.enableSorting,
                    rowHeight: $scope.rowHeight,
                    headerHeight: $scope.headerHeight,
                    onCellClicked: $scope.cellClicked,
                    onRowClicked: $scope.rowClicked,
                    onRowDoubleClicked: $scope.rowDoubleClicked,
                    angularCompileRows: $scope.angularCompileRows,
                    groupSelectsChildren: $scope.groupSelectsChildren,
                    showToolPanel: $scope.showToolPanel,
                    toolPanelSuppressPivot: $scope.toolPanelSuppressPivot,
                    headerCellRenderer: $scope.headerCellRendererFunc,
                    enableServerSideFilter: $scope.enableServerSideFilter,
                    suppressMenuHide: true,
                    suppressLoadingOverlay: true,
                    rowBuffer: 0,
                    icons: {
                        groupExpanded: $scope.groupExpanded,
                        groupContracted: $scope.groupContracted
                    },
                    localeText: {
                        page: 'daPage',
                        more: 'daMore',
                        to: 'daTo',
                        of: 'daOf',
                        next: 'daNexten',
                        last: 'daLasten',
                        first: 'daFirsten',
                        previous: 'daPreviousen',
                        loadingOoo: '正在加载...',
                        // for set filter
                        selectAll: '选择所有',
                        searchOoo: '选择...',
                        blanks: '空',
                        // for number filter
                        equals: '等于',
                        lessThan: 'daLessThan',
                        greaterThan: 'daGreaterThan',
                        applyFilter: '<a class="btn btnlink" style="padding:0px 8px;">筛选</a>',
                        filterOoo: '请输入...',
                        // for text filter
                        contains: '包含',
                        startsWith: '从..开始',
                        endsWith: '以..结束',
                        // the header of the default group column
                        group: 'laGroup',
                        // tool panel
                        columns: '列名称',
                        pivotedColumns: 'laPivot Cols',
                        pivotedColumnsEmptyMessage: 'la please drag cols to here',
                        valueColumns: 'laValue Cols',
                        valueColumnsEmptyMessage: 'la please drag cols to here'
                    }
                };
            }
        }
    })
    .factory('editService', function(service) {
        return {
            constructor: function($scope) {
                this.Page = {
                    PageIndex: 1,
                    PageSize: 50,
                    Count: 0
                };
                this.service = service;
                this.$scope = $scope;
                this.dataService = $scope.dataService;
                this.$modalInstance = $scope.$modalInstance;
                this.$scope.isClose = true;
                return this;
            },
            Save: function() {
                var cur = this;
                this.dataService.Save(cur.$scope, cur.$scope.model, function(data) {
                    if (data) {
                        if (cur.$scope.isClose === true) {
                            cur.$modalInstance.close(data);
                        } else { //重复添加时不关闭弹出框
                            cur.$scope.model = $.extend({}, cur.$scope.data);
                        }
                    }
                });
            },
            Close: function() {
                this.$modalInstance.close();
            }
        };
    })
    .factory('treeManageService', function(service, Dialog, manageService) {
        return {
            constructor: function($scope, gridOptions, controller, url) {
                var o = {};
                o.Page = {
                    PageIndex: 1,
                    PageSize: 50,
                    Count: 0
                };
                o.service = service;
                o.$scope = $scope;
                o.gridOptions = gridOptions;
                o.dataService = $scope.dataService;
                o.dialog = Dialog;
                o.controller = controller;
                o.url = url;
                o.userId = o.service.Cookie.Get("UserID");
                o.userName = o.service.Cookie.Get("UserName");
                o.appId = o.service.Cookie.Get("AppID");
                o.groupRelationId = o.service.Cookie.Get("GroupRelationID");
                o.groupRelationName = o.service.Cookie.Get("GroupRelationID");
                o.AddRoot = function() {
                    var cur = this;
                    var data = {
                        DataState: state.Add,
                        DataSource: 2,
                        TypeId: "",
                        PluginId: "",
                        AddUser: cur.userId,
                        AddUserName: cur.userName,
                        AppId: cur.appId,
                        GroupRelationId: cur.groupRelationId,
                        GroupRelationName: cur.groupRelationName,
                        ModifyUser: cur.userId,
                        ModifyUserName: cur.userName
                    };
                    cur.dialog.Show(cur.url, cur.controller, "lg", {
                        data: function() {
                            return data;
                        },
                        parent: function() {
                            return null;
                        }
                    }, function(result) {
                        if (result) {
                            cur.gridOptions.rowData.push({
                                data: result,
                                group: false,
                                children: []
                            });
                            cur.gridOptions.api.onNewRows();
                        }
                    });
                };
                o.AddChild = function(params) {
                    var cur = this;
                    var data = {
                        DataState: state.Add,
                        DataSource: 2,
                        TypeId: "",
                        PluginId: "",
                        AddUser: cur.userId,
                        AddUserName: cur.userName,
                        AppId: cur.appId,
                        GroupRelationId: cur.groupRelationId,
                        GroupRelationName: cur.groupRelationName,
                        ModifyUser: cur.userId,
                        ModifyUserName: cur.userName
                    };
                    cur.dialog.Show(cur.url, cur.controller, "lg", {
                        data: function() {
                            return data;
                        },
                        parent: function() {
                            return params || cur.$scope.currentItem.data;
                        }
                    }, function(result) {
                        if (result) {
                            if (!$scope.currentItem.node.children && $scope.currentItem.node.group) {
                                return;
                            }
                            if (!$scope.currentItem.node.children) {
                                $scope.currentItem.node.children = [];
                            }
                            $scope.currentItem.node.group = true;
                            if ($scope.currentItem.node.data.RgtId) {
                                $scope.currentItem.node.data.RgtId++;
                            }
                            $scope.currentItem.node.children.push({
                                data: result,
                                group: false,
                                children: []
                            });
                            cur.gridOptions.api.onNewRows();

                        }
                    });
                };
                o.EditInfo = function(params) {
                    var cur = this;
                    if (!params && !cur.$scope.currentItem) {
                        cur.service.msg.alert("请选择要编辑的数据！");
                        return;
                    }
                    params = params || cur.$scope.currentItem.data;

                    var data = $.extend(params, {
                        DataState: state.Modify,
                        ModifyUser: cur.userId,
                        ModifyUserName: cur.userName
                    });
                    cur.dialog.Show(cur.url, cur.controller, "lg", {
                        data: function() {
                            return data;
                        },
                        parent: function() {
                            //if (params || (params.Id === cur.$scope.currentItem.data.Id)) {
                            //    return cur.$scope.currentItem.node.parent;
                            //}
                            return {};
                        }
                    }, function(result) {
                        if (result) {
                            $.extend($scope.currentItem.data, result);
                            $scope.gridOptions.api.onNewRows();
                        }
                    });
                };
                o.DeleteSelect = function(params) {
                    var cur = this;
                    if (!params && !cur.$scope.currentItem) {
                        cur.service.msg.alert("请选择要删除的数据！");
                        return;
                    }
                    params = params || cur.$scope.currentItem.data;
                    cur.dataService.Delete(cur.$scope, params, function(data) {
                        if ($scope.currentItem.node.parent) {
                            $scope.currentItem.node.parent.children.remove($scope.currentItem.node);
                            if ($scope.currentItem.node.parent.children.length === 0) {
                                $scope.currentItem.node.parent.group = false;
                            }
                        } else {
                            $scope.gridOptions.rowData.remove($scope.currentItem.node);
                        }
                        $scope.gridOptions.api.onNewRows();
                        $scope.currentItem = null;
                    });
                };
                o.DeleteAllSelect = function() {
                    var cur = this;
                    var checkedList = cur.$scope.getCheckedLeafData(cur.gridOptions.rowData);
                    if (checkedList.length === 0) {
                        cur.service.msg.alert("请注意父节点不可直接删除，请勾选要删除的子节点数据");
                        return;
                    }
                    this.dataService.Delete(cur.$scope, checkedList, function(data) {
                        if (data > 0) {
                            cur.service.msg.alert("共有[" + data + "]条数据删除失败！");
                        }
                        cur.LoadData();
                    });
                };
                o.LoadData = function(params) {
                    var cur = this;
                    this.dataService.LoadData(this.$scope, params, function(data) {
                        cur.gridOptions.rowData = data;
                        cur.gridOptions.api.onNewRows();
                        cur.gridOptions.api.sizeColumnsToFit();
                        cur.currentItem = null;
                    });
                };
                o.LoadChildData = function(params, fun) {
                    this.dataService.LoadChildData($scope, params, fun);
                }
                return o;
            },
            dataGridInit: function($scope) {
                manageService.dataGridInit($scope);
            }
        }
    })
    .factory('ztreeSettingService', function() {
        return {
            constructor: function($scope, attr, getAsyncUrl) {
                var p = (attr.cp || "") + (attr.cc || "");
                var id = common.buildGuid();
                attr.multiselect = attr.multiselect || "true";
                attr.globalsingle = attr.globalsingle || "true";
                attr.selectmode = attr.selectmode || "true";
                var chkStyle = attr.multiselect === "true" ? "checkbox" : "radio";
                var radioType = attr.globalsingle === "true" ? "all" : "level";
                var setting = {
                    treeId: id,
                    async: {
                        contentType: "application/json",
                        enable: true,
                        type: "GET",
                        url: getAsyncUrl
                    },
                    edit: {
                        enable: attr.edit
                    },
                    check: {
                        enable: attr.selectmode === "true",
                        chkboxType: {
                            "Y": p,
                            "N": p
                        },
                        chkStyle: chkStyle,
                        radioType: radioType
                    },
                    data: {
                        simpleData: {
                            idKey: "Id",
                            pIdKey: "ParentId",
                            enable: true
                        },
                        key: {
                            name: "Name",
                            checked: "IsChecked",
                            isParent: "IsParent",
                            open: "IsOpen",
                            children: "Children"
                        }
                    },
                    view: {
                        showLine: false
                    },
                    callback: {
                        onClick: function(event, treeId, treeNode) {
                            $scope.$apply(function() {
                                if (attr.tree) {
                                    $scope[attr.tree].SelectNode = treeNode;
                                } else {
                                    $scope.SelectNode = treeNode;
                                }
                            });
                        },
                        onCheck: function(event, treeId, treeNode) {
                            $scope.$apply(function() {
                                if (attr.tree && $scope[attr.tree].checkFun) {
                                    $scope[attr.tree].checkFun(treeNode);
                                }
                            });
                        },
                        onNodeCreated: function(event, treeId, treeNode) {
                            $scope.$apply(function() {
                                if (attr.tree && $scope[attr.tree].createNode) {
                                    $scope[attr.tree].createNode(treeNode);
                                }
                            });
                        },
                        onAsyncSuccess: $scope.asyncSuccess
                    }
                };
                return setting;
            }
        }
    });
