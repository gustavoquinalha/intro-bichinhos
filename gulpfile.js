var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uncss = require('gulp-uncss');

gulp.task('build-img', function(){
    gulp.src('img/**/*')
                   .pipe(imagemin())
                   .pipe(gulp.dest('img'));
})

gulp.task('default', function () {
    return gulp.src('css/bichinhos.css')
        .pipe(uncss({
            html: ['*.html']
        }))
        .pipe(gulp.dest('css/out'));
});
