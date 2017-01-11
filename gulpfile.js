/**
 * gulp启动文件
 */
var gulp = require('gulp'), //gulp主体
    connect = require('gulp-connect'), //web服务
    gulpSequence = require('gulp-sequence'), //控制gulp执行任务的顺序
    //https://github.com/sindresorhus/opn
    opn = require('opn') //打开浏览器

/**
 * '^/api/(.*)$ http://localhost:8081/api/$1 [P]本地api
 * '^/ecm_api/(.*)$ http://192.168.7.43:8080/ecm_api [P]' Java后端测试api
 * Last [L] If a path matches, any subsequent rewrite rules will be disregarded.
 * Proxy [P] Proxy your requests
 * Type [T=*] (replace * with mime-type) Sets content-type to the specified one.
 * Host [H], [H=*] (replace * with a regular expression that match a hostname)
 * web服务
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'app',
        livereload: false,
        port: 8081
    });
});

//打开浏览器
gulp.task('openBrowser', function() {
    opn('http://127.0.0.1:8081/');
});

gulp.task('default', gulpSequence('webserver','openBrowser'));