import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here, AQUI CONFIGURAREMOS LAS VARIABLES DE ENTORNO */
  images : {
   remotePatterns: [
    {
      protocol: 'http',
      hostname: process.env.DOMAIN!,
  
    }
   ]
      

  }
};

export default nextConfig;
