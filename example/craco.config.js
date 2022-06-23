// craco.config.js
module.exports = {
    webpack: {
        configure: {
            optimization: {
                runtimeChunk: false,
                splitChunks: {
                    chunks(chunk) {
                        return false
                    },
                },
            },
        },
    },
}