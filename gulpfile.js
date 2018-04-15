const gulp = require("gulp");
const less = require("gulp-less")

gulp.task('less', () => {
  gulp.src('./public/less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css/'))
});

gulp.task('watch', () => {
  gulp.watch(['./public/less/*.less'], ['less'])
});

gulp.task('default', ['less', 'watch']);
//call with gulp in terminal
