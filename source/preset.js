import RemarkGFM from 'remark-gfm';
import RehypePrism from '@mapbox/rehype-prism';
import RemarkFrontmatter from 'remark-frontmatter';
import RemarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';

const RemarkEmbedder = remarkEmbedder['default'],
    OembedTransformer = oembedTransformer['default'];
/**
 * @type {import('@mdx-js/mdx').CompileOptions}
 */
export default {
    remarkPlugins: [
        RemarkGFM,
        [RemarkEmbedder, { transformers: [OembedTransformer] }],
        RemarkFrontmatter,
        RemarkMdxFrontmatter
    ],
    rehypePlugins: [RehypePrism]
};
