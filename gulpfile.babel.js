'use strict';

import gulp from 'gulp';
import cssmini from 'gulp-minify-css';
import sequence from 'gulp-sequence';
import zip from 'gulp-zip';
import del from 'del';
import autoprefixer from 'gulp-autoprefixer';
import stylelint from 'gulp-stylelint';
import stylelintReporter from 'gulp-stylelint-console-reporter';

gulp.task('css-lint', function() {
  gulp.src('src/resources/css/*.css')
    .pipe(stylelint({
      reporters: [
        stylelintReporter()
      ],
      debug: true
    }));
});

gulp.task('css-minify', function() {
  return gulp.src('./build/sqweb-wordpress-plugin/resources/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssmini())
    .pipe(gulp.dest('./build/sqweb-wordpress-plugin/resources/css'))
});

gulp.task('copy', function() {
  return gulp.src(['./src/**/*'])
    .pipe(gulp.dest('build/sqweb-wordpress-plugin'));
});

gulp.task('zip', function() {
  return gulp.src(['./build/sqweb-wordpress-plugin/**/*'], {base : "./build"})
    .pipe(zip('sqweb-wordpress-plugin.zip'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return del(['build/']);
});

gulp.task('keep-build', sequence('css-lint', 'copy', 'css-minify', 'zip'));

gulp.task('default', sequence('css-lint', 'copy', 'css-minify', 'zip', 'clean'));