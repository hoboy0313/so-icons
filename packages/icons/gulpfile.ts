import gulp from 'gulp';

function compile() {
    return gulp.dest('dist/');
}

export function build() {
    return gulp.series(
        compile,
    );
}
