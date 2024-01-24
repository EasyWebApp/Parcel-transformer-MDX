import { Transformer } from '@parcel/plugin';
import { compile } from '@mdx-js/mdx';
import RemarkGFM from 'remark-gfm';
import RehypePrism from '@mapbox/rehype-prism';
import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';
import RemarkFrontmatter from 'remark-frontmatter';

const RemarkEmbedder = remarkEmbedder['default'],
    OembedTransformer = oembedTransformer['default'];

export default new Transformer({
    async loadConfig({ config }) {
        const { contents } = await config.getConfig(['tsconfig.json']);

        return contents;
    },
    async transform({ asset, config }) {
        /**
         * @type {import('types-tsconfig').TSConfigJSON['compilerOptions']}
         */
        const { jsx, jsxImportSource } = config.compilerOptions;

        const source = await asset.getCode();

        const vFile = await compile(source, {
            jsxRuntime: jsx === 'react' ? 'classic' : 'automatic',
            jsxImportSource,
            remarkPlugins: [
                RemarkGFM,
                [RemarkEmbedder, { transformers: [OembedTransformer] }],
                RemarkFrontmatter
            ],
            rehypePlugins: [RehypePrism]
        });
        asset.type = 'jsx';
        asset.setCode(vFile + '');

        return [asset];
    }
});
