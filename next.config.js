const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  // Use this prefix when using the default github.io link
  assetPrefix: isProduction ? '/markdown-table-gen' : '',
}
