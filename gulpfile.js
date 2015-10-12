var gulp   = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass   = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');


var sourceFiles = {
  js: ['./src/javascripts/**/*.js', './src/javascripts/*.js'],
  css: ['./src/stylesheets/**/*.css', './src/stylesheets/*.css']
};


gulp.task('default', ['watch']);


gulp.task('js', function() {
  return gulp.src(sourceFiles.js)
    .pipe(sourceMaps.init())
    .pipe(uglify())
    .pipe(concat('app.bundle.js'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./public/javascripts'))
});

gulp.task('css', function() {
  return gulp.src(sourceFiles.css)
    .pipe(sourceMaps.init())
    .pipe(minifyCss())
    .pipe(concat('app.bundle.css'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('./public/stylesheets'))
});

gulp.task('watch', function() {
  gulp.watch(sourceFiles.js, ['js'])
  gulp.watch(sourceFiles.css, ['css'])
});