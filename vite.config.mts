import { defineConfig, PluginOption } from 'vite';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// https://github.com/MarkEdit-app/MarkEdit/wiki/Customization
const MARKEDIT_SCRIPTS_DIR = '/Library/Containers/app.cyan.markedit/Data/Documents/scripts/';
const BUILD_OUT_DIR = 'dist';

const copyDistFile: PluginOption = {
  name: 'copy-dist-file',
  closeBundle: () => {
    const distDir = path.join(__dirname, BUILD_OUT_DIR);
    const filename = fs.readdirSync(distDir).find(name => path.extname(name) === '.js');
    if (filename === undefined) {
      console.error('Failed to find generated .js file in dist directory.');
      return;
    }

    const sourcePath = path.join(distDir, filename);
    const destPath = path.join(os.userInfo().homedir, MARKEDIT_SCRIPTS_DIR, filename);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Successfully deployed: ${filename}, run "yarn reload" to restart the app.`);
  }
}

export default defineConfig({
  build: {
    outDir: BUILD_OUT_DIR,
    rollupOptions: {
      external: [
        'markedit-api',
        '@codemirror/view',
        '@codemirror/state',
        '@codemirror/language',
        '@codemirror/commands',
        '@codemirror/search',
        '@lezer/common',
        '@lezer/highlight',
        '@lezer/markdown',
        '@lezer/lr',
      ],
    },
    lib: {
      entry: 'main.ts',
      formats: ['cjs'],
    },
  },
  plugins: [copyDistFile],
});
