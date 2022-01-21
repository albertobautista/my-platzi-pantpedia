const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const config = {
  future: {
    webpack5: true,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  // env: {
  //   NEXT_PUBLIC_SPACE_ID: '3qtt08j56q7o',
  //   NEXT_PUBLIC_ACCESS_TOKEN: '3LM0ofA3KN6pKKO4qRBjPR4pflLKPl8tXkdawwcSxX8',
  // },
}

module.exports = withBundleAnalyzer(config)
