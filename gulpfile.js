var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uncss = require('gulp-uncss');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var browserSync = require('browser-sync').create();
var zip = require('gulp-zip');
var responsive = require('gulp-responsive');
var load = require('gulp-load-plugins')();
const Pageres = require('pageres');



// SCREENSHOT
gulp.task('pg', function(){
  const pageres = new Pageres({delay: 2})
	.src('index.html', ['480x320', '1024x768', 'iphone 5s'])
  .dest('prints')
	.run()
	.then(() => console.log('done'));
});
// SCREENSHOT

// RESIZE IMAGES
gulp.task('resize-img', function () {
  return gulp.src('img/*.{jpg,png}')
    .pipe(load.responsive({
      '*.jpg': [{
        width: 100,
        rename: {
          suffix: '-thumb',
        }
      }, {
        width: 300,
        rename: {
          suffix: '-medium',
          // extname: '.jpg',
        },
      }, {
        width: 900,
        rename: {
          suffix: '-big',
        },
        // Do not enlarge the output image if the input image are already less than the required dimensions.
        withoutEnlargement: true,
      }],

      '*.png': [{
        width: 100,
        rename: {
          suffix: '-thumb',
        }
      }, {
        width: 300,
        rename: {
          suffix: '-medium',
          // extname: '.jpg',
        },
      }, {
        width: 900,
        rename: {
          suffix: '-big',
        },
        // Do not enlarge the output image if the input image are already less than the required dimensions.
        withoutEnlargement: true,
      }]

    }, {
      // Global configuration for all images
      // The output quality for JPEG, WebP and TIFF output formats
      quality: 70,
      // Use progressive (interlace) scan for JPEG and PNG output
      progressive: true,
      // Strip all metadata
      withMetadata: false,
      // Do not emit the error when image is enlarged.
      errorOnEnlargement: false,
    }))
    .pipe(gulp.dest('img/dist'));
});
// RESIZE IMAGES

// ZIP-ARCHIVES
gulp.task('zip', function(){
	gulp.src('./img/*')
		.pipe(zip('archive.zip'))
		.pipe(gulp.dest('download'))
});
//ZIP-ARCHIVES

// BROWSER-SYNC
gulp.task('browser-sy', function() {
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

//MINIFIC JS
gulp.task('minifi-js', function(){
    gulp.src('js/test/all.js')
      .pipe(concat('final.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('js'))
});
//MINIF JS

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
