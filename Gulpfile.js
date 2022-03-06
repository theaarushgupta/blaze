const gulp = require("gulp");
const ts = require("gulp-typescript");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");

const project = ts.createProject("tsconfig.json");

const DESTINATION = "./bin";

gulp.task("default", function () {
    return project.src()
        .pipe( project() ).js
        .pipe( buffer() )
        .pipe( sourcemaps.init({ loadMaps: true }) )
        .pipe( uglify() )
        .pipe( sourcemaps.write("./") )
        .pipe( gulp.dest(DESTINATION) )
});