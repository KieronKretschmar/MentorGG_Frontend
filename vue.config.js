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
        host: 'localhost',
        // https: true,
        // https: {
        //   key: fs.readFileSync('./certs/rootCA.pem'),
        //   cert: fs.readFileSync('./certs/example.com+5.pem'),
        // },
        // public: 'https://localhost:8080/'
    },
    configureWebpack: (env) => {
        return {
            externals: {
                faceit: 'FACEIT',
                paddle: 'Paddle'
            },
            devtool: 'source-map'
        }
    }
};