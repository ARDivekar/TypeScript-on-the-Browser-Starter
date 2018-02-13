/* gulp/js-browserify-single-file.js */
var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

module.exports = function (SOURCE_DIR, ENTRY_FILE_NAME, BUILD_DIR, OUT_FILE_NAME) {
    gulp.task('js-browserify-single-file', function () {
        return browserify({
            entries: [
                SOURCE_DIR + '/' + ENTRY_FILE_NAME
            ]
        })
        .bundle()
        .pipe(source(OUT_FILE_NAME))
        .pipe(gulp.dest(BUILD_DIR));
    });
}