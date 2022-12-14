const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const minify = require("gulp-minify-css");
const sass = require("gulp-sass")(require("node-sass"));

gulp.task("styles", () => {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(sass())
    .pipe(concat("styles.css"))
    .pipe(minify())
    .pipe(gulp.dest("dist"));
});

gulp.task("scripts", () => {
  return gulp
    .src("./src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
  gulp.watch("./src/js/*.js", gulp.series("scripts"));
  gulp.watch("./src/scss/**/*.scss", gulp.series("styles"));
});

gulp.task("build", gulp.series("styles", "scripts"));
