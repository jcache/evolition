'use strict';

/*
  Hello!
  It is unlikely that you should touch this Gulpfile. If you want to, however, I can't stop you. I'm not there!
  Here's some things you can do if you'd like:
  - If you want to brand your app, you'll want to update the `gulp package-osx`, `gulp package-windows`, and
    `gulp package-linux` tasks. You can find documentation for the electronPackager() function at the github repo
    joaomoreno/gulp-atom-electron. There are a few basic branding things you can do there.
  - If you want to contemplate the universe and just feel small and meaningless in general, listen to Neil DeGrasse
    Tyson talk for an extended period of time!
*/

const ER = require('./routes.js');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const glob = require('glob');
const es = require('event-stream');
const babel = require('gulp-babel');
var changed = require('gulp-changed');
const sass = require('gulp-sass');
const jade = require('jade');
const gulpJade = require('gulp-jade');
const eslint = require('gulp-eslint');
const rename = require('gulp-rename');
const useref = require('gulp-useref');
const replace = require('gulp-replace');
const electron = require('electron-connect').server.create();
const electronPackager = require('gulp-atom-electron');
const symdest = require('gulp-symdest');
const zip = require('gulp-vinyl-zip');

const electronVersion = require('electron-prebuilt/package.json').version;

/* These are the building tasks! */

gulp.task('build-client-window-a-bundles', (done) => {
  glob(ER.WIN_A_ENTRY_PATH, (err, files) => {
    if (err) done(err);
    let tasks = files.map((entry) => {
      return browserify({ entries: [entry], debug:true })
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source(entry))
        .pipe(rename({
          dirname: 'windows/main_window/scripts',
        }))
        .pipe(changed('./app/windows/main_window/scripts/'))
        .pipe(gulp.dest(ER.DEST_PATH));
    });
    es.merge(tasks).on('end', done);
  });
});

gulp.task('build-client-window-b-bundles', (done) => {
  glob(ER.WIN_B_ENTRY_PATH, (err, files) => {
    if (err) done(err);
    let tasks = files.map((entry) => {
      return browserify({ entries: [entry], debug:true })
        .transform('babelify', { presets: ['es2015', 'react'] })
        .bundle()
        .pipe(source(entry))
        .pipe(rename({
          dirname: 'windows/character_sheet/scripts',
        }))
        .pipe(changed('./app/windows/character_sheet/scripts/'))
        .pipe(gulp.dest(ER.DEST_PATH));
    });

    es.merge(tasks).on('end', done);
  });
});

gulp.task('build-shared-scss', (done) => {
  glob(ER.SCSS_PATH, (err, files) => {
    if (err) done(err);

    let tasks = files.map((entry) => {
      return gulp.src(entry, { base: ER.APP_PATH })
        .pipe(sass())
        .pipe(changed('./app/shared/scss/'))
        .pipe(rename({
          dirname: 'shared/css',
        }))
        .pipe(gulp.dest(ER.DEST_SHARED_PATH));
    });

    es.merge(tasks).on('end', done);
  });
});

gulp.task('build-client-window-scss', (done) => {
  glob(ER.WINDOW_SCSS_PATH, (err, files) => {
    if (err) done(err);

    let tasks = files.map((entry) => {
      return gulp.src(entry, { base: ER.APP_PATH })
        .pipe(sass())
        .pipe(changed('./app/windows/'))
        .pipe(gulp.dest(ER.DEST_PATH));
    });

    es.merge(tasks).on('end', done);
  });
});

gulp.task('build-client-jade', (done) => {
  glob(ER.JADE_PATH, (err, files) => {
    if (err) done(err);
    let tasks = files.map((entry) => {
      return gulp.src(entry, { base: ER.APP_PATH })
        .pipe(gulpJade({ jade: jade, pretty: true }))
        .pipe(gulp.dest(ER.DEST_PATH));
    });
    es.merge(tasks).on('end', done);
  });
});

gulp.task('build-client-jade-production', (done) => {
  glob(ER.JADE_PATH, (err, files) => {
    if (err) done(err);
    let tasks = files.map((entry) => {
      return gulp.src(entry, { base: ER.APP_PATH })
        .pipe(gulpJade({ jade: jade, pretty: true }))
        .pipe(gulp.dest(ER.DEST_PATH));
    });
    es.merge(tasks).on('end', done);
  });
});

//

gulp.task('build-shared-assets', (done) => {
  glob(ER.IMGS_PATH, (err, files) => {
    if (err) done(err);

    let tasks = files.map((entry) => {
      return gulp.src(entry, { base: ER.APP_PATH })
        .pipe(gulp.dest(ER.DEST_PATH));
    });

    es.merge(tasks).on('end', done);
  });
});
//

gulp.task('build-shared-js-assets', (done) => {
  glob(ER.SCPT_PATH, (err, files) => {
    if (err) done(err);

    let tasks = files.map((entry) => {
      return gulp.src(entry, { base: ER.APP_PATH })
        .pipe(gulp.dest(ER.DEST_PATH));
    });

    es.merge(tasks).on('end', done);
  });
});

gulp.task('build-client-window-images', (done) => {
  glob(ER.WINDOW_IMGS_PATH, (err, files) => {
    if (err) done(err);

    let tasks = files.map((entry) => {
      return gulp.src(entry, { base: ER.APP_PATH })
        .pipe(gulp.dest(ER.DEST_PATH));
    });

    es.merge(tasks).on('end', done);
  });
});

gulp.task('build-client', [
  'build-client-window-scss',
  'build-client-window-images',
  'build-client-window-a-bundles',
  'build-client-window-b-bundles',
  'build-shared-scss',
  'build-client-jade',
  'build-shared-assets',
  'build-shared-js-assets',
]);

gulp.task('build-client-production', [
  'build-client-window-scss',
  'build-client-window-images',
  'build-client-window-a-bundles',
  'build-client-window-b-bundles',
  'build-shared-scss',
  'build-client-jade-production',
  'build-shared-assets',
  'build-shared-js-assets',
]);

gulp.task('build-server', (done) => {
  glob('./src/*.js', (err, files) => {
    if (err) done(err);

    let tasks = files.map((entry) => {
      return gulp.src(entry)
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest(ER.DEST_PATH));
    });

    es.merge(tasks).on('end', done);
  });
});

gulp.task('build', ['build-client', 'build-server']);

gulp.task('build-production', ['build-client-production', 'build-server'], () => {
  gulp.src('./package.json')
    .pipe(replace('build/index.js', 'index.js'))
    .pipe(gulp.dest(ER.DEST_PATH));
});

/* These are the watch tasks! */

gulp.task('watch-client', () => {
  gulp.watch('./app/**/*', ['build-client'], (e) => {
    console.log('Client file ' + e.path + ' was ' + e.type + ', rebuilding...');
  });
});

gulp.task('watch-server', () => {
  gulp.watch('./src/**/*', ['build-server'], (e) => {
    console.log('Server file ' + e.path + ' was ' + e.type + ', rebuilding...');
  });
});

gulp.task('watch', ['watch-client', 'watch-server']);

/* These are the linting tasks! */

gulp.task('lint-client', (done) => {
  glob('./app/**/*.js', (err, files) => {
    if (err) done(err);

    let tasks = files.map((entry) => {
      return gulp.src(entry)
        .pipe(eslint())
        .pipe(eslint.format());
    });

    es.merge(tasks).on('end', done);
  });
});

gulp.task('lint-server', (done) => {
  glob('./src/**/*.js', (err, files) => {
    if (err) done(err);

    let tasks = files.map((entry) => {
      return gulp.src(entry)
        .pipe(eslint())
        .pipe(eslint.format());
    });

    es.merge(tasks).on('end', done);
  });
});

gulp.task('lint', ['lint-client', 'lint-server']);

/* This is the serve task! */

gulp.task('serve', ['build', 'watch'], () => {
  electron.start();

  gulp.watch('./build/index.js', electron.restart);

  gulp.watch([
    './build/shared/images/*',
    './build/shared/scripts/*.js',
    './build/shared/css/*.css',
    './build/windows/**/scripts/app.js',
    './build/**/*.css',
  ], electron.reload);
});

/* These are the packaging tasks! */

gulp.task('package-osx', ['build-production'], () => {
  return gulp.src('./build/**')
    .pipe(electronPackager({ version: electronVersion, platform: 'darwin' }))
    .pipe(symdest('release/osx'));
});

gulp.task('package-windows', ['build-production'], () => {
  return gulp.src('./build/**')
    .pipe(electronPackager({ version: electronVersion, platform: 'win32' }))
    .pipe(symdest('release/windows'));
});




gulp.task('package-linux', ['build-production'], () => {
  return gulp.src('./build/**')
    .pipe(electronPackager({ version: electronVersion, platform: 'linux' }))
    .pipe(zip.dest('./release/linux/linux.zip'));
});

gulp.task('package', ['build-production', 'package-windows', 'package-osx', 'package-linux']);
