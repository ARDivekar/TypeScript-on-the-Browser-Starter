/* gulp/ts-browserify-main2.ts */
var gulp = require('gulp'),
    browserify = require('browserify'),
    tsify = require("tsify"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    fs = require('fs'), 
    factor = require('factor-bundle'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function (
    SOURCE_DIR,
    BUILD_DIR,
    SOURCE_MAPS_DIR
) {
    gulp.task('ts-browserify-main2', ['js-clean-src', 'clean-build', 'ts-browserify-animal-module'], function () {
        return browserify()
        .add(SOURCE_DIR + '/' + 'main2.ts')
        .plugin(tsify)
        .external('./' + SOURCE_DIR + '/' + 'AnimalLib/index.ts')
        .on('dep', function (dep) {
            console.log("Included in bundle: " + dep.file);
        })
        .bundle()
        .pipe(source("main2.js"))
        .pipe(gulp.dest(BUILD_DIR));
    });
}