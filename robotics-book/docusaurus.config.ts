// import {themes as prismThemes} from 'prism-react-renderer';
// import type {Config} from '@docusaurus/types';
// import type * as Preset from '@docusaurus/preset-classic';

// const config: Config = {
//   title: 'Physical AI & Humanoid Robotics',
//   tagline: 'A comprehensive course on building intelligent physical systems',
//   favicon: 'img/favicon.ico',

//   future: {
//     v4: true,
//   },

//   // ✅ Vercel deployment info
//   url: 'https://ai-robotics-seven.vercel.app', // tumhare Vercel project URL
//   baseUrl: '/', // root deploy ke liye '/'
//   organizationName: 'Mailakhan67',
//   projectName: 'ai-robotics',

//   onBrokenLinks: 'throw',

//   i18n: {
//     defaultLocale: 'en',
//     locales: ['en'],
//   },

//   presets: [
//     [
//       'classic',
//       {
//         docs: {
//           sidebarPath: './sidebars.ts',
//           routeBasePath: '/', // homepage ke liye
//           showLastUpdateTime: true,
//         },
//         blog: false,
//         theme: {
//           customCss: './src/css/custom.css',
//         },
//       } satisfies Preset.Options,
//     ],
//   ],

//   themeConfig: {
//     image: 'img/docusaurus-social-card.jpg',
//     colorMode: {
//       respectPrefersColorScheme: true,
//     },
//     navbar: {
//       title: 'Physical AI & Humanoid Robotics',
//       items: [
//         {type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Course'},
//         {type: 'search', position: 'right'},
//         {to: '/signup', label: 'Sign Up', position: 'right'},
//         {to: '/login', label: 'Log In', position: 'right'},
//         {href: 'https://github.com/Mailakhan67/ai-robotics', label: 'GitHub', position: 'right'},
//       ],
//     },
//     footer: {
//       style: 'dark',
//       links: [
//         {
//           title: 'Course Content',
//           items: [
//             {label: 'Introduction', to: '/foundations/intro-physical-ai'},
//           ],
//         },
//         {
//           title: 'Resources',
//           items: [
//             {label: 'GitHub Repository', href: 'https://github.com/Mailakhan67/ai-robotics'},
//             {label: 'Discussion Forum', href: 'https://github.com/Mailakhan67/ai-robotics/discussions'},
//           ],
//         },
//         {
//           title: 'About',
//           items: [
//             {label: 'About This Course', to: '/'},
//             {label: 'License', href: 'https://github.com/Mailakhan67/ai-robotics/blob/main/LICENSE'},
//           ],
//         },
//       ],
//       copyright: `Physical AI & Humanoid Robotics Course`,
//     },
//     prism: {
//       theme: prismThemes.github,
//       darkTheme: prismThemes.dracula,
//       additionalLanguages: ['python', 'bash'],
//     },
//     algolia: {
//       appId: 'YOUR_APP_ID',
//       apiKey: 'YOUR_API_KEY',
//       indexName: 'robotics-book',
//       contextualSearch: true,
//     },
//   } satisfies Preset.ThemeConfig,
// };

// export default config;





























































import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'A comprehensive course on building intelligent physical systems',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // ✅ Vercel deployment info
  url: 'https://ai-robotics-seven.vercel.app',
  baseUrl: '/',
  organizationName: 'Mailakhan67',
  projectName: 'ai-robotics',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    // Add custom theme for navbar item
  ],

  plugins: [
    // Add any custom plugins if needed
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      items: [
        {type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Course'},
        {type: 'search', position: 'right'},
        {
          type: 'custom-navbar-language-switch',
          position: 'right',
        },
        // ✅ Replace hardcoded links with custom auth component
        {type: 'custom-auth', position: 'right'},
        {href: 'https://github.com/Mailakhan67/ai-robotics', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Course Content',
          items: [
            {label: 'Introduction', to: '/foundations/intro-physical-ai'},
          ],
        },
        {
          title: 'Resources',
          items: [
            {label: 'GitHub Repository', href: 'https://github.com/Mailakhan67/ai-robotics'},
            {label: 'Discussion Forum', href: 'https://github.com/Mailakhan67/ai-robotics/discussions'},
          ],
        },
        {
          title: 'About',
          items: [
            {label: 'About This Course', to: '/'},
            {label: 'License', href: 'https://github.com/Mailakhan67/ai-robotics/blob/main/LICENSE'},
          ],
        },
      ],
      copyright: `Physical AI & Humanoid Robotics Course`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash'],
    },
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_API_KEY',
      indexName: 'robotics-book',
      contextualSearch: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
