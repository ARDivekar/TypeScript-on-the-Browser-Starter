/* gulp/ts-browserify-animal-module.ts */
var gulp = require('gulp'),
    browserify = require('browserify'),
    tsify = require("tsify"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps'),
    transform = require('vinyl-transform');

module.exports = function (
    SOURCE_DIR,
    BUILD_DIR,
    SOURCE_MAPS_DIR
) {
    var entries = [
        SOURCE_DIR + '/' + 'AnimalLib/index.ts'
    ]
    gulp.task('ts-browserify-animal-module', function () {
        return browserify()
        .require(
            './' + SOURCE_DIR + '/' + 'AnimalLib/index.ts', 
            { expose: './AnimalLib' }
        )
        .plugin(tsify)
        .on('dep', function (dep) {
            console.log("Included in bundle: " + dep.file);
        })
        .bundle()
        .pipe(source("AnimalLib.js"))
        .pipe(gulp.dest(BUILD_DIR));
    });
}