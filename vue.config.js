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
    configureWebpack: (env) => {
        return {
            externals: {
                faceit: 'FACEIT'
            },
            devtool: 'source-map'
        }
    },
    devServer: {
        // enable ngrok to fake mentor.gg origin instead of localhost
        disableHostCheck: true,
    }
};