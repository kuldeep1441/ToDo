// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



 import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'
        // https://vitejs.dev/config/
    
        export default defineConfig({
          server: {
            // by making server and proxy there is no need to apply local host every time and it also resolve problem of cors
            proxy: {
              "/api": "to-ef4ewaoor-kuldeeps-projects-3c7ed0c8.vercel.app",
            },
          },
          plugins: [react()],
        });