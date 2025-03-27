// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react(),
  ],
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
  vite: {
    plugins: [tailwindcss()]
  }
});