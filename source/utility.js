export const JSConfigExtensions = ['js', 'cjs', 'mjs'];
export const ConfigExtensions = ['json', ...JSConfigExtensions, 'cts'];
/**
 * @see {@link https://babeljs.io/docs/config-files#configuration-file-types}
 */
export const BabelConfigFiles = [
    ...ConfigExtensions.map(extension => `babel.config.${extension}`),
    ...ConfigExtensions.map(extension => `.babelrc.${extension}`),
    '.babelrc'
];
export const MDXConfigFiles = JSConfigExtensions.map(
    extension => `mdx.config.${extension}`
);

/**
 * @typedef {Object} BabelReactPreset
 * @property {import('@mdx-js/mdx').CompileOptions['jsxRuntime']} runtime
 * @property {import('@mdx-js/mdx').CompileOptions['jsxImportSource']} importSource
 * @property {import('@mdx-js/mdx').CompileOptions['pragma']} pragma
 * @property {import('@mdx-js/mdx').CompileOptions['pragmaFrag']} pragmaFrag
 */
