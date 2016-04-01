var gulp = require("gulp"),
    supervisor = require( "gulp-supervisor" );

gulp.task("supervisor", function() {
    supervisor("app.js", {
        ignore: [ "views", "public" ],
        debug: true
    });
});

gulp.task("default", ["supervisor"], function() {
    console.log("Gulp completed...")
});