import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'node:path';
import { fileURLToPath } from 'node:url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync( path.join(__dirname,'..','certs','localhost+2-key.pem')),
      cert: fs.readFileSync(path.join(__dirname,'..','certs','localhost+2.pem'))
    },
    port: 5173
    },
})
