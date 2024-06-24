import path from 'node:path';
import fs from 'node:fs';
import childProcess from 'node:child_process';
import esbuild from 'esbuild';
import {rollup} from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const bundle = await rollup({
    input: path.resolve('gulpfile.ts'),
    external: id => !id.endsWith('.ts') && (/node_modules/.test(id) || !/\.+\//.test(id)),
    plugins: [
        nodeResolve({
            preferBuiltins: true,
            extensions: ['.ts', '.mjs', '.js', '.json'],
            modulesOnly: true,
        }),
        commonjs(),
        {
            name: 'esbuild',
            transform(code, id) {
                if (id.endsWith('.ts')) {
                    const transformed = esbuild.transformSync(code, {loader: 'ts'});
                    return transformed.code;
                }

                return code;
            },
        },
    ],
});

// // 由于配置文件在各个环境的兼容性堪忧，这里直接使用 ts，自行生成一个更方便识别的类型使用。
const configName = `gulpfile.${Date.now()}.mjs`;
const configPath = path.resolve(configName);
await bundle.write({
    file: configName,
    format: 'es',
});

try {
    childProcess.spawnSync('gulp', ['--gulpfile', configName], {stdio: 'inherit'});
    setTimeout(() => fs.unlinkSync(configPath), 200);
} catch (e) {
    fs.unlinkSync(configPath);
}
