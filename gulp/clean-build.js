/* gulp/clean-build.js */
var gulp = require("gulp"),
    deleteFile = require('gulp-delete-file');

module.exports = function (BUILD_DIR) {
    /* delete all *.js files in the src/ folder */
    gulp.task('clean-build', function () {
        var stream = gulp.src([
            './' + BUILD_DIR + '/**/*.js',
            './' + BUILD_DIR + '/**/*.map',
        ]);
        /* From all the files in the stream, pick 
        those matching the regular expression, and
        delete them. */
        var regexp = /.*\.js$|.*\.map$/
        stream.pipe(deleteFile({
            reg: regexp,
            deleteMatch: true
        }));
    });
}