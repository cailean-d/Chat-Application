const gulp = require('gulp'),
	  run = require('gulp-run'),
	  clean = require('gulp-clean');


gulp.task('build-app', ['clean'], function(){
	return run('electron-packager . myApp && npm run package').exec();
});


gulp.task('clean', function () {
    return gulp.src('myApp-win32-x64/')
        .pipe(clean({force: true}));
});

gulp.task('cleanInstall', function () {
    return gulp.src('Install/')
        .pipe(clean({force: true}));
});