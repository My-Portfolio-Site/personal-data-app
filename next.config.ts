import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // // (Optional) Export as a standalone site
  // // See https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files
  // output: 'standalone', // Feel free to modify/remove this option

  // // Indicate that these packages should not be bundled by webpack
  // experimental: {
  //   serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
  // },
  experimental: {
    esmExternals: true
  },
}

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
