/* gulp/js-clean-src.js */
var gulp = require("gulp"),
    deleteFile = require('gulp-delete-file');

module.exports = function (SOURCE_DIR) {
    /* delete all *.js files in the src/ folder */
    gulp.task('js-clean-src', function () {
        var stream = gulp.src([
            './' + SOURCE_DIR + '/**/*.js'
        ]);
        /* From all the files in the stream, pick 
        those matching the regular expression, and
        delete them. */
        var regexp = /.*\.js$/
        stream.pipe(deleteFile({
            reg: regexp, 
            deleteMatch: true
        }));
    });
}
