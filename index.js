import { Transformer } from '@parcel/plugin';
import { compile } from '@mdx-js/mdx';

import MDXPreset from './source/preset.js';
import { BabelConfigFiles, MDXConfigFiles } from './source/utility.js';

export { MDXPreset };
export * from './source/utility.js';

export default new Transformer({
    /**
     * @returns {Promise<import('@mdx-js/mdx').CompileOptions>}
     */
    async loadConfig({ config }) {
        const [TSConfig, BabelConfig, MDXConfig] = await Promise.all([
            config.getConfig(['tsconfig.json', 'jsconfig.json']),
            config.getConfig(BabelConfigFiles, { packageKey: 'babel' }),
            config.getConfig(MDXConfigFiles, { packageKey: 'mdx' })
        ]);
        /**
         * @type {import('types-tsconfig').TSConfigJSON['compilerOptions']}
         */
        const { jsx, jsxImportSource, jsxFactory, jsxFragmentFactory } =
            TSConfig?.contents.compilerOptions || {};
        /**
         * @see {@link https://babeljs.io/docs/babel-preset-react#with-a-configuration-file-recommended}
         */
        const [_, ReactPreset = {}] =
            BabelConfig?.contents.presets?.find(
                preset =>
                    preset instanceof Array &&
                    preset[0] === '@babel/preset-react'
            ) || [];
        /**
         * @type {import('./source/utility').BabelReactPreset}
         */
        const { runtime, importSource, pragma, pragmaFrag } = ReactPreset;

        return {
            jsxRuntime: runtime || (jsx === 'react' ? 'classic' : 'automatic'),
            jsxImportSource: jsxImportSource || importSource,
            pragma: pragma || jsxFactory,
            pragmaFrag: pragmaFrag || jsxFragmentFactory,
            ...MDXPreset,
            ...MDXConfig?.contents
        };
    },
    async transform({ asset, config }) {
        const source = await asset.getCode();

        const vFile = await compile(source, config);
        asset.type = 'jsx';
        asset.setCode(vFile + '');

        return [asset];
    }
});
