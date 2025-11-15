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
					label: 'Getting Started',
					autogenerate: { directory: 'getting-started' },
				},
				{
					label: 'Core Concepts',
					autogenerate: { directory: 'concepts' },
				},
				{
					label: 'Architecture',
					autogenerate: { directory: 'architecture' },
				},
				{
					label: 'Modules',
					autogenerate: { directory: 'modules' },
				},
				{
					label: 'Building Blocks',
					autogenerate: { directory: 'building-blocks' },
				},
				{
					label: 'How-to Guides',
					autogenerate: { directory: 'how-to' },
				},
				{
					label: 'Cookbook',
					autogenerate: { directory: 'cookbook' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Changelog',
					autogenerate: { directory: 'changelog' },
				},
			],
		}),
		tailwind({
			// Let Starlight own base typography; we only need utilities.
			applyBaseStyles: false,
		}),
	],
});
