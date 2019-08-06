module.exports = {
	outputDir: 'webapp_build',
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/global.scss";`
            }
        }
    },
    devServer: {
        host: 'localhost'
    },
    configureWebpack: {
        externals: {
            faceit: 'FACEIT'
        }
    }
};