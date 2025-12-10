export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],

  site: {
    url: 'https://s2tui.accessdevops.com',
    name: 'S2Tui - Speech to Text',
  },

  sitemap: {
    hostname: 'https://s2tui.accessdevops.com',
    gzip: true,
    routes: ['/'],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'S2Tui - Speech to Text, 100% Local',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },

        // SEO Meta Tags
        { name: 'description', content: 'Transform your voice into text instantly with S2Tui. Free, private, unlimited speech-to-text for Windows, macOS, and Linux. Powered by Whisper.cpp, 100% offline.' },
        { name: 'keywords', content: 'speech to text, voice to text, transcription, offline, privacy, free, whisper, S2Tui, voice recognition, dictation software' },
        { name: 'author', content: 'AccessDevOps' },
        { name: 'robots', content: 'index, follow' },

        // Theme
        { name: 'theme-color', content: '#0ea5e9' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://s2tui.accessdevops.com/' },
        { property: 'og:title', content: 'S2Tui - Speech to Text, 100% Local & Private' },
        { property: 'og:description', content: 'Transform your voice into text instantly. Free, private, unlimited speech-to-text desktop app.' },
        { property: 'og:image', content: 'https://s2tui.accessdevops.com/og-image.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'S2Tui - Speech to Text, 100% Local & Private' },
        { name: 'twitter:description', content: 'Transform your voice into text instantly. Free, private, unlimited.' },
        { name: 'twitter:image', content: 'https://s2tui.accessdevops.com/og-image.png' },

        // Apple Mobile
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-title', content: 'S2Tui' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'canonical', href: 'https://s2tui.accessdevops.com/' },
        { rel: 'manifest', href: '/manifest.json' },

        // Preload
        { rel: 'preload', as: 'image', href: '/logo.png' },
        { rel: 'dns-prefetch', href: 'https://github.com' },
        { rel: 'dns-prefetch', href: 'https://player.vimeo.com' },
      ],
      script: [
        // Google Analytics (gtag.js)
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-CF6X11BL18'
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CF6X11BL18');
          `
        }
      ]
    }
  },
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/']
    },
    compressPublicAssets: true,
  }
})
