import { Plugin } from 'vite';

export interface VitePluginOption {}

declare function export_default(options?: VitePluginOption): Plugin;

export { export_default as default };
