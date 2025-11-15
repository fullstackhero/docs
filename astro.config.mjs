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
					collapsed: true,
					autogenerate: { directory: 'getting-started', collapsed: true },
				},
				{
					label: 'Core Concepts',
					collapsed: true,
					autogenerate: { directory: 'concepts', collapsed: true },
				},
				{
					label: 'Architecture',
					collapsed: true,
					autogenerate: { directory: 'architecture', collapsed: true },
				},
				{
					label: 'Modules',
					collapsed: true,
					autogenerate: { directory: 'modules', collapsed: true },
				},
				{
					label: 'Building Blocks',
					collapsed: true,
					autogenerate: { directory: 'building-blocks', collapsed: true },
				},
				{
					label: 'How-to Guides',
					collapsed: true,
					autogenerate: { directory: 'how-to', collapsed: true },
				},
				{
					label: 'Cookbook',
					collapsed: true,
					autogenerate: { directory: 'cookbook', collapsed: true },
				},
				{
					label: 'Reference',
					collapsed: true,
					autogenerate: { directory: 'reference', collapsed: true },
				},
				{
					label: 'Changelog',
					collapsed: true,
					autogenerate: { directory: 'changelog', collapsed: true },
				},
			],
		}),
		tailwind({
			// Let Starlight own base typography; we only need utilities.
			applyBaseStyles: false,
		}),
	],
});
