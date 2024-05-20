<template>
  <div
    class="map-marker"
    :style="{ left: `${positionComputed.x}px`, top: `${positionComputed.y}px` }"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @click="isFocused = true"
  >
    <img
      :src="imgBase"
      alt=""
      class="map-marker__image map-marker__image--base"
      :style="imgStyle"
    >

    <img
      :src="imgHair"
      alt=""
      class="map-marker__image map-marker__image--hair"
      :style="imgStyle"
    >

    <div
      v-if="isHovering || isFocused"
      class="map-marker__tooltip p-3 rounded-lg divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      :style="tooltipStyle"
    >
      <ul>
        <li>
          <b>Name:</b> {{ name }}
        </li>
        <li>
          <b>Position:</b> {{ position }}
        </li>
        <li>
          <b>positionComputed:</b> {{ positionComputed }}
        </li>
        <li>
          <button @click="playerKick">
            Kick
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()

const PATH_IMAGES = `/server/images/`

const props = defineProps<{
  uniqueMultiplayerID: string
  name: string
  position: string
}>()

/* TODO: Needs to be synced from the game, might differ per marker */
const imgSize = computed(() => ({
  width: 16 * 4,
  height: 15 * 4
}))

const positionComputed = computed(() => {
  /* TODO: WIP communication serializes vectors to comma-separated string instead of scalar values */
  const split = props.position?.split(', ').map(value => value.trim())

  return {
    x: parseFloat(split?.[0]) - unref(imgSize).width / 2,
    y: parseFloat(split?.[1]) - unref(imgSize).height / 2
  }
})

const imgBase = computed(() => `${PATH_IMAGES}portrait_${props.uniqueMultiplayerID}_base.png`)
const imgHair = computed(() => `${PATH_IMAGES}portrait_${props.uniqueMultiplayerID}_hair.png`)
const imgStyle = computed(() => ({
  maxWidth: 'unset',
  imageRendering: 'pixelated',
  width: `${unref(imgSize).width}px`,
  height: `${unref(imgSize).height}px`
}))

const tooltipStyle = computed(() => ({
  top: `${unref(imgSize).width}px`
}))

const isHovering = ref(false)
const isFocused = ref(false)

function playerKick() {
  console.log('Kicking player:', props.uniqueMultiplayerID)
  // nuxtApp.$ws.send(new KickMessage({
  //   uniqueMultiplayerID: props.uniqueMultiplayerID
  // }))
  // nuxtApp.$ws.send({ foo: '' })
}
</script>

<style lang="scss">
.map-marker {
  position: absolute;
  cursor: pointer;

  &__image {
    position: absolute;
    top: 0;
    left: 0;
  }

  &__tooltip {
    position: relative;
    color: #fff;
  }
}
</style>
