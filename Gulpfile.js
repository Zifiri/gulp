// gulp'u dahil edelim
var gulp = require('gulp');
// eklentileri dahil edelim
var uglify  = require('gulp-uglify');
var concat  = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefix = require('gulp-autoprefixer');
var refresh = require('gulp-refresh');

// Sass dosyalarının bulunduğu klasör
var sassFiles = 'scss/*.scss';
// CSS dosyalarının bulunduğu klasör
var CSSDir = 'css/';

// JS dosyalarının bulunduğu klasör
var JSDir = 'js/';
// Js Dosyalarım
var JSFiles = [
    JSDir + "jquery.min.js",
    JSDir + "scrolltop.js",
    JSDir + "bootstrap.min.js"

];

// Sass dosyalarını işler, browser uyumluluğu sağlar,
// ve oluşturulan CSS dosyasını CSS klasörüne kaydeder.
gulp.task('css', function () {
    return gulp.src(sassFiles)
        .pipe(sass({ style: 'compressed' }))
        .pipe(autoprefix('last 15 version'))
        .pipe(gulp.dest(CSSDir))
        .pipe(refresh());
});

// JS dosyalarını sıkıştırır
// ve hepsini birleştirerek JS klasörüne kaydeder. All.js dosyası oluşturur.
gulp.task('js', function () {
    gulp.src(JSFiles)
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest(JSDir));
});

// İzlemeye alınan işlemler
gulp.task('watch', function () {
    // sass klasöründeki tüm dosya değişikliklerini izler ve css taskını çalıştırır.
    gulp.watch(sassFiles, ['css']);
    // belirlenen JS dosyalardaki değişikleri izler ve js taskını çalıştırır.
    gulp.watch(JSFiles, ['js']);
    // Dinlecek Portu Eklemek Lazım .
    refresh.listen();
 });

// Gulp çalıştığı anda yapılan işlemler
gulp.task('default', ['css', 'js', 'watch']);