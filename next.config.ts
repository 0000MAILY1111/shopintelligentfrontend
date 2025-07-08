import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here, AQUI CONFIGURAREMOS LAS VARIABLES DE ENTORNO */
  images : {
   remotePatterns: [
    {
      protocol: 'http',
      hostname: process.env.DOMAIN!,
    },
    {
      protocol: 'https',
      hostname: process.env.DOMAIN!,
    },
    {
      protocol: 'http',
      hostname: 'localhost',
      port: '3000',
    },
    {
      protocol: 'https',
      hostname: 'localhost',
      port: '3000',
    }
  
  

   ]
      

  }
};

export default nextConfig;
