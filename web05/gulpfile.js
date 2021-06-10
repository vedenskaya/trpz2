//Подключаем модуль Gulp
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const svgmin = require('gulp-svgmin');
const htmlmin = require('gulp-htmlmin');

//Порядок подключения css файлов
const cssFiles = [
  './bootstrap/css/bootstrap.min.css',
  './css/jquery.fancybox.min.css'];

//Порядок подключения css файлов
const jsFiles = [
  './js/jquery-3.3.1.min.js',
  './js/bootstrap.bundle.min.js'];

const imgFiles = [
  './img/a1.jpg',
  './img/a2.jpg',
  './img/a3.jpeg',
  './img/a4.jpg',
  './img/a5.jpg',
  './img/a6.jpg',
  './img/a7.jpg',
  './img/a8.jpg'];

const imgToSpriteFiles = [
  './build/img/a1.jpg',
  './build/img/a2.jpg',
  './build/img/a3.jpeg',
  './build/img/a4.jpg',
  './build/img/a5.jpg',
  './build/img/a6.jpg',
  './build/img/a7.jpg',
  './build/img/a8.jpg'];

const svgFile = ['./img/bootstrap-logo.svg'];
const htmlFile = ['./index.html'];

//Таск для стилей CSS 
function styles() {
  //Шаблон для поиска файлов CSS
  return gulp.src(cssFiles)
  //Объединение файлов в один
  .pipe(concat('style.css'))
  //Минификация CSS
  .pipe(cleanCSS({
    level: 2
  }))
  //Выходная папка для стилей
  .pipe(gulp.dest('./build/css'))
}

//Таск для скриптов JavaScript 
function scripts() {
  //Шаблон для поиска файлов JavaScript
  return gulp.src(jsFiles)
  // JSHint
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  //Объединение файлов в один
  .pipe(concat('script.js'))
  //Минификация JavaScript
  .pipe(uglify())
  //Выходная папка для стилей
  .pipe(gulp.dest('./build/js'))
}

// Таск для изображений
function images() {
  return gulp.src(imgFiles)
  .pipe(imagemin())
  .pipe(gulp.dest('./build/img'));
}

function sprite() {
  return gulp.src(imgToSpriteFiles)
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css'
  }))
  .pipe(gulp.dest('./build/img'));
}

function svg() {
  return gulp.src(svgFile)
  .pipe(svgmin())
  .pipe(gulp.dest('./build/img'));
}

function html() {
  return gulp.src(htmlFile)
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('./build'));
}

//Вызов функций
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('images', images);
gulp.task('sprite', sprite);
gulp.task('svg', svg);
gulp.task('html', html);
