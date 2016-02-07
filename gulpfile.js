const gulp = require('gulp');
// js
const rollup = require('gulp-rollup');
const npm = require('rollup-plugin-npm');
const babel = require('rollup-plugin-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
// css
const stylus = require('gulp-stylus');
const cssmin = require('gulp-cssmin');

gulp.task('css-dev', function() {
    return gulp.src('app/src/stylus/index.styl')
        .pipe(stylus())
        .pipe(gulp.dest('app/dist'));
});

gulp.task('css-prd', function() {
    return gulp.src('app/src/stylus/index.styl')
        .pipe(stylus())
        .pipe(cssmin())
        .pipe(gulp.dest('app/dist'));
});

gulp.task('js-dev', function() {
    return gulp.src('app/src/js/index.js')
        .pipe(rollup({
            format: 'iife',
            sourceMap: true,
            plugins: [
                npm({ jsnext: true, main: true }),
                babel({ exclude: 'node_modules/**'})
            ]
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('app/dist'));
});

gulp.task('js-prd', function() {
    return gulp.src('app/src/js/index.js')
        .pipe(rollup({
            format: 'iife',
            plugins: [
                npm({ jsnext: true, main: true }),
                babel({ exclude: 'node_modules/**'})
            ]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('app/dist'));
});

gulp.task('watch', ['js-dev', 'css-dev'], function() {
    gulp.watch('app/src/js/**/*.js', ['js-dev']);
    gulp.watch('app/src/stylus/**/*.styl', ['css-dev']);
});

gulp.task('build', ['js-prd', 'css-prd']);
gulp.task('dev', ['js-dev', 'css-dev']);
