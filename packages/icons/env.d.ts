declare module 'gulp-clean' {
    export default function cleanFn(options?: {force?: boolean}): () => NodeJS.ReadWriteStream;
}
