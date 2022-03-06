const gulp = require("gulp");
const ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");

const project = ts.createProject("tsconfig.json");

const RESOURCES = "./res/**/*";
const DESTINATION = "./bin";

gulp.task("copy-res", () => {
    return gulp.src(RESOURCES).pipe(gulp.dest(DESTINATION + "/res"))
})

gulp.task("build-ts", () => {
    return project.src()
        .pipe(project()).js
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(DESTINATION));
});

gulp.task(
    "default",
    gulp.series(gulp.parallel("copy-res")),
    gulp.series(gulp.parallel("build-ts"))
);