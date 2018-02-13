/* gulp/ts-browserify-single-file.js */
var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    tsify = require("tsify");
    
module.exports = function (SOURCE_DIR, ENTRY_FILE_NAME, BUILD_DIR, OUT_FILE_NAME) {
    gulp.task('ts-browserify-single-file', function () {
        return browserify({
            entries: [
                SOURCE_DIR + '/' + ENTRY_FILE_NAME
            ]
        })
        .plugin(tsify)
        .bundle()
        .pipe(source(OUT_FILE_NAME))
        .pipe(gulp.dest(BUILD_DIR));
    });
}