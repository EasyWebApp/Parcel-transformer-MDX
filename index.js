import { Transformer } from '@parcel/plugin';
import { compile } from '@mdx-js/mdx';
import RemarkGFM from 'remark-gfm';
import RehypePrism from '@mapbox/rehype-prism';
import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';
import RemarkFrontmatter from 'remark-frontmatter';
import RemarkMdxFrontmatter from 'remark-mdx-frontmatter';

const RemarkEmbedder = remarkEmbedder['default'],
    OembedTransformer = oembedTransformer['default'];

const ConfigExtensions = ['json', 'js', 'cjs', 'mjs', 'cts'];
/**
 * @see {@link https://babeljs.io/docs/config-files#configuration-file-types}
 */
const BabelConfigFiles = [
    ...ConfigExtensions.map(extension => `babel.config.${extension}`),
    ...ConfigExtensions.map(extension => `.babelrc.${extension}`),
    '.babelrc'
];

export default new Transformer({
    async loadConfig({ config }) {
        const { contents } = await config.getConfig(
            ['tsconfig.json', 'jsconfig.json', ...BabelConfigFiles],
            { packageKey: 'babel' }
        );
        return contents;
    },
    async transform({ asset, config }) {
        /**
         * @type {import('types-tsconfig').TSConfigJSON['compilerOptions']}
         */
        const { jsx, jsxImportSource, jsxFactory, jsxFragmentFactory } =
            config.compilerOptions || {};
        /**
         * @see {@link https://babeljs.io/docs/babel-preset-react#with-a-configuration-file-recommended}
         */
        const [_, { runtime, importSource, pragma, pragmaFrag } = {}] =
            config.presets?.find(
                preset =>
                    preset instanceof Array &&
                    preset[0] === '@babel/preset-react'
            ) || [];
        const source = await asset.getCode();

        const vFile = await compile(source, {
            jsxRuntime: runtime || (jsx === 'react' ? 'classic' : 'automatic'),
            jsxImportSource: jsxImportSource || importSource,
            pragma: pragma || jsxFactory,
            pragmaFrag: pragmaFrag || jsxFragmentFactory,
            remarkPlugins: [
                RemarkGFM,
                [RemarkEmbedder, { transformers: [OembedTransformer] }],
                RemarkFrontmatter,
                RemarkMdxFrontmatter
            ],
            rehypePlugins: [RehypePrism]
        });
        asset.type = 'jsx';
        asset.setCode(vFile + '');

        return [asset];
    }
});
