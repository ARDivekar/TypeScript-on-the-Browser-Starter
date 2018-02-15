# This project is a starter for web applications using TypeScript on the client side. 

It describes end-to-end to set up of a TypeScript build system using Gulp + Browserify + UglifyJS, along with sample TypeScript code. Both Dev and Production environments have been considered.

## Why?
A lot of large web applications today use Java on the server side. As a result, teams are often made completely of Java developers who are unfamilar with the weirdness of JavaScript.

TypeScript is a very good solution, which offers the following advantages over vanilla JavaScript (even ECMAScript 6/7):

1. Its syntax, type definitions, inheritance model, generics etc. is very similar to that of Java. There should be minimum friction in crossing over.
1. Unlike JavaScript, errors are checked at compile time.
1. Classes can have final (readonly), static, and private member variables and functions. This is enforced at compile time but not runtime.
1. Functions can have default arguments. Arguments can (optionally) have types (either basic types like "string" or "number", or classes).
1. Good integration with existing JavaScript libraries through [TypeScript definition files](https://stackoverflow.com/a/29197665). jQuery, Mocha, etc thus all have good support for TypeScript.
1. Ability to write unit tests in TypeScript for TypeScript classes, using JavaScript frameworks.
1. Always minifiable (upto L3 minification level), thus reducing network latency as only the minified files need to be sent to the client.
    <br>
    Additionally, it is possible to use the Google Closure Compiler to opimize the minified JS to make it faster and lighter.
1. Ability to debug TypeScript directly in browser, using sourcemaps.
1. The language is a superset of JavaScipt, thus it supports the most advanced ECMAScript features, and more:
    - `let` variable declaration for block-scoping (whereas `var` has function scoping).
    - Basic data structures are same (Array, JSON, etc), and easy-to-use containers.
    - Advanced data structures (Set<T>, HashMap<K, V>, etc) are possible using the excellent third party library "typeScript-collections" (which has an overhead of ~30kB).
    - Closures
    - The "any" type allows functions to return any type, same as JavaScript.
    
1. As TypeScript finally becomes JavaScript (via transpilation), so how a certain feature is defined depends on the JavaScript version to which we transpile. Programmers only need to remember and use one syntax, without worrying which is the "right" one.

1. Can transpile all the way from ECMA3 to ECMA6. Depending on browser compatibility and optimization, you can create multiple versions and choose which one to use dynamically.
    <br>
    E.g. Newer browsers might be most optimized for ECMA 6 or 7 and can execute that code faster. Older devices might not support above ECMA5, so they can be targeted with that version.

1. VSCode IDE provides excellent, first-class TypeScript support for free:
    - Syntax highlighting.
    - Jump to function/class definition.
    - Find all usages of a function/class.
    - etc.
    <br>
    Other editors which provide the same features are IntelliJ Ultimate Edition (paid).

1. The language and compiler is maintained by Microsoft, but open-sourced (hence peer-reviewed). Thus likely to be stable, secure and optimized. 





## This project
This repository is a mini-project to show how to set up TypeScript for use on the frontend, in a browser. It is **not** a tutorial on how to develop using TypeScript with Node.js (i.e. on the server side).

The idea is to develop and debug TypeScript directly on the browser in a pre-production setting, and during Production, we use L3 minified JavaScript (i.e. with function names, class names etc. replaced by single letters).

This project introduces a few TypeScript build workflows using Gulp, Browserify, and Uglify. You can see more [here](https://github.com/gulpjs/gulp/tree/master/docs/recipes).

Lets get started.





## Basic setup 
The major setup steps are taken from [this tutorial](https://www.typescriptlang.org/docs/handbook/gulp.html) on the Microsoft website. However, I have used a more comprehensive example using data structures with the library `'typescript-collections'`

1. First, you must install NodeJS, which by default comes bundled with `npm` (there's lots of tutorials for this). Node is only used for the build system, it will **not** be used to host a webserver.

1. Next, install the list of NPM modules. 
    Either run `npm install` to install them from the `package.json` file, or download them explictly with the following command:
    
    > `npm install --save-dev typescript gulp gulp-typescript browserify tsify vinyl-source-stream gulp-uglify vinyl-buffer gulp-sourcemaps`

    Either way, the dependencies should be installed to the package's `node_modules/` folder. We add this folder to the repository's `.gitignore` since we don't want to add it to Git.

1. Let's set up the project structure:
    - `src/` stores all our source code (`*.ts`, `*.html`, `*.css`, etc)
        At present, it looks like this:
        ```JS
        src
        |
        |-- CompanyLib  // a library folder
        |   |-- Organization.ts
        |   |-- Person.ts
        |   |-- TechCompany.ts
        |-- ProductLib  // a library folder
        |   |-- Price.ts
        |   |-- Product.ts
        |   |-- TShirt.ts
        |   |-- Catalog.ts
        |   |-- Order.ts
        |-- main.ts     // a file that uses the libraries
        |-- index.html  // an HTML that includes our minified, browserified JS.
        ```
    - `tst/` should store any and all unit tests. In this sample, there aren't any.
    - `build/` will store all the `*.js` files which are accessed by client-facing webpages. 

        In this sample, we just use `build/index.html` as a static webpage, but in an actual web app, the webpage might be rendered by Node, JSP, Ruby, etc. In all of these cases, there are three ways to import the generated JS files:
        1. Put all the JS code in the HTML payload sent to the client:
            ```html
            <!-- JSP example -->
            ...
            <script>
                <jsp:include page="build/someJsFile.js">  
            </script>
            ...
            ```
            On rendering, the following is sent to the client (the JS executes on page load):
            ```html
            ...
            <script>
                (function Person(){
                    ...
                })
                ...
            </script>
            ...
            ```
            This is a bad solution, because it increases the HTML payload size, and the browser cannot cache the JS code.
        1. Add static imports to the `*.js` files. 
        
            ```html
            ...
            <script src="build/someJsFile.js"/></script>
            ...
            ```
        
            This is a decent solution, because browsers can cache these files. However, it still adds a load to the server to send the files.

        1. Upload the files to a CDN (Content Delivery Network) and let the client browser fetch the files from there. 
            ```html
                ...
                <script 
                src="http://cdnjs.cloudflare.com/209182031/someJsFile.js">
                </script>
                ...
            ```
        
            This is the best solution performance-wise: CDNs are built for high uptime and low latency, and the load is taken off the server. 
            
            However, the compiled `*.js` files need to be uploaded to a production CDN before users arrive at the page. Depending on how Prod deployments happen on your stack, this might be an issue, as you need all `*.js` files to be reflected to the Prod CDN at same time, as well as at the same time that backend code changes (requiring these JS files) are deployed onto your Prod server. 
            
            A possible solution is to write some backend code on the Prod server which checks the version of the file on the CDN against that of the JS code available in the `build` folder. If the CDN has an older version stale, the server can push the newer JS code to the CDN, replacing the stale version but preserving the CDN URL to the file (this assumes the newly compiled JS code was deployed onto the server along with the backend code changes). Thus the changes are seamless.

        From the above three solutions, only the first two are possible with the build system described in this sample project.

## Build system setup

Now, we set up the build system:
1. TypeScipt uses the `tsc` command by default to compile a `*.ts` file to the equivalent `*.js` file. It saves it in the same folder. 

    E.g. `$ tsc src/CompanyLib/Person.ts` becomes `src/CompanyLib/Person.js`

1. Doing this for every file is time consuming. We can create a file [`tsconfig.json`](http://www.typescriptlang.org/docs/handbook/tsconfig-json.html) at the project root, which tells us which files to compile, and some options on how to compile them:
    ```json
    {
        "include": [
            "src/**/*.ts"
        ],
        "exclude": [
            "node_modules",
            "**/*.spec.ts"
        ],
        "compilerOptions": {
            "noImplicitAny": true,
            "target": "es5",
            "removeComments": false
        }
    }
    ```
    Here, by running `$ tsc` from anywhere in the project, we can compile each the `*.ts` files in `src/` to a corresponding `*.js` file in the same folder. From a webpage, we can import them using folder-relative paths.

1. These `*.js` files generated by running `$ tsc` are annoying to delete individually. So, we can use the `gulp` build system and `gulp-delete-file` to remove them. 
   
    The gulp build workflow is as follows ([Source](http://brandonclapp.com/what-is-gulp-js-and-why-use-it/)):
    - We start by defining a task that we would like to accomplish. This is a JavaScript function passed to `gulp.task(...)` in a file called `gulpfile.js`, which we place in the project root.
    - Within that task, a desired set of files (`*.ts`, `*.js`, `*.html`, `*.css`, etc) are loaded into the _gulp stream_ to be processed. 
    - Once files are in the stream, zero or more modifications can be made to the files. This processing of files in the stream happpens in-memory without any creation of temporary files in between.
    - Finally, the output files at the end of the stream (i.e. the built files) are usually written to disk, in specified destination directory(s).
    - Processing of the files in a stream might mean different things depending on the type of file, location of the file, target environment (e.g. Devo vs Prod) and other such factors. 
        - The files that go into the stream might not be the same as the ones that come out. There might be fewer (or more!), they might be minified, etc.
    - To open a stream, we use `gulp.src(...)`, to which we pass a regex that matches files in or filesystem. This function reads in all the files from disk and puts them in our stream.
    - To add a stream-processing step, we use `.pipe(...)`, chained to the `gulp.src(...)` call or a previous `.pipe(...)` call. More info about this step can be found [here](https://stackoverflow.com/a/38404984).
    - Once we are done processing the stream, we optionally write the files to disk using `.dest(...)` (we pass the output folder name).

    For our current use-case of removing all `*.js` files from the `src/` directory, we create `gulpfile.js` in the project root. However, we expect that we are also going to create a lot of other gulp tasks, so to keep the gulpfile clean, we create a `gulp/` folder in the project root to hold all the tasks (credit to [this blogpost](https://lincolnloop.com/blog/speedy-browserifying-multiple-bundles/) for the idea). The gulpfile will import the tasks from this folder using `require(gulp/task-name-*.js);`. E.g.     
    ```js
    /* gulpfile.js */
    var SOURCE_DIR = 'src';
    require('./gulp/js-clean-src')(SOURCE_DIR); // Source: https://stackoverflow.com/a/10688968
    ```
    In the imported file, we define a task which will delete all `*.js` files from the `src/` directory. This task will use a Gulp plugin, [`gulp-delete-file`](https://www.npmjs.com/package/gulp-delete-file) during stream processing:
    ```js
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
    ```
    Note that the SOURCE_DIR parameter is passed while importing, to keep the task more generic ([Source]( https://stackoverflow.com/a/10688968)).

    The `gulp.task(...)` call registers a task, which we can run using `$ gulp js-clean-src` anywhere in the project directory.
    Note that since we don't have a write-to-disk step now, calling `.dest(...)` at the end is not necessary.

1. Module inclusion in NodeJS is done using the `module.exports = {...}` and `require` keywords. This is all fine when we use it on the backend, but our use-case here is about getting TypeScript to work on browsers. In browsers, all `<script>` tags are executed from top to bottom once the page loads. Both `require` and `exports` keywords are not supported.

    This is a problem for us, because the compiled files we generated by running `$ tsc` use `export`.
    We thus use another NodeJS library called `browserify`. According to its documentation:
    > Browsers don't have the `require` method defined, but Node.js does. With Browserify you can write code that uses `require` in the same way that you would use it in Node, and use it in the browser. [[1]](http://browserify.org)
    >
    > Browserify is a tool for compiling [node-flavored](http://nodejs.org/docs/latest/api/modules.html) commonjs modules for the browser.
    > You can use browserify to organize your code and use third-party libraries even if you don't use node itself in any other capacity except for bundling and installing packages with npm.
    > 
    > The module system that browserify uses is the same as node, so packages published to npm that were originally intended for use in node but not browsers will work just fine in the browser too. [[2]](https://github.com/browserify/browserify-handbook)
    
    We can use browserify to combine all our compiled `src/**/*.js` files into one single file, `build/allFiles.js`. Our HTML code only needs import this file to work.

    Lets add Browserify to our build system:

    - To give an elevator pitch ([Source](https://github.com/browserify/browserify-handbook#how-browserify-works)): 
        > Browserify starts at the entry point files that you give it and searches for any `require()` calls it finds in these files.
        >
        > For every require() call with a string in it, browserify resolves those module strings to file paths and then searches those file paths for `require()` calls recursively, until the entire dependency graph is visited.
        >
        > Browserify is a build step that runs on the server. It generates a single **bundle** file that has everything in it. The HTML just needs to import this file.

    - Initially, there was a separate plugin called `gulp-browserify` which was a wrapper around the browserify library to make it compatible with Gulp. However, as of this writing (Feb 2018), the Gulp team decided to [blacklist the plugin](https://www.npmjs.com/package/gulp-browserify) and get users to use browserify directly, since they both use [NodeJS streams](https://www.sitepoint.com/basics-node-js-streams/), albiet [in slightly different ways](https://fettblog.eu/gulp-browserify-multiple-bundles/). 
    
        As a result, we shall be importing the browserify library directly to use in our Gulp tasks. Using browserify directly is great because you'll always have access to 100% of the features, as well as the most up-to-date version. However, it means that there will be two incompatible streams inside a single Gulp task: the Gulp stream, and the Browserify stream. Gulp is built on the library `vinyl-source-stream`, so we use this to convert the Gulp stream into the stream format Browserify is expecting ([source](https://www.viget.com/articles/gulp-browserify-starter-faq/) for the above).

    - Browserify's JS API depends on the concept of "entry" files, i.e. a list of files which are at the root of the `require()` dependency graph. From this set of files, all imported files are discovered. 
        
        In our example code, `src/main.ts` is the only such entry file. It is a TypeScript file, which on running `$ tsc` generates a `main.js` file with several `require(...)` calls:
        ```js
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var $ = require("jquery");
        var Person_1 = require("./CompanyLib/Person");
        var Organization_1 = require("./CompanyLib/Organization");
        var TechCompany_1 = require("./CompanyLib/TechCompany");
        var Order_1 = require("./ProductLib/Order");
        var TShirt_1 = require("./ProductLib/TShirt");
        var Catalog_1 = require("./ProductLib/Catalog");
        var Price_1 = require("./ProductLib/Price");
        ...
        ```
        Note that all of the imported files are `*.js` files.
        
        We can now create a Gulp task to combine them all into a single "bundle" file. This file will be in the Browserify stream format, so we have to use `vinyl-source` to first convert it to the Gulp stream format. We can then write to `build/allFiles.js` using the normal `gulp.dest(...)` step:
        ```js
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
                .pipe(source(OUT_FILE_NAME)) /* convert to Gulp stream format. */
                .pipe(gulp.dest(BUILD_DIR));
            });
        }
        ```
        And import it in the gulpfile:
        ```js
        /* gulpfile.js */
        var SOURCE_DIR = 'src';
        var BUILD_DIR = 'build';

        require('./gulp/js-browserify-single-file')(
            SOURCE_DIR, 'main.js',
            BUILD_DIR, 'allFiles.js'
        );
        ```
        We can make the task more generic (e.g. to take an array of entry files as input), but this suffices for now.
        
1. One annoying thing is that to run the above, we must actually run four commands every time we want to re-compile our TypeScript, create one single file and then clean all the compiled files in the `src/` folder:
    ```
    $ gulp js-clean-src
    $ tsc
    $ gulp js-browserify-single-file
    $ gulp js-clean-src
    ```
    This is error-prone, and - quite frankly - I am personally too lazy to do it. You could write a bash script to automate it, but that's just avoiding the problem, which is: we need to transpile each TypeScript file to JavaScript as an intermediate step in our build process.

    The solution is to use `tsify`, which is a Browserify plugin which allows us to work with TypeScript entry files, and compile them (using the options into our `tsconfig.json`), then browserify them into a single file. To do this, we must call `.plugin(tsify)` before we call `.bundle()`:
    ```js
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
    ```
    We import it in the gulpfile as before:
    ```js
    /* gulpfile.js */
    var SOURCE_DIR = 'src';
    var BUILD_DIR = 'build';

    require('./gulp/ts-browserify-single-file')(
        SOURCE_DIR, 'main.ts', /* Note: TypeScript file */
        BUILD_DIR, 'allFiles.js'
    );
    ```
    `build/allFiles.js` is exactly the same as it was before, but we don't generate any intermediate files.

    Our TypeScript is now automatically converted to JavaScript, and we can import it in the browser. `src/index.hml` is an example file which uses our compiled JavaScript:
    ```html
    <!-- src/index.html -->
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8" />
            <title>Hello TypeScript!</title>
        </head>
        <body>
            <p id="employees">EMPTY</p>
            <script src="../build/allFiles.js"></script>
        </body>
    </html>
    ```
    The thing is, when we try to debug the code in the browser, it looks like this (note, I'm using Vivaldi, which is a Chromium derivative):

    ![TypeScript compiled to JavaScript and viewed in browser debugger](img/TypeScript-compiled-to-JavaScript.jpg)


1. Minification is an important step in the build process for client-side JavaScript. As we can see, `build/allFiles.js` is very large:
    ```
    $ wc -m build\allFiles.js
    400672 build\allFiles.js
    ```
    That's over 390kB! Granted, a lot of it is because we have `jqeury` and the `typescript-collections` libraries. However, it's still too much. We use the `gulp-uglify` plugin to minify the generated JS, before we write it to the minified JS file, `build/addFiles-min.js`. 
    
    However, we cannot just add another `.pipe(uglify())` statement directly before `gulp.dest(...)`. This is because, the uglify libary requires one big file to uglify together, whereas after we call `pipe(source(OUT_FILE_NAME))`, the data is in a Gulp-stream format. So, we use `vinyl-buffer` to first buffer (i.e. collect) the stream, then we pass the buffered stream files to UglifyJs ([Source](https://stackoverflow.com/a/38883791)):
    ```js
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
    ```
    And import it:
    ```js
    /* gulpfile.js */
    var SOURCE_DIR = 'src';
    var BUILD_DIR = 'build';

    require('./gulp/ts-browserify-minify-single-file')(
        SOURCE_DIR, 'main.ts',
        BUILD_DIR, 'allFiles-min.js'
    );
    ```
    Let's see how much we saved:
    ```
    $ wc -m build\allFiles-min.js
    123677 build\allFiles-min.js
    ```
    Wow! The file is now only around 120kB...that's a 69% reduction! (As a side note, this happy number occurred completely by accident :P).


1. After minification, the HTML will import the minified `build/allFiles-min.js` file, and our original TypeScript is nowhere to be seen. This is good in one sense that it reduced the payload sent to the client, thus making the page load faster. 
    However, minified JavaScript is incomprehensible; as we can see from the following image, even after we preyty-print it, all of our identifiers are lost.

    ![TypeScript compiled to JavaScript, then minified and viewed in browser debugger. It is useless for debugging purposes](img/TypeScript-cannot-debug-minified-JavaScript.jpg)

    You can't debug this minified code during development. Worse, you can't debug it if your app gets a high-severity, user-facing issue.

    The solution: _Source Maps_.
    > A source map provides a way of mapping code within a compressed file back to it’s original position in a source file. This means that – with the help of a bit of software – you can easily debug your applications even after your assets have been optimized. The Chrome and Firefox developer tools both ship with built-in support for source maps.
    >
    > We’re going to be focussing primarily on source maps for JavaScript code but the principles apply to CSS source maps too. ([Source](http://blog.teamtreehouse.com/introduction-source-maps))

    We're going to use source maps to trace our minified JavaScript _all the way back to TypeScript_, using the `gulp-sourcemaps` plugin. We create a new dependency called `sourcemap` and add calls to `sourcemaps.init(...)` and `sourcemaps.write(...)`. The latter one one generates and writes source maps, and the former loads any cached source maps which already exist. We also have to enable the `debug` plugin in browserify:
    ```js
    /* gulp/ts-browserify-single-file-with-sourcemap.js */
    var gulp = require('gulp'),
        browserify = require('browserify'),
        tsify = require("tsify");
    source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        sourcemaps = require('gulp-sourcemaps'),
        uglify = require('gulp-uglify');

    module.exports = function (
        SOURCE_DIR,
        ENTRY_FILE_NAME,
        BUILD_DIR,
        OUT_FILE_NAME,
        SOURCE_MAPS_DIR) {
        gulp.task('/ts-browserify-single-file-with-sourcemap', function () {
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
    ```
    And import it:
    ```js
    var SOURCE_DIR = 'src';
    var BUILD_DIR = 'build';
    var SOURCE_MAPS_DIR = 'sourcemaps';

    require('./gulp/ts-browserify-single-file-with-sourcemap')(
        SOURCE_DIR, 'main.ts', 
        BUILD_DIR, 'allFiles-min.js',
        SOURCE_MAPS_DIR
    );
    ```
    Note how we drop the call to uglify; since we're going to only call this gulp task while debugging, we don't need to generate a minified file. However, to avoid having to change our import in the `index.html`, we've kept the resultant JS file name the same. 
    
    This laziness will pay off when we have dozens of js imports: we don't have to keep removing `-min` from lots and lots of filenames. 

    The end result is pretty great:

    ![TypeScript is directly debuggable in the browser, using Source Maps](img/TypeScript-with-source-mapping-debuggable.jpg)

    Viola, we are able to use the Chrome debugger to set up breakpoints, observe variables etc in the TypeScript code itself. We could not have asked for better! 

    [You can actually do more than just uglify before and after generating the source map](https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support). This is useful if you want to perform other gulp steps in between generating and writing your source maps.


1. We're at a point where our build system can now be used both in production (by only creating the minified JS file) and for debugging (by creating source maps for unminified JS). 

    Let's make it more concrete by creating two gulp tasks, `debug` and `prod`. These tasks will each have a Gulp dependency on the tasks we created previously, as well as a new task `clean-build`, which (surprise!) cleans the `build/` folder of all content.
    ```js
    /* gulpfile.js */
    var gulp = require('gulp');

    var SOURCE_DIR = 'src';
    var BUILD_DIR = 'build';
    var SOURCE_MAPS_DIR = 'sourcemaps';

    require('./gulp/clean-build')(BUILD_DIR);

    require('./gulp/ts-browserify-minify-single-file')(
        SOURCE_DIR, 'main.ts',
        BUILD_DIR, 'allFiles-min.js'
    );

    require('./gulp/ts-browserify-single-file-with-sourcemap')(
        SOURCE_DIR, 'main.ts', 
        BUILD_DIR, 'allFiles-min.js',
        SOURCE_MAPS_DIR
    );

    /* Create dummy tasks, which just invoke their dependent tasks. */
    gulp.task('debug', ['clean-build', 'ts-browserify-single-file-with-sourcemap']);
    gulp.task('prod', ['clean-build', 'ts-browserify-minify-single-file']);
    ```
    And:
    ```js
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
    ```
    Now, we can just run `$ gulp debug` to while debugging, or `$ gulp prod` before pushing to a real website. You should add these commands to your deployment scripts.

1. One possible issue we might face is the  minified file clashing with other minified dependencies that we have. E.g. if, along with importing `build/allFiles-min.js`, you also need to include `https://cdn.com/someLib-version-1.min.js`. Since the files are only minified within their own scope, it is entirely possible they use some of the same obfuscated variable names like `o`, `p`, `s`, etc.
    
    The way to avoid this problem is simple: we just add a flag in our `uglify(...)` call to ensure that the function names are not stripped ([Source](https://github.com/terinjokes/gulp-uglify/issues/160)). In TypeScript, you only need to make sure that the identifiers of your top-level code (classes, functions visible in the browser context) are unique across the page. TypeScript classes are compiled to functions from ECMAScript3 to ECMAScript5, and to JavaScript classes in ECMAScript6 and above.

    The change required for this has minimal differences for our `gulp prod` invocation:
    ```js
    /* gulp/ts-browserify-minify-single-file-keep-fnames.js */
    var gulp = require('gulp'),
        browserify = require('browserify'),
        tsify = require("tsify");
        source = require('vinyl-source-stream'),
        buffer = require('vinyl-buffer'),
        uglify = require('gulp-uglify');

    module.exports = function (SOURCE_DIR, ENTRY_FILE_NAME, BUILD_DIR, OUT_FILE_NAME) {
        gulp.task('ts-browserify-minify-single-file-keep-fnames', function () {
            return browserify({
                entries: [
                    SOURCE_DIR + '/' + ENTRY_FILE_NAME
                ]
            })
                .plugin(tsify)
                .bundle()
                .pipe(source(OUT_FILE_NAME))
                .pipe(buffer())
                .pipe(uglify({ mangle: { keep_fnames: true } }))
                .pipe(gulp.dest(BUILD_DIR));
        });
    }
    ```
    And update the gulpfile:
    ```js
    /* gulpfile.js */
    var gulp = require('gulp');

    var SOURCE_DIR = 'src';
    var BUILD_DIR = 'build';

    require('./gulp/ts-browserify-minify-single-file-keep-fnames')(
        SOURCE_DIR, 'main.ts',
        BUILD_DIR, 'allFiles-min.js'
    );

    gulp.task('prod', ['clean-build', 'ts-browserify-minify-single-file-keep-fnames']);
    ```
    Now, when we run `$ gulp prod`, we get a minified file that retains the function names (no JavaScript classes, since our `tsconfig.json` has us compiling with `"target": "es5"`).

    Let's check the size of our minified file:
    ```
    $ wc -m build\allFiles-min.js
    129143 build\allFiles-min.js
    ``` 
    The filesize increase in minimal (from 120kB to 126 kB...a little more than 4.4%). Which is a good tradeoff to ensure that the code does not interact badly with other code on the page.
