// import { defineConfig } from "vite"
// import react from "@vitejs/plugin-react"
// import path from "path"


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   define: {
//         global: {},
//     },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src")
//     }
    
    
//   }
// })


import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Custom plugin to strip out 'use client' directives
const stripUseClientPlugin: Plugin = {
  name: 'strip-use-client',
  transform(code, id) {
    if (id.includes('node_modules/@mui/material') || id.includes('node_modules/@mui/system')) {
      return code.replace(/["']use client["'];?/g, '');
    }
    return code;
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    stripUseClientPlugin,
  ],
  define: {
    global: {},
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

