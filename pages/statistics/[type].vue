<script setup lang="ts">
import {sub} from 'date-fns'
import type {Period, Range} from '~/types'

const {isNotificationsSlideoverOpen} = useDashboard()

const items = [
  [
    {
      label: 'New mail',
      icon: 'i-heroicons-paper-airplane',
      to: '/inbox'
    },
    {
      label: 'New user',
      icon: 'i-heroicons-user-plus',
      to: '/users'
    }
  ]
]

const range = ref<Range>({start: sub(new Date(), {days: 14}), end: new Date()})
const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Dashboard">
        <template #right>
          <UTooltip
            text="Notifications"
            :shortcuts="['N']"
          >
            <UButton
              color="gray"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip
                color="red"
                inset
              >
                <UIcon
                  name="i-heroicons-bell"
                  class="w-5 h-5"
                />
              </UChip>
            </UButton>
          </UTooltip>

          <!--          <UDropdown :items="items">-->
          <!--            <UButton-->
          <!--              icon="i-heroicons-plus"-->
          <!--              size="md"-->
          <!--              class="ml-1.5 rounded-full"-->
          <!--            />-->
          <!--          </UDropdown>-->
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <HomeDateRangePicker
            v-model="range"
            class="-ml-2.5"
          />

          <!-- ~/components/home/HomePeriodSelect.vue -->
          <HomePeriodSelect
            v-model="period"
            :range="range"
          />
        </template>
      </UDashboardToolbar>


      <UDashboardPanelContent>
        <!--        <UDashboardCard-->
        <!--          ref="cardRef"-->
        <!--          :ui="{ body: { padding: '!pb-3 !px-0' } }"-->
        <!--        >-->
        <!--          <template #header>-->
        <!--            <div>-->
        <!--              <p class="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">-->
        <!--                Status-->
        <!--              </p>-->
        <!--              <p class="text-3xl text-gray-900 dark:text-white font-semibold">-->
        <!--                Online-->
        <!--              </p>-->
        <!--            </div>-->
        <!--          </template>-->

        <!--          <div class="h-16"/>-->
        <!--        </UDashboardCard>-->

        <!-- ~/components/home/HomeChart.vue -->
        <HomeChart
          :period="period"
          :range="range"
          class="mt-8"
        />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <!-- ~/components/home/HomeSales.vue -->
          <HomeSales/>
          <!-- ~/components/home/HomeCountries.vue -->
          <HomeCountries/>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
