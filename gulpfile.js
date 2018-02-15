/* gulpfile.js */
var gulp = require('gulp');

var SOURCE_DIR = 'src';
var BUILD_DIR = 'build';
var SOURCE_MAPS_DIR = 'sourcemaps';

require('./gulp/js-clean-src')(SOURCE_DIR);

require('./gulp/clean-build')(BUILD_DIR);

require('./gulp/js-browserify-single-file')(
    SOURCE_DIR, 'main.js',
    BUILD_DIR, 'allFiles.js'
);

require('./gulp/ts-browserify-single-file')(
    SOURCE_DIR, 'main.ts', /* Note: TypeScript file */
    BUILD_DIR, 'allFiles.js'
);

require('./gulp/ts-browserify-minify-single-file')(
    SOURCE_DIR, 'main.ts',
    BUILD_DIR, 'allFiles-min.js'
);

require('./gulp/ts-browserify-minify-single-file-keep-fnames')(
    SOURCE_DIR, 'main.ts',
    BUILD_DIR, 'allFiles-min.js'
);

require('./gulp/ts-browserify-single-file-with-sourcemap')(
    SOURCE_DIR, 'main.ts', 
    BUILD_DIR, 'allFiles-min.js',
    SOURCE_MAPS_DIR
);

gulp.task('debug', ['clean-build', 'ts-browserify-single-file-with-sourcemap']);
gulp.task('prod', ['clean-build', 'ts-browserify-minify-single-file-keep-fnames']);