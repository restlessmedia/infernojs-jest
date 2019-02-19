// gulpfile.js
// Heavily inspired by Mike Valstar's solution:
// http://mikevalstar.com/post/fast-gulp-browserify-babelify-watchify-react-build/

var babelify = require('babelify'),
  browserify = require('browserify'),
  buffer = require('vinyl-buffer'),
  gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  rename = require('gulp-rename'),
  source = require('vinyl-source-stream'),
  sourceMaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  log = require('gulplog'),
  watchify = require('watchify'),
  jest = require('gulp-jest').default;

// This method makes it easy to use common bundling options in different tasks
function bundle(src, options) {

  const task = function (bundler) {
    // babelify (uses babelrc config - not specified here inline)
    bundler = bundler.transform(babelify)
      // Start bundle
      .bundle()
      // Entry point
      .pipe(source(src))
      // Convert to gulp pipeline
      .pipe(buffer())
      // Rename output
      .pipe(rename('bundle.js'))
      .pipe(sourceMaps.init({ loadMaps: true }));

    // uglify if applicable
    if (options.release === true) {
      bundler = bundler.pipe(uglify())
        .on('error', log.error);
    }

    // Strip inline source maps
    bundler = bundler.pipe(sourceMaps.write('./'))
      // Save 'bundle'
      .pipe(gulp.dest(options.dest));

    // Reload browser if applicable
    if (options.release !== true) {
      bundler = bundler.pipe(livereload());
    }

    return bundler;
  }

  // create bundler - browserify entry point
  let bundler = browserify(src, {
    extensions: ['.js', '.jsx']
  });

  // Watchify to watch source file changes if applicable
  if (options.release !== true) {
    bundler = bundler.plugin(watchify, { ignoreWatch: ['**/node_modules/**', '**/bower_components/**'] })
  }

  // first pass
  const result = task(bundler);

  // Re-run bundle on source updates
  bundler.on('update', function () {
    log.info('Updating bundle ' + src);
    task(bundler);
  });

  return result;
}

const debug = function () {
  return bundle('./src/index.js', {
    dest: './jsbin/debug',
  });
}

const release = function () {
  return bundle('./src/index.js', {
    dest: './jsbin/release',
    release: true
  });
}

const test = function(){
  return gulp.src('src').pipe(jest({
    "preprocessorIgnorePatterns": [
      "<rootDir>/jsbin/", "<rootDir>/node_modules/"
    ],
    "automock": false
  }));
}

gulp.task('test', test);
gulp.task('release', gulp.series([release, test]));
gulp.task('debug', debug);
gulp.task('default', debug);