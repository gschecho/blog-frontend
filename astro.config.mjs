// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react(),
  ],
  //IMPORTANTE PARA LAS RUTAS REACTR
  output: 'server', 
  // Si necesitas comportamiento híbrido (algunas páginas pre-renderizadas)
  // puedes usar la opción prerender:
  prerender: {
    // Estas páginas se pre-renderizarán en build time
    entries: ['/', '/blog', '/about']
  },
    // Las redirecciones funcionan diferente en Astro 5
    redirects: {
      '/app/*': '/app',
      '/auth/*': '/auth'
    },
  vite: {
    plugins: [tailwindcss()]
  }
});




//ESENCIAL PARA QUE FUNCIONE EL REACT ROUTER
 /* output:'static',
  server: {
  //SOLO CREAR REDIRECCIONES EN PRODUCCION
    redirects: (() => {
      if(process.env.NODE_ENV === 'production'){
        return [
          {
          '/app/*'  : '/app'
        
          }
        ]
        return{};
      }

  })()
  },
  // ESTA CONFIGURACION ES PARA EL MANEJO DE RUTAS
  build: {
    client: './dis/client'
  }, */