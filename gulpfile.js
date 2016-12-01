var gulp = require('gulp');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var exec = require('child_process').exec;
var rimraf = require('rimraf');

gulp.task('clear', (cb) => {
    rimraf('./dist', cb);
});

gulp.task('compile', () => {
    const tsProject = ts.createProject('./tsconfig.json');

    return gulp.src('./src/**/*.ts')
        .pipe(tsProject())
        .js
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('run', (cb) => {
    exec('node ./dist/index.js', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('watch', () => {
    gulp.watch(['./src/**/*.ts'], gulp.series('clear', 'compile', 'run'));
});

gulp.task('default', gulp.series('clear', 'compile', 'run', 'watch'));