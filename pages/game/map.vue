<script setup lang="ts">
const regions = [{
  name: 'Main',
  value: '0'
}, {
  name: 'Island',
  value: '1'
}]

const seasons = [{
  name: 'Spring',
  value: 'spring'
}, {
  name: 'Summer',
  value: 'summer'
}, {
  name: 'Fall',
  value: 'fall'
}, {
  name: 'Winter',
  value: 'winter'
}]

const region = ref(regions[0].value)
const season = ref(seasons[0].value)

// const src = computed(() => {
//   const valueRegion = unref(region)
//   const valueSeason = unref(season)
//   const appendRegion = `_${valueRegion}`
//   const appendSeason = valueSeason !== 'spring' ? `_${valueSeason}` : ''
//   return `/shared/region${appendRegion}${appendSeason}.png`
// })

// const { data, refresh } = await useFetch('/api/map', { default: () => '[]' })
// const mapData = computed(() => JSON.parse(unref(data)))
//
// useIntervalFn(() => {
//   refresh()
// }, 3000)
</script>

<template>
  <UDashboardPanelContent class="pb-24">
    <UDashboardSection
      title="Map"
      description="WIP"
      orientation="horizontal"
      :ui="{ container: 'lg:sticky top-2' }"
    >
      <sd-map />
    </UDashboardSection>
  </UDashboardPanelContent>
</template>
