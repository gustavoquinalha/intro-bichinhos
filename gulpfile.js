var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uncss = require('gulp-uncss');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var localScreenshots = require('gulp-local-screenshots');
var browserSync = require('browser-sync').create();


gulp.task('screens', function () {
  gulp.src('index.html')
  .pipe(localScreenshots({
    width: ['380']
   }))
  .pipe(gulp.dest('./prints/'));
});


// BROWSER-SYNC
gulp.task('bb', function() {
   browserSync.init({
      server: {
         baseDir: ''
      },
   })
})
// BROWSER-SYNC

// MINIFIC-IMGS
gulp.task('build-img', function(){
    gulp.src('img/**/*')
     .pipe(imagemin())
     .pipe(gulp.dest('img'));
})
// MINIFIC-IMGS

// CONCACTENE-JS
gulp.task('build-js', function(){
    gulp.src('js/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('js/test/'))
})
// CONCACTENE-JS

// BUILD-CSS
gulp.task('build-css', function(){
    gulp.src('css/*.css')
      .pipe(concat('all.css'))
      .pipe(gulp.dest('css'))
});
// BUILD-CSS

// UNCSS
gulp.task('un-css', function () {
    return gulp.src('css/all.css')
        .pipe(uncss({
            html: ['*.html'],
            js: ['*.js']
        }))
        .pipe(rename('final-clean.css'))
        .pipe(gulp.dest('css/final'))
});
// UNCSS

// MINIFIC-CSS
gulp.task('minifi-css', function(){
    gulp.src('css/final/final-clean.css')
      .pipe(concat('minific.min.css'))
      .pipe(uglify())
      .pipe(gulp.dest('css'))
});
// MINIFIC-CSS

// TOPTOPTOP
gulp.task('css', function(){
   gulp.src('css/*.css')
   .pipe(concat('master.min.css'))
   .pipe(uncss({
       html: ['*.html'],
       js: ['*.js']
   }))
   .pipe(minify())
   .pipe(gulp.dest('css'));
});
// TOPTOPTOP



// gulp.task('css-top', function(){
//
//   gulp.src('css/*.css')
//     .pipe(concat('all.css'))
//     .pipe(gulp.dest('css'))
//
//    gulp.src('css/*.css')
//    .pipe(concat('master.min.css'))
//    .pipe(uncss({
//        html: ['*.html'],
//        js: ['*.js']
//    }))
//
//
//    .pipe(minify())
//    .pipe(gulp.dest('css'));
// });




// gulp.task('js-top', function(){
//     gulp.src('js/*.js')
//       .pipe(concat('all.js'))
//       .pipe(gulp.dest('js/test/'))
//
//     gulp.src('js/*.js')
//       .pipe(concat('all.min.js'))
//       .pipe(uglify())
//       .pipe(gulp.dest('js/test/'))
// })
//
//
// gulp.task('css-top', function () {
//
//   gulp.src('css/*.css')
//     .pipe(concat('copiled.css'))
//     .pipe(gulp.dest('css'));
//
//
//    gulp.src('css/*.css')
//       .pipe(uncss({
//           html: ['*.html'],
//           js: ['*.js']
//       }))
//       .pipe(rename('clean.css'))
//       .pipe(gulp.dest('css'));
//
//
// })
//
// gulp.task('minific', function (){
//   gulp.src('css/*.css')
//     .pipe(uglify())
//     .pipe(concat('style.min.css'))
//     .pipe(gulp.dest('css'))
// })
