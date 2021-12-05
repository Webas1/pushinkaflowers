var
	gulp         = require("gulp"),
	livereload   = require("gulp-livereload");

gulp.task("reload-css", function(){
	gulp.src("*.css")
	.pipe(livereload());
})

gulp.task("default",function(){
	livereload.listen();
gulp.watch("*.css",['reload-css']);
}	