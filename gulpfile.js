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

var packageJson = require('./package.json');
var app_paths = {
  //ELECTRON DIST PATHS
  osx_electron_build_path: 'dist/osx',
  win_electron_build_path: 'dist/win',
  //SHARED ASSETS LIVING IN SOURCE
  shared_less_path: 'source/shared_assets/less/**/*.less',
  shared_images_path: 'source/shared_assets/images/**',
  shared_fonts_path: 'source/shared_assets/fonts/**',
  shared_js_path: 'source/shared_assets/js/**/*.js',
  //SHARED ASSETS LIVING IN BUILD
  build_shared_styles_path: 'build/shared_assets/styles',
  build_shared_images_path: 'build/shared_assets/images',
  build_shared_fonts_path: 'build/shared_assets/fonts',
  build_shared_js_path: 'build/shared_assets/js',
  //SOURCE WINDOW FILES
  windows_path: 'source/windows',
  window_jade_path: 'source/windows/**/*.jade',
  window_less_path: 'source/windows/**/*.less',
  main_window_path_ep:         'source/windows/main_window/react/app.jsx',
  cs_window_path_ep:           'source/windows/character_sheet/react/app.jsx',

  main_window_path:            'build/windows/main_window',
  character_sheet_window_path: 'build/windows/character_sheet',
  // FILES DEFS
  out_main_window: 'window.js',
  out_character_sheet_window: 'window.js',
  out_window_styles: 'window.css'
}

gulp.task('watch_assets', function(){
  gulp.watch(app_paths.shared_images_path,  ['copy_shared']);
  gulp.watch(app_paths.shared_fonts_path,   ['copy_shared']);
  gulp.watch(app_paths.shared_js_path,      ['copy_shared']);
  gulp.watch(app_paths.shared_less_path,    ['less_shared']);
  gulp.watch(app_paths.window_jade_path,    ['jade']);
});

gulp.task('watch_main_window', function(){
  var main_window_watcher = watchify(
    browserify(app_paths.main_window_path_ep,{debug:true})
    .transform(babelify,{presets:['react','es2015']})
  );

  return main_window_watcher.on('update', function(){
    main_window_watcher.bundle()
      .pipe(source(app_paths.out_main_window))
      .pipe(gulp.dest(app_paths.main_window_path))
    console.log('MAIN_WINDOW : UPDATED');
  }).bundle()
    .on('error', function(err){
      console.log(err.stack, err.message)
  }).pipe(source(app_paths.out_main_window)).pipe(gulp.dest(app_paths.main_window_path));
});

gulp.task('watch_character_window', function(){
  var character_sheet_window_watcher = watchify(
    browserify(app_paths.cs_window_path_ep,{debug:true})
    .transform(babelify,{presets:['react','es2015']})
  );

  return character_sheet_window_watcher.on('update', function(){
    character_sheet_window_watcher.bundle()
      .pipe(source(app_paths.out_character_sheet_window))
      .pipe(gulp.dest(app_paths.character_sheet_window_path))
    console.log('SHEET_WINDOW : UPDATED');
  }).bundle()
    .on('error', function(err){
      console.log(err.stack, err.message)
  }).pipe(source(app_paths.out_character_sheet_window)).pipe(gulp.dest(app_paths.character_sheet_window_path));

})

gulp.task('copy_shared', function(){
  gulp.src(app_paths.shared_js_path).pipe(gulp.dest(app_paths.build_shared_js_path));
  gulp.src(app_paths.shared_images_path).pipe(gulp.dest(app_paths.build_shared_images_path));
  gulp.src(app_paths.shared_fonts_path).pipe(gulp.dest(app_paths.build_shared_fonts_path));
});

gulp.task('less_shared', function(){
  return gulp.src(app_paths.shared_less_path)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(gulp.dest(app_paths.build_shared_styles_path));
})

gulp.task('jade', function(){
  var YOUR_LOCALS = {};
  gulp.src(app_paths.window_jade_path)
    .pipe(gulpJade({
      jade: jade,
      pretty: true
    }))
    .pipe(gulp.dest('./build/windows'));
});

gulp.task('electron', function() {
     gulp.src("")
    .pipe(electron({
        src: './master',
        packageJson: packageJson,
        release: './release',
        cache: './cache',
        version: 'v0.36.3',
        packaging: true,
        rebuild: true,
        // platforms: ['darwin-x64'],
        // platformResources: {
        //   darwin: {
        //       CFBundleDisplayName: packageJson.name,
        //       CFBundleIdentifier: packageJson.name,
        //       CFBundleName: packageJson.name,
        //       CFBundleVersion: packageJson.version,
        //       icon: 'gulp-electron.icns'
        //   },
        //   win: {
        //       "version-string": packageJson.version,
        //       "file-version": packageJson.version,
        //       "product-version": packageJson.version,
        //       "icon": 'gulp-electron.ico'
        //   }
        // }
    }))
    .pipe(gulp.dest(""));
});

gulp.task('default', ['watch_assets','watch_main_window','watch_character_window']);
