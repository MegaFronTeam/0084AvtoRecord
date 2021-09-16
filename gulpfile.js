'use strict';
var sass = require('gulp-sass')(require('sass'));
global.$ = {
    gulp: require('gulp'),
    del: require('del'),
    babel: require('gulp-babel'),
    pug: require('gulp-pug'),
    notify: require('gulp-notify'), 
    svgmin: require('gulp-svgmin'),
    cheerio: require('gulp-cheerio'),
    replace: require('gulp-replace'),
    svgSprite: require('gulp-svg-sprite'),
    sass: sass,
    npmDist: require('gulp-npm-dist'),
    newer: require('gulp-newer'),
    rename: require('gulp-rename'),
    gp: require('gulp-load-plugins'),
    responsive: require('@tigersway/gulp-responsive'),

    gulpif: require('gulp-if'),
    sassGlob: require('gulp-sass-glob'),
    tabify: require('gulp-tabify'),
    envDev: false,
    gcmq: require('gulp-group-css-media-queries'),
    // "gulp-group-css-media-queries": "^1.2.2",
    gp: require('gulp-load-plugins')(),
    browserSync: require('browser-sync').create(),
    postcss: require('gulp-postcss'),
    autoprefixer: require('autoprefixer'),
    postcssPresetEnv: require('postcss-preset-env'),
    cssnano: require('cssnano'),
    postcssInlineSvg: require('postcss-inline-svg'),
    nested: require('postcss-nested'),
    plumber: require('gulp-plumber'),
    webpack: require('webpack-stream'),
    resizer: require('gulp-images-resizer'),
    path: {
        tasks: require('./gulp/config/tasks.js'),
    },
    public: 'public',
    sourse: 'sourse',

    react: require('gulp-react'),
    browserify: require('browserify'),
    buffer: require('vinyl-buffer'),
    sourceMaps: require('gulp-sourcemaps'),
    source: require('vinyl-source-stream'),
    babelify: require('babelify'),
}
$.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
});


$.gulp.task('img', $.gulp.series('cleanimg', 'img-responsive', 'img1x'));
$.gulp.task('libs', $.gulp.series('cleanlibs', 'copylibs'));

$.gulp.task('default', $.gulp.series('svg', 'svgCopy',
    // $.gulp.parallel('svg','pug','scripts:lib','scripts','file'),
    // $.gulp.parallel('file'),

    $.gulp.parallel(
        'img',
        'pug',
        'libs',
        //'react',
        // 'scripts',
        'scripts:common',
        'sass',
        'serv', 'watch'
        // 'scripts:common',
        // 'scripts:app',
    ),
    // $.gulp.parallel()
));
