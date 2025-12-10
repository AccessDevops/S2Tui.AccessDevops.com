<script setup lang="ts">
const { currentDownload, allDownloadOptions, isDetecting } = useOsDetection()
const { softwareApplicationSchema, organizationSchema } = useStructuredData()

// Add structured data to head
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(softwareApplicationSchema),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema),
    },
  ],
})

const demoVideoRef = ref<HTMLVideoElement>()
const currentVideoTime = ref(0)

const updateVideoTime = () => {
  if (demoVideoRef.value) {
    currentVideoTime.value = demoVideoRef.value.currentTime
  }
}

const activeStep = computed(() => {
  const time = currentVideoTime.value
  if (time >= 0 && time < 6) return 'speak'
  if (time >= 6 && time < 9) return 'wait'
  return 'paste'
})

const settingsVideoRef = ref<HTMLVideoElement>()
const currentSettingsVideoTime = ref(0)

const updateSettingsVideoTime = () => {
  if (settingsVideoRef.value) {
    currentSettingsVideoTime.value = settingsVideoRef.value.currentTime
  }
}

const activeFeature = computed(() => {
  const time = currentSettingsVideoTime.value
  if (time >= 0 && time < 6) return 0 // 12+ Languages
  if (time >= 6 && time < 9) return 1 // Auto-Copy
  if (time >= 9 && time < 15) return 2 // Easy Shortcuts
  if (time >= 15 && time < 20) return 3 // Powered by Whisper
  return -1
})

const features = [
  {
    icon: '🌍',
    title: '12+ Languages',
    description: 'Supports English, French, Spanish, German, Chinese, Japanese, and many more with auto-detection.'
  },
  {
    icon: '📋',
    title: 'Auto-Copy',
    description: 'Transcribed text is automatically copied to your clipboard. Ready to paste anywhere.'
  },
  {
    icon: '⌨️',
    title: 'Easy Shortcuts',
    description: 'Press Cmd+Shift+Space (Mac) or Ctrl+Shift+Space (Windows/Linux) from anywhere.'
  },
  {
    icon: '🤖',
    title: 'Powered by Whisper',
    description: 'Uses OpenAI\'s Whisper model for state-of-the-art accuracy, running 100% offline.'
  }
]

const showAllDownloads = ref(false)
const showInstallModal = ref(false)
const downloadUrl = ref('')

const handleDownload = (url: string) => {
  downloadUrl.value = url
  showInstallModal.value = true
  // Trigger the download
  window.location.href = url
}
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900">
    <!-- Header with Badges and Navigation -->
    <div class="container mx-auto px-6 pt-8">
      <div class="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <!-- Left spacer -->
        <div></div>

        <!-- Badges (centered) -->
        <div class="flex justify-center gap-4 md:gap-8">
          <div class="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full font-semibold text-sm md:text-base">
            <span class="text-lg md:text-xl">💰</span>
            <span>100% Free</span>
          </div>
          <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full font-semibold text-sm md:text-base">
            <span class="text-lg md:text-xl">🔒</span>
            <span>100% Private/Local</span>
          </div>
          <div class="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full font-semibold text-sm md:text-base">
            <span class="text-lg md:text-xl">📖</span>
            <span>100% Open Source</span>
          </div>
        </div>

        <!-- GitHub Icon (right aligned) -->
        <nav aria-label="Social links" class="flex justify-end">
          <a
            href="https://github.com/AccessDevops/S2Tui"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="GitHub">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </div>

    <!-- Hero Section -->
    <header role="banner" class="container mx-auto px-6 pt-8 pb-24 text-center">
      <img src="/logo.png" alt="S2Tui Logo - Speech to Text Application" class="w-24 h-24 mx-auto mb-8" />
      <h1 class="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
        S2Tui
      </h1>
      <p class="text-2xl text-gray-700 mb-2">
        The simplest <span class="font-bold text-gray-900">Speech to Text</span> solution
      </p>
      <p class="text-sm text-gray-500 mb-10">
        for Windows, Linux & macOS
      </p>

      <!-- Download Button -->
      <div class="flex flex-col items-center gap-4">
        <button
          v-if="!isDetecting"
          @click="handleDownload(currentDownload.primaryDownload.url)"
          class="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Download">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {{ currentDownload.label }}
        </button>
        <div v-else class="py-4 px-8 text-gray-500">
          Detecting your platform...
        </div>

        <!-- Other platforms -->
        <button
          @click="showAllDownloads = !showAllDownloads"
          class="text-gray-500 hover:text-gray-700 text-sm transition-colors mt-2"
        >
          {{ showAllDownloads ? 'Hide other platforms ↑' : 'Other platforms ↓' }}
        </button>

        <div v-if="showAllDownloads" class="flex flex-wrap justify-center gap-3 mt-2 max-w-2xl">
          <button
            v-for="option in allDownloadOptions"
            :key="option.filename"
            @click="handleDownload(option.url)"
            class="text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            {{ option.label }}
          </button>
          <a
            href="https://github.com/AccessDevops/S2Tui/releases"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
          >
            Others
          </a>
        </div>
      </div>
    </header>

    <!-- Demo Video Section -->
    <section class="bg-gray-50 py-24">
      <div class="container mx-auto px-6">
        <!-- Animated steps text -->
        <div class="max-w-7xl mx-auto mb-12">
          <div class="flex flex-wrap justify-center items-center gap-4 font-bold">
            <span
              :class="[
                'inline-block transition-all duration-500',
                activeStep === 'speak'
                  ? 'text-4xl md:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]'
                  : 'text-2xl md:text-4xl text-gray-400'
              ]"
            >
              Speak
            </span>
            <span class="text-2xl md:text-4xl text-gray-300">,</span>
            <span
              :class="[
                'inline-block transition-all duration-500',
                activeStep === 'wait'
                  ? 'text-4xl md:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]'
                  : 'text-2xl md:text-4xl text-gray-400'
              ]"
            >
              Wait for Transcription
            </span>
            <span class="text-2xl md:text-4xl text-gray-300">and</span>
            <span
              :class="[
                'inline-block transition-all duration-500',
                activeStep === 'paste'
                  ? 'text-4xl md:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]'
                  : 'text-2xl md:text-4xl text-gray-400'
              ]"
            >
              Paste your message
            </span>
          </div>
        </div>

        <!-- Video -->
        <div class="max-w-4xl mx-auto">
          <video
            ref="demoVideoRef"
            @timeupdate="updateVideoTime"
            class="w-full rounded-2xl shadow-2xl"
            controls
            autoplay
            muted
            loop
            preload="metadata"
            playsinline
          >
            <source src="/demo.mp4" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="py-24">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">How it works</h2>
        <p class="text-gray-600 mb-16 max-w-xl mx-auto">
          Three simple steps to transcribe your voice
        </p>

        <div class="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
            <h3 class="text-lg font-semibold mb-2">Click or Press Hotkey</h3>
            <p class="text-gray-600">Click the microphone or press Cmd+Shift+Space</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
            <h3 class="text-lg font-semibold mb-2">Speak</h3>
            <p class="text-gray-600">Say what you want to transcribe</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
            <h3 class="text-lg font-semibold mb-2">Done</h3>
            <p class="text-gray-600">Text appears instantly in your clipboard</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-gray-50 py-24">
      <div class="container mx-auto px-6">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-6">Features</h2>
        <p class="text-gray-600 text-center mb-16 max-w-xl mx-auto">
          Everything you need for fast, accurate voice transcription
        </p>

        <div class="max-w-7xl mx-auto">
          <div class="grid lg:grid-cols-[1fr_2.5fr_1fr] gap-8 items-center">
            <!-- Left features -->
            <div class="space-y-6">
              <div
                v-for="(feature, index) in features.slice(0, 2)"
                :key="feature.title"
                :class="[
                  'bg-white rounded-2xl p-6 shadow-sm transition-all duration-500',
                  activeFeature === index
                    ? 'scale-125 animate-bounce-border my-8'
                    : 'scale-100 my-0'
                ]"
              >
                <div class="text-3xl mb-4">{{ feature.icon }}</div>
                <h3 class="text-lg font-semibold mb-2 text-gray-900">{{ feature.title }}</h3>
                <p class="text-gray-600 text-sm leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>

            <!-- Center video -->
            <div class="flex items-center justify-center">
              <video
                ref="settingsVideoRef"
                @timeupdate="updateSettingsVideoTime"
                class="w-full rounded-2xl shadow-2xl"
                controls
                autoplay
                muted
                loop
                preload="metadata"
                playsinline
              >
                <source src="/settings.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>

            <!-- Right features -->
            <div class="space-y-6">
              <div
                v-for="(feature, index) in features.slice(2, 4)"
                :key="feature.title"
                :class="[
                  'bg-white rounded-2xl p-6 shadow-sm transition-all duration-500',
                  activeFeature === index + 2
                    ? 'scale-125 animate-bounce-border my-8'
                    : 'scale-100 my-0'
                ]"
              >
                <div class="text-3xl mb-4">{{ feature.icon }}</div>
                <h3 class="text-lg font-semibold mb-2 text-gray-900">{{ feature.title }}</h3>
                <p class="text-gray-600 text-sm leading-relaxed">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to try?</h2>
        <p class="text-gray-600 mb-10 max-w-xl mx-auto">
          Download S2Tui and start transcribing in seconds. No account required.
        </p>
        <a
          href="https://github.com/AccessDevops/S2Tui/releases"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Download">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Free
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer role="contentinfo" class="border-t border-gray-200 py-12">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div class="text-gray-600 text-sm text-center md:text-left">
            &copy; {{ new Date().getFullYear() }} AccessDevOps. All rights reserved.
          </div>
          <div class="text-gray-500 text-sm text-center">
            made with ❤️ by <a href="https://cbarange.com/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-700 transition-colors">cbarange</a>
          </div>
          <div class="flex items-center justify-center md:justify-end gap-6">
            <a
              href="https://github.com/AccessDevops/S2Tui"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Installation Modal -->
    <Transition name="modal">
      <div
        v-if="showInstallModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
        @click.self="showInstallModal = false"
      >
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 class="text-2xl font-bold text-gray-900">Installation & Usage</h3>
            <button
              @click="showInstallModal = false"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Close">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6">
            <div style="padding:93.58% 0 0 0;position:relative;">
              <iframe
                src="https://player.vimeo.com/video/1145204828?badge=0&autopause=0&player_id=0&app_id=58479"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                style="position:absolute;top:0;left:0;width:100%;height:100%;"
                title="S2Tui Usage & Installation for MacOS"
              ></iframe>
            </div>

            <p class="text-gray-600 mt-6 text-center">
              Your download should start automatically. If not,
              <a :href="downloadUrl" class="text-blue-600 hover:text-blue-700 font-semibold">click here</a>.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
}
</style>
