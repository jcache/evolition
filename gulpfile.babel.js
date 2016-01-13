var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var babelify = require('babelify');
var streamify = require('gulp-streamify');
var jade = require('jade');
var gulpJade = require('gulp-jade');
var less = require('gulp-less');
var path = require('path');
var babel = require('gulp-babel');

var app_paths = {
  JSX: 'source/**/*.jsx',
  JS: 'source/**/*.js',
  JADE: 'source/**/*.jade',
  LESS: 'source/**/*.less',
  IMAGES: 'source/images/**',
  FONTS: 'source/fonts/**',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: 'dist',
  IMAGES_DEST: 'build/images',
  FONTS_DEST: 'build/fonts',
  HTML_DEST: 'build/views',
  DEST_BUILD: 'build/build',
  DEST_SRC: 'build/js',
  ENTRY_POINT: 'source/js/bmc_toolbox.jsx'
};

gulp.task('transform', function(){
  gulp.src(path.JS)
    .pipe(react())
    .pipe(gulp.dest(path.DEST_SRC)
  );
});

gulp.task('watch', function() {
  gulp.watch(app_paths.IMAGES, ['copy']);
  gulp.watch(app_paths.FONTS, ['copy']);
  gulp.watch(app_paths.JADE, ['jade']);
  gulp.watch(app_paths.JS, ['copy']);
  gulp.watch(app_paths.LESS, ['less']);


  var watcher  = watchify(browserify('source/react/components/app.jsx', { debug: true }).transform(babelify,{presets: ['react','es2015']}));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(app_paths.OUT))
      .pipe(gulp.dest(app_paths.DEST_SRC))
      console.log('Updated');
  })
    .bundle().on('error', function(err) {
      console.log(err.stack, err.message);
    })
    .pipe(source(app_paths.OUT))
    .pipe(gulp.dest(app_paths.DEST_SRC));
});

gulp.task('copy', function(){
  gulp.src(app_paths.JS).pipe(gulp.dest(app_paths.JS_DEST));
  gulp.src(app_paths.IMAGES).pipe(gulp.dest(app_paths.IMAGES_DEST));
  gulp.src(app_paths.FONTS).pipe(gulp.dest(app_paths.FONTS_DEST));
});


gulp.task('less', function () {
  return gulp.src(app_paths.LESS)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(app_paths.DEST));
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  gulp.src(app_paths.JADE)
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('./build'));
});



gulp.task('default', ['watch']);
