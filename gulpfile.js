"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use convential text streams with Gulp
var concat = require('gulp-concat'); // concatenates files
var lint = require('gulp-eslint') // Lint JS files, including JSX

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    path: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/build/toastr.css'
        ],
        mainJs: './src/main.js',
        dist: './dist'
    }
}

// Start a local development server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function () {
    gulp.src(config.path.html)
        .pipe(gulp.dest(config.path.dist))
        .pipe(connect.reload());
});

gulp.task('images', function () {

    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.path.dist));

    gulp.src(config.path.images)
        .pipe(gulp.dest(config.path.dist + '/images'))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    browserify(config.path.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.path.dist + '/scripts'))
        .pipe(connect.reload());
})

gulp.task('css', function () {
    gulp.src(config.path.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.path.dist + '/css'));
});

gulp.task('watch', function () {
    gulp.watch(config.path.html, ['html']);
    gulp.watch(config.path.images, ['images']);
    gulp.watch(config.path.js, ['js', 'lint']);
});

gulp.task('lint', function () {
    return gulp.src(config.path.js)
        .pipe(lint({ config: 'eslint.config.json' }))
        .pipe(lint.format());
})

gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);