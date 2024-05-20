<template>
  <div>
    <UCard :ui="{ body: { base: 'divide-y divide-gray-200 dark:divide-gray-800 gap-4 flex flex-col' } }">
      <client-only>
        <div>
          <label>Status</label>
          <div>
            {{ status }}
          </div>
          <br>

          <label>Last 10 messages</label>
          <div>
            <p v-if="!history.length">
              <i>No messages yet</i>
            </p>

            <p v-for="item in history">
              <i>{{ item }}</i>
            </p>
          </div>
          <br>

          <!--          <form @submit.prevent="sendData"> -->
          <!--            <input v-model="message"> -->
          <!--            <br> -->
          <!--            <button type="submit"> -->
          <!--              Send -->
          <!--            </button> -->
          <!--          </form> -->
        </div>
      </client-only>
    </UCard>
    <br>

    <UCard :ui="{ body: { base: 'divide-y divide-gray-200 dark:divide-gray-800 gap-4 flex flex-col' } }">
      <USelect
        v-model="form.region"
        :options="regions"
        option-attribute="name"
      />
      <USelect
        v-model="form.season"
        :options="seasons"
        option-attribute="name"
      />

      <!-- <div v-if="loading" style="{ width: `${MAP_SIZE_ORIGINAL.width}px`, height: `${MAP_SIZE_ORIGINAL.height}px` }"> -->
      <!--      <div style="position: relative; width: 100%; height: auto;"> -->
      <div style="position: relative;">
        <div
          v-show="loading"
          class="loading"
          :style="{ aspectRatio: `${MAP_SIZE_ORIGINAL.width} / ${MAP_SIZE_ORIGINAL.height}` }"
        >
          <span>Loading...</span>
        </div>

        <div v-show="!loading">
          <sd-map-marker
            v-for="player of mapData.players"
            v-bind="player"
            :key="player.uniqueMultiplayerID"
          />
          <img
            :src="src"
            :style="{
              maxWidth: 'unset',
              width: `${MAP_SIZE_ORIGINAL.width * 4}px`,
              height: `${MAP_SIZE_ORIGINAL.height * 4}px`,
              imageRendering: 'pixelated'
            }"
            alt=""
            @load="loading = false"
          >
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const MAP_SIZE_ORIGINAL = {
  width: 300,
  height: 180
}

const nuxtApp = useNuxtApp()

const loading = ref(false)

const regions = [
  {
    name: 'Main',
    value: '0'
  },
  {
    name: 'Island',
    value: '1'
  }
]

const seasons = [
  {
    name: 'Spring',
    value: 'spring'
  },
  {
    name: 'Summer',
    value: 'summer'
  },
  {
    name: 'Fall',
    value: 'fall'
  },
  {
    name: 'Winter',
    value: 'winter'
  }
]

const form = reactive({
  region: regions[0].value,
  season: seasons[0].value
})

const src = computed(() => {
  const appendRegion = `_${form.region}`
  const appendSeason = form.season !== 'spring' ? `_${form.season}` : ''
  return `/server/images/region${appendRegion}${appendSeason}.png`
})

const history = ref<any[]>([])
const mapData = ref<{ players: any[] }>({ players: [] })

if (import.meta.client) {
  nuxtApp.$ws.on('ChatMessage', (message) => {
    addHistory(message.data)
  })

  nuxtApp.$ws.on('MapMessage', (message) => {
    mapData.value = message
  })
}

watch(() => form, () => {
  loading.value = true
}, { deep: true })

function addHistory(value: any) {
  if (history.value.length >= 10) {
    history.value.shift()
  }
  history.value.push(value)
}
</script>

<style>
.loading {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.player {
  position: absolute;
  display: inline-block;
  background: white;
}
</style>
