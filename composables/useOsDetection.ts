import { ref, computed, onMounted } from 'vue'

export type Platform = 'macos-arm' | 'macos-intel' | 'windows' | 'linux' | 'unknown'

export interface DownloadOption {
  label: string
  filename: string
  url: string
}

export interface DownloadInfo {
  platform: Platform
  label: string
  primaryDownload: DownloadOption
  allOptions: DownloadOption[]
}

const VERSION = 'v0.1.0'
const GITHUB_RELEASES_BASE = `https://github.com/AccessDevops/S2Tui/releases/download/${VERSION}`

const DOWNLOADS: Record<Platform, DownloadInfo> = {
  'macos-arm': {
    platform: 'macos-arm',
    label: 'Download for macOS (Apple Silicon)',
    primaryDownload: {
      label: 'Installer (.dmg)',
      filename: 'S2Tui_0.1.0_aarch64.dmg',
      url: `${GITHUB_RELEASES_BASE}/S2Tui_0.1.0_aarch64.dmg`
    },
    allOptions: [
      {
        label: 'macOS Apple Silicon - Installer (.dmg)',
        filename: 'S2Tui_0.1.0_aarch64.dmg',
        url: `${GITHUB_RELEASES_BASE}/S2Tui_0.1.0_aarch64.dmg`
      }
    ]
  },
  'macos-intel': {
    platform: 'macos-intel',
    label: 'Download for macOS (Intel)',
    primaryDownload: {
      label: 'Installer (.dmg)',
      filename: 'S2Tui_0.1.0_x64.dmg',
      url: `${GITHUB_RELEASES_BASE}/S2Tui_0.1.0_x64.dmg`
    },
    allOptions: [
      {
        label: 'macOS Intel - Installer (.dmg)',
        filename: 'S2Tui_0.1.0_x64.dmg',
        url: `${GITHUB_RELEASES_BASE}/S2Tui_0.1.0_x64.dmg`
      }
    ]
  },
  'windows': {
    platform: 'windows',
    label: 'Download for Windows',
    primaryDownload: {
      label: 'Installer (.msi)',
      filename: 'S2Tui_0.1.0_x64_en-US.msi',
      url: `${GITHUB_RELEASES_BASE}/S2Tui_0.1.0_x64_en-US.msi`
    },
    allOptions: [
      {
        label: 'Windows - Installer (.msi)',
        filename: 'S2Tui_0.1.0_x64_en-US.msi',
        url: `${GITHUB_RELEASES_BASE}/S2Tui_0.1.0_x64_en-US.msi`
      },
      {
        label: 'Windows - Portable (.zip)',
        filename: 'S2Tui-portable-windows.zip',
        url: `${GITHUB_RELEASES_BASE}/S2Tui-portable-windows.zip`
      }
    ]
  },
  'linux': {
    platform: 'linux',
    label: 'Download for Linux',
    primaryDownload: {
      label: 'Debian Package (.deb)',
      filename: 'S2Tui_0.1.0_amd64.deb',
      url: `${GITHUB_RELEASES_BASE}/S2Tui_0.1.0_amd64.deb`
    },
    allOptions: [
      {
        label: 'Linux - Debian Package (.deb)',
        filename: 'S2Tui_0.1.0_amd64.deb',
        url: `${GITHUB_RELEASES_BASE}/S2Tui_0.1.0_amd64.deb`
      },
      {
        label: 'Linux - RPM Package (.rpm)',
        filename: 's2tui-0.1.0-1.fc40.x86_64.rpm',
        url: `${GITHUB_RELEASES_BASE}/s2tui-0.1.0-1.fc40.x86_64.rpm`
      }
    ]
  },
  'unknown': {
    platform: 'unknown',
    label: 'Download',
    primaryDownload: {
      label: 'View Releases',
      filename: '',
      url: 'https://github.com/AccessDevops/S2Tui/releases'
    },
    allOptions: []
  }
}

export function useOsDetection() {
  const platform = ref<Platform>('unknown')
  const isDetecting = ref(true)

  const detectPlatform = (): Platform => {
    if (typeof window === 'undefined') return 'unknown'

    const userAgent = navigator.userAgent.toLowerCase()
    const platformString = navigator.platform?.toLowerCase() || ''

    // macOS detection
    if (userAgent.includes('mac') || platformString.includes('mac')) {
      // Method 1: Check userAgent and platform strings
      if (
        userAgent.includes('arm') ||
        /apple m[0-9]/.test(userAgent) ||
        platformString.includes('arm64') ||
        platformString.includes('aarch64')
      ) {
        return 'macos-arm'
      }

      // Method 2: Try WebGL GPU detection for Apple Silicon
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        if (gl) {
          const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info')
          if (debugInfo) {
            const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
            // Apple Silicon GPUs are identified as "Apple M1", "Apple M2", etc.
            if (renderer.includes('apple m') || renderer.includes('apple gpu')) {
              return 'macos-arm'
            }
            // Intel Macs typically show "Intel" in renderer
            if (renderer.includes('intel')) {
              return 'macos-intel'
            }
          }
        }
      } catch (e) {
        // Silently fail if WebGL is not available
      }

      // Method 3: Check navigator.maxTouchPoints (Apple Silicon Macs have higher values)
      if (navigator.maxTouchPoints > 2) {
        return 'macos-arm'
      }

      // Default to Intel if we can't determine
      return 'macos-intel'
    }

    // Windows detection
    if (userAgent.includes('win') || platformString.includes('win')) {
      return 'windows'
    }

    // Linux detection
    if (userAgent.includes('linux') || platformString.includes('linux')) {
      return 'linux'
    }

    return 'unknown'
  }

  const currentDownload = computed(() => DOWNLOADS[platform.value])

  const allDownloadOptions = computed(() => {
    const options: DownloadOption[] = []
    Object.values(DOWNLOADS).forEach(download => {
      if (download.platform !== 'unknown') {
        options.push(...download.allOptions)
      }
    })
    return options
  })

  onMounted(() => {
    platform.value = detectPlatform()
    isDetecting.value = false
  })

  return {
    platform,
    isDetecting,
    currentDownload,
    allDownloadOptions
  }
}
