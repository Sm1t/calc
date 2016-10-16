var gulp 		 = require('gulp'),
	sass 		 = require('gulp-sass')
	browserSync  = require('browser-sync')
	imagemin	 = require('gulp-imagemin')
	autoprefixer = require('gulp-autoprefixer')
	cache		 = require('gulp-cache')
	pngquant	 = require('imagemin-pngquant')


gulp.task('sass', function(){
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
})


gulp.task('browser-sync', function(){
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	})
})


gulp.task('img', function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'))
})


gulp.task('watch', ['browser-sync', 'sass'], function(){
	gulp.watch('app/sass/**/*.sass', ['sass'])
	gulp.watch('app/*.html', browserSync.reload)
	gulp.watch('app/js/**/*.js', browserSync.reload)
})


gulp.task('build', ['img', 'sass'], function(){

	var buildCss = gulp.src([
		'app/css/main.css',
	])
	.pipe(gulp.dest('dist/css'))

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))

})