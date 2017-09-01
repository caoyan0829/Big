

//gulp
//var gulp =require("gulp");
//gulp.src("code/PlaneGame.html")  //要处理的文件
//	.pipe(gulp.dest("gulp"));  //处理完的文件存放的目录
//
////任务
//gulp.task("one",function(){
//	console.log(1);
//})
var obj = {
	removeComments: true, //清除HTML注释
	collapseWhitespace: true, //压缩HTML
	collapseBooleanAttributes: true,//省略布尔属性的值<input checked="true"/> ==> <input checked/>
	removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
	removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
	removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
	minifyJS: true, //压缩页面JS
	minifyCSS: true //压缩页面CSS
}

//使用gulp插件
var gulp=require("gulp");
var htmlmin=require("gulp-htmlmin");
var uglify = require('gulp-uglify'); //js压缩插件
var minifyCss = require('gulp-minify-css'); //css压缩插件
var babel = require('gulp-babel');  //es6转es5
//压缩html1
gulp.task("htmlTask",function(){
	gulp.src("code/PlaneGame.html")
		.pipe(htmlmin(obj))   //调用插件
		.pipe(gulp.dest("gulp"));
})
//压缩html2
gulp.task("htmlTask2",function(){
	gulp.src("code/Phangbang.html")
		.pipe(htmlmin(obj))   //调用插件
		.pipe(gulp.dest("gulp"));
})
//压缩js
gulp.task('jsTask', function(){
	gulp.src('code/*.js')
//	.pipe(bom()) 
	.pipe(uglify())
	.pipe(gulp.dest('gulp'));
});

//压缩css
gulp.task('cssTask', function(){
	gulp.src('code/*.css')
	.pipe(minifyCss())
	.pipe(gulp.dest('gulp'));
});
//压缩ES6的文件
gulp.task('jsTask3', function(){
	gulp.src(['code/ES6_1.js','code/ES6_2.js'])
	.pipe(babel({"presets": ["es2015"]})) //es6转es5
	.pipe(uglify()) //js压缩
	.pipe(gulp.dest('gulp'));
});

//任务名字
gulp.task("default",["jsTask3"]);












