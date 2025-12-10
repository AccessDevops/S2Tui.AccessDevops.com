export function useStructuredData() {
  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'S2Tui',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows, macOS, Linux',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Transform your voice into text instantly. Free, private, unlimited speech-to-text desktop application powered by Whisper.cpp.',
    downloadUrl: 'https://github.com/AccessDevops/S2Tui/releases',
    softwareVersion: 'v0.1.0',
    author: {
      '@type': 'Organization',
      name: 'AccessDevOps',
      url: 'https://s2tui.accessdevops.com',
    },
    featureList: [
      '12+ Languages with auto-detection',
      'Auto-copy to clipboard',
      'Global keyboard shortcuts',
      'Powered by OpenAI Whisper',
      '100% offline and private',
      'Free and open source',
    ],
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AccessDevOps',
    url: 'https://s2tui.accessdevops.com',
    logo: 'https://s2tui.accessdevops.com/logo.png',
    sameAs: ['https://github.com/AccessDevops'],
  }

  return {
    softwareApplicationSchema,
    organizationSchema,
  }
}
