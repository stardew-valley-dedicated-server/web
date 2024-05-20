<script setup lang="ts">
import type {Mail} from '~/types'

const tabItems = [{
  label: 'All'
}, {
  label: 'Unread'
}]
const selectedTab = ref(0)

const dropdownItems = [[{
  label: 'Mark as unread',
  icon: 'i-heroicons-check-circle'
}, {
  label: 'Mark as important',
  icon: 'i-heroicons-exclamation-circle'
}], [{
  label: 'Star thread',
  icon: 'i-heroicons-star'
}, {
  label: 'Mute thread',
  icon: 'i-heroicons-pause-circle'
}]]

const {data: mails} = await useFetch<Mail[]>('/api/mails', {default: () => []})

// Filter mails based on the selected tab
const filteredMails = computed(() => {
  if (selectedTab.value === 1) {
    return mails.value.filter(mail => !!mail.unread)
  }

  return mails.value
})

const selectedMail = ref<Mail | null>()

const isMailPanelOpen = computed({
  get() {
    return !!selectedMail.value
  },
  set(value: boolean) {
    if (!value) {
      selectedMail.value = null
    }
  }
})

// Reset selected mail if it's not in the filtered mails
watch(filteredMails, () => {
  if (!filteredMails.value.find(mail => mail.id === selectedMail.value?.id)) {
    selectedMail.value = null
  }
})
</script>

<template>
  <UDashboardPage>
    <div
      class="flex-1 hidden lg:flex items-center justify-center"
    >
      <u-landing-hero title="Just a placeholder"/>
    </div>
  </UDashboardPage>
</template>
