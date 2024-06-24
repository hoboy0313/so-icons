import gulp from 'gulp';
import * as del from 'del';

import svgr from './tools/svgr';

gulp.task('clean', () => {
    return del.deleteAsync(['dist']);
});

gulp.task('compile', () => {
    return gulp
        .src('src/*.svg')
        .pipe(svgr())
        .pipe(gulp.dest('dist'));
});

export default gulp.series('clean', 'compile');
