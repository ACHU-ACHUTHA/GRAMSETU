import type { Plugin } from 'vite';

/**
 * Vite plugin that updates og:image and twitter:image meta tags
 * to use relative paths for the opengraph image.
 */
export function metaImagesPlugin(): Plugin {
  return {
    name: 'vite-plugin-meta-images',
    transformIndexHtml(html) {
      // Update meta tags to use relative paths
      // The image will be served from the public directory
      html = html.replace(
        /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/g,
        `<meta property="og:image" content="/opengraph.jpg" />`
      );

      html = html.replace(
        /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/g,
        `<meta name="twitter:image" content="/opengraph.jpg" />`
      );

      return html;
    },
  };
}
