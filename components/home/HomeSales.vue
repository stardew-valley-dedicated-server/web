<script setup lang="ts">
const sales = [{
  user: {
    name: 'GoatWhisperer',
    email: 'Lorem Ipsum',
    avatar: {
      src: 'https://i.pravatar.cc/128?=ts1'
    }
  },
  price: 500000
}, {
  user: {
    name: 'BeetsByDre',
    email: 'Lorem Ipsum',
    avatar: {
      src: 'https://i.pravatar.cc/128?=ts2'
    }
  },
  price: 50000
}, {
  user: {
    name: 'CompostConnoisseur',
    email: 'Lorem Ipsum',
    avatar: {
      src: 'https://i.pravatar.cc/128?=ts3'
    }
  },
  price: 5000
}, {
  user: {
    name: 'FarmAlarm',
    email: 'Lorem Ipsum',
    avatar: {
      src: 'https://i.pravatar.cc/128?=ts4'
    }
  },
  price: 500
}]

const formatNumber = new Intl.NumberFormat('en', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format
</script>

<template>
  <UDashboardCard
    title="Top earners"
    description="Income in the last 24 hours"
    icon="i-heroicons-chart-bar-20-solid"
  >
    <NuxtLink
      v-for="(sale, index) in sales"
      :key="index"
      class="px-3 py-2 -mx-2 last:-mb-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative"
    >
      <UAvatar
        v-bind="sale.user.avatar"
        :alt="sale.user.name"
        size="md"
      />

      <div class="text-sm flex-1">
        <div>
          <p class="text-gray-900 dark:text-white font-medium">
            #{{ index + 1 }} {{ sale.user.name }}
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            {{ sale.user.email }}
          </p>
        </div>
      </div>

      <p class="text-gray-900 dark:text-white font-medium text-lg">
        {{ formatNumber(sale.price) }}
      </p>
    </NuxtLink>
  </UDashboardCard>
</template>
