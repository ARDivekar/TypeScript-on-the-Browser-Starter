/* gulp/ts-browserify-minify-single-file.js */
var gulp = require('gulp'),
    browserify = require('browserify'),
    tsify = require("tsify");
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify');

module.exports = function (SOURCE_DIR, ENTRY_FILE_NAME, BUILD_DIR, OUT_FILE_NAME) {
    gulp.task('ts-browserify-minify-single-file', function () {
        return browserify({
            entries: [
                SOURCE_DIR + '/' + ENTRY_FILE_NAME
            ]
        })
            .plugin(tsify)
            .bundle()
            .pipe(source(OUT_FILE_NAME))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(BUILD_DIR));
    });
}