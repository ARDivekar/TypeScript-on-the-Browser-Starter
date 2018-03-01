/* gulp/ts-browserify-single-file-with-sourcemap.js */
var gulp = require('gulp'),
    browserify = require('browserify'),
    tsify = require("tsify"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function (
    SOURCE_DIR,
    ENTRY_FILE_NAME,
    BUILD_DIR,
    OUT_FILE_NAME,
    SOURCE_MAPS_DIR
) {
    gulp.task('ts-browserify-single-file-with-sourcemap', function () {
        return browserify({
            entries: [
                SOURCE_DIR + '/' + ENTRY_FILE_NAME
            ],
            debug: true, /* Source mapping requires this flag.*/
        })
            .plugin(tsify)
            .bundle()
            .pipe(source(OUT_FILE_NAME))
            .pipe(buffer())
            .pipe(sourcemaps.init({
                loadMaps: true,
                sourceRoot: SOURCE_MAPS_DIR,
            }))
            /* Source *.ts TypeScript files will be available inside 
            BUILD_DIR/SOURCE_MAPS_DIR/src/
            */
            .pipe(sourcemaps.write(SOURCE_MAPS_DIR))
            .pipe(gulp.dest(BUILD_DIR));
    });
}