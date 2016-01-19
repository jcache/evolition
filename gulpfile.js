var gulp = require('gulp');
var electron = require('gulp-electron');
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
var runEv = require("gulp-run-electron");
var electron = require('electron-connect').server.create();
var packageJson = require('./package.json');

var app_paths = {
  //ELECTRON DIST PATHS
  osx_electron_build: 'dist/osx',
  win_electron_build: 'dist/win',
  //SHARED ASSETS LIVING IN SOURCE
  shared_less: 'source/shared_assets/less/**/*.less',
  shared_images: 'source/shared_assets/images/**',
  shared_fonts: 'source/shared_assets/fonts/**',
  shared_js: 'source/shared_assets/js/**/*.js',
  //SHARED ASSETS LIVING IN BUILD
  build_shared_styles: 'build/shared_assets/styles',
  build_shared_images: 'build/shared_assets/images',
  build_shared_fonts: 'build/shared_assets/fonts',
  build_shared_js: 'build/shared_assets/js',
  //SOURCE WINDOW FILES
  windows: 'source/windows',
  window_jade: 'source/windows/**/*.jade',
  window_less: 'source/windows/**/*.less',
  main_window_ep:         'source/windows/main_window/react/app.jsx',
  cs_window_ep:           'source/windows/character_sheet/react/app.jsx',
  main_window:            'build/windows/main_window',
  character_sheet_window: 'build/windows/character_sheet',
  // FILES DEFS
  out_main_window: 'window.js',
  out_character_sheet_window: 'window.js',
  out_window_styles: 'window.css'
};

gulp.task('watch_assets', function(){
  gulp.watch('build',  ['copy_shared']);
  gulp.watch(app_paths.shared_images,  ['copy_shared']);
  gulp.watch(app_paths.shared_fonts,   ['copy_shared']);
  gulp.watch(app_paths.shared_js,      ['copy_shared']);
  gulp.watch(app_paths.shared_less,    ['less_shared']);
  gulp.watch(app_paths.window_jade,    ['jade']);
});

gulp.task('watch_main_window', function(){

  var main_window_watcher = watchify(
    browserify(app_paths.main_window_ep,{debug:true})
    .transform(babelify,{presets:['react','es2015']})
  );

  return main_window_watcher.on('update', function(){
    main_window_watcher.bundle()
      .pipe(source(app_paths.out_main_window))
      .pipe(gulp.dest(app_paths.main_window));
    console.log('MAIN_WINDOW : UPDATED');
  }).bundle().on('error', function(err){
      console.log(err.stack, err.message);
  }).pipe(source(app_paths.out_main_window))
    .pipe(gulp.dest(app_paths.main_window));

});

gulp.task('watch_character_window', function(){
  var character_sheet_window_watcher = watchify(
    browserify(app_paths.cs_window_ep,{debug:true})
    .transform(babelify,{presets:['react','es2015']})
  );

  return character_sheet_window_watcher.on('update', function(){
    character_sheet_window_watcher.bundle()
      .pipe(source(app_paths.out_character_sheet_window))
      .pipe(gulp.dest(app_paths.character_sheet_window));
    console.log('SHEET_WINDOW : UPDATED');

  }).bundle().on('error', function(err){
      console.log(err.stack, err.message);
  }).pipe(source(app_paths.out_character_sheet_window))
    .pipe(gulp.dest(app_paths.character_sheet_window));

});

gulp.task('copy_shared', function(){

  gulp.src(app_paths.shared_js)
    .pipe(gulp.dest(app_paths.build_shared_js)
  );

  gulp.src(app_paths.shared_images)
    .pipe(gulp.dest(app_paths.build_shared_images)
  );

  gulp.src(app_paths.shared_fonts)
    .pipe(gulp.dest(app_paths.build_shared_fonts)
  );

});

gulp.task('less_shared', function(){
  return gulp.src(app_paths.shared_less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(gulp.dest(app_paths.build_shared_styles));
});

gulp.task('jade', function(){
  var YOUR_LOCALS = {};
  gulp.src(app_paths.window_jade)
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('./build/windows'));
});

gulp.task('serve', function () {
  // Start browser process
  electron.start();
  // Restart browser process
  gulp.watch('evolition.js', electron.restart);
  // // Reload renderer process
  gulp.watch([
    'build/shared_assets/**/*.css',
    'build/windows/main_window/window.js',
    'build/windows/main_window/window.html'
  ], electron.reload);
  electron.on('closed', () => { process.exit()})
});







gulp.task('default', ['watch_assets','watch_main_window','watch_character_window','serve']);
