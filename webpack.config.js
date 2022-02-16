module.exports ={
    entry : './src/main.js',
    output : {
        path : path.resolve(__dirname, './dist'),
        publicPath : '/dist/',
        filename: 'build.js'
    },
}