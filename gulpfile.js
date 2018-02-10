var gulp = require("gulp");
var deleteFile = require('gulp-delete-file');
var browserify = require("browserify");
var vsource = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var BUILD_DIR_NAME = 'build';
var MINIFIED_OUT_FILE = 'allFiles-min.js';

/* delete all *.js files in the src/ folder */
gulp.task('js-src-clean', function () {
    var regexp = /.*\.js$/
    gulp.src([
        './src/**/*.js'
    ]).pipe(deleteFile({
        reg: regexp,
        deleteMatch: true
    }));
});

/* Delete all files in the "build" folder. */
gulp.task('clean', function () {
    var regexp = /.*/;
    gulp.src(['./build/*'
    ]).pipe(deleteFile({
        reg: regexp,
        deleteMatch: true
    }));
});

var paths = {
    pages: ['src/*.html']
};
gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(BUILD_DIR_NAME));
});

gulp.task("debug", ["clean", "copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(vsource(MINIFIED_OUT_FILE))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(BUILD_DIR_NAME));
});

gulp.task("prod", ["clean", "copy-html"], function () {
    return browserify({
        basedir: '.',
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(vsource(MINIFIED_OUT_FILE))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_DIR_NAME));
});