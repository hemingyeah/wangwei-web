// config

var app =  
angular.module('app')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', '$locationProvider', function($translateProvider, $locationProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
    /*启用html5路由模式*/
    // $locationProvider.html5Mode({
    //     enabled: true
    // });
    // 
    

    //日期控件全局配置
    // ADMdtp.setOptions({
    //     calType: 'gregorian',
    //     format: 'YYYY-MM-DD hh:mm',
    //     default: 'today',
    //     // transition:false//去掉切换动画效果
    //     // transition:false//去掉切换动画效果
    // });
  }]);