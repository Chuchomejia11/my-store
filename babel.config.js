module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react',
        'next/babel'
    ],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],  // Especificamos el directorio raíz
                alias: {
                    '@': './src',  // Mapeamos '@' a 'src'
                },
            },
        ],
    ],
};
