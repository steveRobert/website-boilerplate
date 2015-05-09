var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var deploy      = require('gulp-gh-pages');
var cp          = require('child_process');
var harp        = require('harp');

gulp.task('serve', function () {
  harp.server(__dirname, {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: true,
      notify:false
    });

    gulp.watch("public/**/*.{jade,styl,haml,sass,scss,less}", function() {
        reload();
    });
  })
});

gulp.task('build', function (done) {
  cp.exec('harp compile . dist', {stdio: 'inherit'})
    .on('close', done)
});

gulp.task('deploy', ['build'], function () {
  gulp.src("./dist/**/*")
    .pipe(deploy());
});

gulp.task('default', ['serve']);
