import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader';

const pathResolve = (pathStr) => path.resolve(__dirname, pathStr);

export default defineConfig({
    build: {
        entry: {
            'MinderEditor': __dirname + '/src/components/index.js'
        },
        lib: {
            entry: path.resolve(__dirname, 'src/components/index.js'),
            name: 'MinderEditor'
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                // Provide global variables to use in the UMD build
                // Add external deps here
                globals: {
                    vue: 'Vue',
                }
            }
        }
    },
    server: {
        host: '0.0.0.0',
        fs: {
            strict: false,
            allow: []
        }
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: [
            {
                find: '@',
                replacement: pathResolve('src')
            },
            {
                find: /^~/,
                replacement: ''
            }
        ]
    },
    plugins: [
        vue(),
        svgLoader()
    ],
    css: {
        postcss: {},
        preprocessorOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
});