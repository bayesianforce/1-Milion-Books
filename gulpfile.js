/**
 * Created by Valerio Bartolini
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');

//Config
var jsDest = 'dist/js',
    cssDest = 'dist/css',
    cssFiles = [
        "css/app.css",
        "css/toolbar.css",
        "css/list.css"
    ],
    jsFiles = [
        'js/helper/helper.js',
        'js/conf/conf.js',
        'js/modules/Models/Book.js',
        'js/modules/Services/ToolBarService.js',
        'js/modules/Components/List.js',
        'js/modules/Components/Toolbar.js',
        'js/modules/Models/BookStore.js',
        'js/app.js'
    ];
//tasks
gulp.task('js', function () {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('js.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('js.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(jsDest))
        .pipe(livereload());

});
gulp.task('css', function () {
    return gulp.src(cssFiles)
        .pipe(concat('css.css'))
        .pipe(gulp.dest(cssDest))
        .pipe(rename('css.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(cssDest));
});

gulp.task('build', ['js', 'css']);

gulp.task('watch', ['build'], function () {
    gulp.watch([jsFiles, cssFiles], ['build']);
});

gulp.task('start', ['build', 'watch']);