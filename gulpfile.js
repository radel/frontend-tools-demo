// Include gulp
var gulp = require('gulp');

// Include Our Plugins
// Load plugins
var $ = require('gulp-load-plugins')({camelize: true});
    browserSync = require('browser-sync'),
    reload = browserSync.reload,


gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});


gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe($.sass({includePaths: ['bower_components/foundation/scss']}))
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream:true}));
});

gulp.task('reload', function() {
    gulp.src('**/*.html')
    .pipe(reload({stream:true}));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe($.concat('all.js'))
        // .pipe(gulp.dest('./dist'))
        // .pipe($.rename('all.min.js'))
        // .pipe($.uglify())
        // .pipe(gulp.dest('./dist'))
        .pipe($.connect.reload());
});


// Connect Server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

// Watch
gulp.task('watch', ['lint', 'sass', 'scripts'], function () {
    // Watch for changes in `app` folder
    gulp.watch([
        './*.html',
        './scss/**/*.scss',
        './js/**/*.js'
    ]);

    // Watch .scss files
    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('*.html',['reload']);
    // Watch .js files
    gulp.watch('./js/*.js', ['lint', 'scripts']);

});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'browserSync','watch']);