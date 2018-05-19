var gulp = require('gulp'),
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();

gulp.task('watch', function(){

  console.log("hello");
  browserSync.init({
    notify: false,
    server: {
      baseDir: "public"
    }
  });

  gulp.watch('./public/index.html', function(){
    browserSync.reload();
  });

  gulp.watch('./src/styles/styles.css', function(){
    gulp.start('cssInject');
  });


  gulp.watch('./src/**.js', function(){
    gulp.start('scriptsRefresh');
  });

});

gulp.task('cssInject', function(){
  return gulp.src('./src/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh', function(){
  browserSync.reload();
});
