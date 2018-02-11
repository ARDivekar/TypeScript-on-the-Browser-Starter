var gulp = require("gulp");
var deleteFile = require('gulp-delete-file');
var browserify = require("browserify");
var vsource = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');

var SOURCE_DIR = 'src';
var BUILD_DIR = 'build';
var MINIFIED_OUT_FILE = 'allFiles-min.js';

/* delete all *.js files in the src/ folder */
gulp.task('js-src-clean', function () {
    var regexp = /.*\.js$/
    gulp.src([
        './' + SOURCE_DIR + '/**/*.js'
    ]).pipe(deleteFile({
        reg: regexp,
        deleteMatch: true
    }));
}); 

/* Delete all files in the "build" folder. */
gulp.task('clean-js', function () {
    var regexp = /.*\.js/;
    gulp.src(['./' + BUILD_DIR + '/*'
    ]).pipe(deleteFile({
        reg: regexp,
        deleteMatch: true
    }));
});


gulp.task("copy-html", function () {
    return gulp.src([SOURCE_DIR + '/*.html'])
        .pipe(gulp.dest(BUILD_DIR));
});

gulp.task("debug", ["clean-js", "copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [SOURCE_DIR + '/main.ts'],
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
        .pipe(gulp.dest(BUILD_DIR));
});

gulp.task("prod", ["clean-js", "copy-html"], function () {
    return browserify({
        basedir: '.',
        entries: [SOURCE_DIR + '/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(vsource(MINIFIED_OUT_FILE))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(BUILD_DIR));
});
