// @ts-check
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'fullstackhero',
			titleDelimiter: '-',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/fullstackhero/dotnet-starter-kit',
				},
			],
			customCss: ['./src/styles/tailwind.css', './src/styles/custom.scss'],
			components: {
				Footer: './src/components/PageFooterWithViews.astro',
			},
			logo: {
				src: './src/assets/full-stack-hero-logo.png',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
		tailwind({
			// Let Starlight own base typography; we only need utilities.
			applyBaseStyles: false,
		}),
	],
});
