import { Plugin } from 'vite';

export interface VitePluginOption {
  consoleCompare?: boolean
}

declare function export_default(options?: VitePluginOption): Plugin;

export { export_default as default };
