;'use strict';

const gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb');

var scssFold = 'source/scss/*.scss';

// Source
var globalPartsSrc = 'source/templates/global/**',
    sectionsSrc = 'source/templates/sections/**',
    pagesSrc = 'source/*.php',
    styleSrc = 'source/scss/style.scss',
    singleSrc = 'source/single/**/*.*',
    jsSrc = 'source/js/*.*',
    fontsSrc = 'source/fonts/**',
    imgSrc = 'source/img/**';

// Build
var globalPartsDest = 'build/templates/global',
    sectionsDest = 'build/templates/sections',
    pagesDest = 'build',
    styleDest = 'build/css',
    singleDest = 'build',
    jsDest = 'build/js',
    fontsDest = 'build/fonts',
    imgDest = 'build/img';

// Sections
gulp.task('sections', function () {
    gulp.src(sectionsSrc)
        .pipe(gulp.dest(sectionsDest));
});

// Global parts
gulp.task('global-parts', function () {
    gulp.src(globalPartsSrc)
        .pipe(gulp.dest(globalPartsDest));
});

// Pages
gulp.task('pages', function () {
    gulp.src(pagesSrc)
        .pipe(gulp.dest(pagesDest));
});

// Single pages (posts, projects etc)
gulp.task('single', function () {
    gulp.src(singleSrc)
        .pipe(gulp.dest(singleDest));
});

// Styles
gulp.task('styles', function() {
    return sass(styleSrc)
        .pipe(autoprefixer('last 2 version'))
        .pipe(csscomb())
        .pipe(gulp.dest(styleDest));
});

// JavaScript
gulp.task('js', function() {
    gulp.src(jsSrc)
        .pipe(gulp.dest(jsDest));
});

// Fonts
gulp.task('fonts', function() {
    gulp.src(fontsSrc)
        .pipe(gulp.dest(fontsDest));
});

// Images
gulp.task('img', function() {
    gulp.src(imgSrc)
        .pipe(gulp.dest(imgDest));
});

// Watcher
gulp.task('watch', function() {
    gulp.watch(scssFold, ['styles']);
    gulp.watch(sectionsSrc, ['sections']);
    gulp.watch(pagesSrc, ['pages']);
    gulp.watch(singleSrc, ['single']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch(imgSrc, ['img']);
    gulp.watch(fontsSrc, ['fonts']);
});

// Default (gulp) task
gulp.task('default', ['js', 'img', 'fonts',
    'styles', 'single', 'sections', 'global-parts', 'pages', 'watch']);