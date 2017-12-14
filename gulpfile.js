'use strict';

// Gulp + Plugins
var gulp = require('gulp'); // gulp
var yargs = require('yargs'); // library to read command line args
var _if = require('gulp-if'); // library to provide conditionals in gulp streams
var rimraf = require('rimraf'); // library to clean the dist directory before building
var plugin = {
	webpack: require('webpack-stream'),

	sass: require('gulp-sass'), // compile sass/scss into css
	autoPrefixer: require('gulp-autoprefixer'), // automatically adds browser prefixes to css
	cleanCss: require('gulp-clean-css'), // minify css
	concatCss: require('gulp-concat-css'), // combine css into a single file
	zip: require('gulp-zip') // zip files for upload to ghost admin
};
var debug = require('gulp-debug');

// Paths
const DIST = 'dist';
const DIST_ASSETS = DIST + '/assets';
const DIST_CSS = DIST_ASSETS + '/css';
const DIST_JS = DIST_ASSETS + '/js';
const ZIP = 'ghost-foundation-starter.zip';

const SCSS_PATH = 'src/assets/scss/';
const SCSS_MAIN = SCSS_PATH + 'main.scss';
const SCSS_OUTPUT = 'main.css';
const SCSS_INCLUDE_PATHS = [ 'node_modules/foundation-sites/scss' ];


const WEBPACK_CONFIG = './webpack.config.js';

const ASSETS = [ 'src/assets/**/*', '!src/assets/{js,scss}/**/*' ];
const TEMPLATES = [ 'src/**/*.hbs' ];


// options for auto prefixer
const AUTOPREFIXER_OPTS = {
	browsers: ['last 2 versions'],
	cascade: false
};

// Grab --production flag from command line
const PRODUCTION = !!(yargs.argv.production);
// Set node to production mode if we're doing a production build. This signals the webpack config to also build for
// production.
process.env.NODE_ENV = PRODUCTION ? "production" : "development";

gulp.task('build', gulp.series(clean, gulp.parallel(sass, webpack, copy_assets, copy_templates), zip));
gulp.task('default', gulp.series(clean, gulp.parallel(sass, webpack, copy_assets, copy_templates), zip));

function clean(done) {
	rimraf(DIST, done);
}

function copy_assets() {
	return gulp.src(ASSETS)
		.pipe(gulp.dest(DIST_ASSETS));
}

function copy_templates() {
	return gulp.src(TEMPLATES)
		.pipe(gulp.dest(DIST));
}

// Task to build scss files into a single css file
function sass() {
	return gulp.src(SCSS_MAIN)
		.pipe(plugin.sass({ includePaths: SCSS_INCLUDE_PATHS }).on('error', plugin.sass.logError))
		.pipe(plugin.autoPrefixer(AUTOPREFIXER_OPTS))
		.pipe(plugin.concatCss(SCSS_OUTPUT))
		.pipe(_if(PRODUCTION, plugin.cleanCss({ compatibility: 'ie9' })))
		.pipe(gulp.dest(DIST_CSS));
}

function webpack() {
	return plugin.webpack(require(WEBPACK_CONFIG))
		.pipe(gulp.dest(DIST_JS));
}

function zip() {
	return gulp.src(DIST + '/**/*')
		.pipe(plugin.zip(ZIP))
		.pipe(gulp.dest(DIST));
}
