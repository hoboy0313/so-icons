import path from 'node:path';
import {Buffer} from 'node:buffer';
import {transform} from '@svgr/core';
import through2 from 'through2';
import type Vinyl from 'vinyl';

export default function gulpSvgr() {
    // the file format is like https://github.com/gulpjs/vinyl
    return through2.obj((file: Vinyl, encoding, cb) => {
        if (file.isBuffer()) {
            // 源码
            const source = file.contents.toString(encoding);
            const result = transform.sync(
                source,
                {
                    icon: true,
                    plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
                },
                {componentName: 'MyComponent'},
            );

            // 提取名字
            // const r = path.parse(file.path);

            file.contents = Buffer.from(result);
            cb(null, file);
        }
    });
}
