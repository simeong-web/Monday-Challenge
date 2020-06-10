const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const pnqQuant = require('imagemin-pngquant');
const jpgRecompress = require('imagemin-jpeg-recompress');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const sassLint = require('gulp-sass-lint');

/* Paths */

let paths = {
    root: {
        www: './'
    },
    src: {
        root: './src',
        html: './**/*.html',
        scss: './src/sass/**/*.scss',
        js: './src/scripts/',
        imgs: './src/images/**/*.+(png|jpg|gif|svg)',
        vendor: './src/scripts/vendor/'
    },
    dist: {
        root: './dist',
        css: './dist/css/',
        js: './dist/scripts/',
        imgs: './dist/images'
    }
}

// Compile SCSS (SASS) to CSS
gulp.task('sass', () => {
    return gulp.src(paths.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.root + '/css'))
        .pipe(browserSync.stream());;
});

// Minify + combine CSS 
gulp.task('css', () => {
    return gulp.src(paths.dist.css + "master.css")
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.stream());
});


// Minify + combine JS + transpile to ES5
gulp.task('js', () => {
    return gulp.src([paths.src.js + 'vendor/*.js',
    paths.src.js + 'scripts.js'])
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(paths.dist.js))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.dist.js))
        .pipe(browserSync.stream());;
});

// Compress (JPEG, PNG, GIF, SVG, JPG)
gulp.task('img', () => {
    return gulp.src(paths.src.imgs)
        .pipe(imageMin([
            imageMin.gifsicle(),
            imageMin.mozjpeg(),
            imageMin.optipng(),
            imageMin.svgo(),
            pnqQuant(),
            jpgRecompress()
        ]))
        .pipe(gulp.dest(paths.dist.imgs));
});
/**** Additional Tasks for ease of use ****/
// Clean dist
gulp.task('clean', () => {
    return gulp.src(paths.dist.root)
        .pipe(clean());
});

// Prepare all assets for production
gulp.task('build', gulp.series('sass', 'css', 'js', 'img'));
//**** End of additional tasks ****/

/*** Watch component ***/
// Watch (SASS, JS and HTML) and reload browser on change
gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: paths.root.www
        }
    });


    gulp.watch(paths.src.scss, gulp.series('sass'))
    gulp.watch(paths.src.js, gulp.series('js'));
    gulp.watch(paths.src.imgs, gulp.series('img'));
    gulp.watch(paths.src.html).on('change', browserSync.reload);
    gulp.watch(paths.dist.css + "master.css", gulp.series('css'));
});

// Setting up default Gulp task
gulp.task('default', gulp.series(['build', 'watch']));