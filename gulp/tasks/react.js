module.exports = function () {

	$.gulp.task('react', function () {
		return $.gulp.src($.sourse + '/react/*.jsx')
			.pipe($.react())
			.pipe($.gulp.dest($.public + '/js'))
			.pipe($.browserSync.stream());
	});
}