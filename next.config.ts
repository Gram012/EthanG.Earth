import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true
  },

  beforeFiles: [
    // if the host is `app.acme.com`,
    // this rewrite will be applied
    {
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'jump.ethang.earth',
        },
      ],
      destination: '/jump/:path*',
    },
  ]
};

export default nextConfig;
