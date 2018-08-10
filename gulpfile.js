var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var ftp = require('gulp-ftp');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "src/"
    });

    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass() .on('error', sass.logError))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('ftp', function(){
    return gulp.src('src/**')
    .pipe(ftp({
        host: 'ftp.qarqas.ru',
        user: 'beelmdyb',
        pass: 'sk1per321SK',
        remotePath: 'www/qarqas.ru'

    }))
    .pipe(gutil.noop());
})
gulp.task('default', ['serve']);
