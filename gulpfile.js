;'use strict';

const gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb');

var scssFold = 'source/scss/*.scss';

// Source
var sectionsGlobalSrc = 'source/templates/sections/global/**',
    sectionsLocalSrc = 'source/templates/sections/local/**',
    pagesSrc = 'source/templates/pages/*.php',
    indexSrc = 'source/index.php',
    styleSrc = 'source/scss/style.scss',
    postsSrc = 'source/templates/posts/*.*',
    jsSrc = 'source/js/*.*',
    fontsSrc = 'source/fonts/**',
    imgSrc = 'source/img/**';

// Build
var sectionsGlobalDest = 'build/templates/sections/global',
    sectionsLocalDest = 'build/templates/sections/local',
    pagesDest = 'build',
    indexDest = 'build',
    styleDest = 'build/css',
    postsDest = 'build',
    jsDest = 'build/js',
    fontsDest = 'build/fonts',
    imgDest = 'build/img';

// Sections
gulp.task('sections-local', function () {
    gulp.src(sectionsLocalSrc)
        .pipe(gulp.dest(sectionsLocalDest));
});

// Sections global
gulp.task('sections-global', function () {
    gulp.src(sectionsGlobalSrc)
        .pipe(gulp.dest(sectionsGlobalDest));
});

// Index
gulp.task('index', function () {
    gulp.src(indexSrc)
        .pipe(gulp.dest(indexDest));
});

// Pages
gulp.task('pages', function () {
    gulp.src(pagesSrc)
        .pipe(gulp.dest(pagesDest));
});

// Posts
gulp.task('posts', function () {
    gulp.src(postsSrc)
        .pipe(gulp.dest(postsDest));
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
    gulp.watch(sectionsLocalSrc, ['sections-local', 'pages', 'index']);
    gulp.watch(sectionsGlobalSrc, ['sections-global', 'pages', 'index']);
    gulp.watch(pagesSrc, ['pages']);
    gulp.watch(postsSrc, ['posts']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch(imgSrc, ['img']);
    gulp.watch(fontsSrc, ['fonts']);
});

// Default (gulp) task
gulp.task('default', ['js', 'img', 'fonts',
    'styles', 'posts', 'sections-local', 'sections-global', 'pages', 'index', 'watch']);