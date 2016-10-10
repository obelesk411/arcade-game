var gulp = require('gulp'),
	htmlBeautify = require('gulp-prettify'),
	cssBeautify = require('gulp-cssbeautify'),
	jsBeautify = require('gulp-beautify'),
	jshint = require('gulp-jshint');

gulp.task('htmlBeautify', function(){
  gulp.src('src/index.html')
    .pipe(htmlBeautify({indent_size: 4}))
    .pipe(gulp.dest('dist'));
});

gulp.task('cssBeautify', function(){
  gulp.src('src/css/*')
    .pipe(cssBeautify({indent: '    '}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('jsBeautify', function(){
  gulp.src('src/js/*.js')
    .pipe(jsBeautify({indentSize: 4}))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('lint', function(){
  gulp.src('src/js/*.js')
    .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }))
    .pipe(jshint.reporter('default'));
});

gulp.src('src/images/*')
    .pipe(gulp.dest('dist/images'));

gulp.task('default', ['htmlBeautify', 'cssBeautify', 'jsBeautify', 'lint']);