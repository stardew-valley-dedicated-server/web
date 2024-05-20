<script setup lang="ts">
const route = useRoute()
const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()

const links = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    to: '/',
    tooltip: {
      text: 'Home',
      shortcuts: ['H']
    }
  },

  {
    id: 'game',
    label: 'Game',
    icon: 'i-heroicons-users',
    badge: '4',
    tooltip: {
      text: 'Players',
      shortcuts: ['P']
    },
    children: [
      {
        label: 'Players',
        to: '/game/players',
        disabled: true
      },
      {
        label: 'Farm',
        to: '/game/farm',
        disabled: true
      },
      {
        label: 'Map',
        to: '/game/map'
      },
      {
        label: 'Chat',
        to: '/placeholder',
        disabled: true
      },
      {
        label: 'VNC',
        to: '/game/vnc',
        disabled: true
      }
    ]
  },

  {
    id: 'mods',
    label: 'Mods',
    badge: '3',
    icon: 'i-heroicons-cube',
    children: [
      {
        label: 'Overview',
        to: '/placeholder',
        disabled: true,
        exact: true
      }
    ],
    tooltip: {
      text: 'Mods',
      shortcuts: ['M']
    }
  },

  {
    id: 'statistics',
    label: 'Statistics',
    icon: 'i-heroicons-chart-pie',
    children: [
      {
        label: 'Server',
        to: '/statistics/server',
        disabled: true
      },
      {
        label: 'Farm',
        to: '/statistics/farm',
        disabled: true
      },
      {
        label: 'Players',
        to: '/statistics/players',
        disabled: true
      }
    ],
    tooltip: {
      text: 'Statistics',
      shortcuts: ['D']
    }
  },

  {
    id: 'settings',
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [
      {
        label: 'General',
        to: '/placeholder',
        disabled: true
      },
      {
        label: 'Backup',
        to: '/placeholder',
        disabled: true
      },
      {
        label: 'Tasks',
        to: '/placeholder',
        disabled: true
      }
    ],
    tooltip: {
      text: 'Settings',
      shortcuts: ['S']
    }
  }
]

const footerLinks = [
  {
    label: 'About',
    icon: 'i-heroicons-question-mark-circle',
    click: () => isHelpSlideoverOpen.value = true
  }
]

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts }))
  },
  {
    key: 'customSection',
    label: 'Custom Section',
    commands: [
      {
        id: 'google',
        label: 'Open Google',
        icon: 'i-simple-icons-google',
        click: () => {
          window.open(`https://google.com`, '_blank')
        }
      }
    ]
  }
]

const defaultColors = ref(['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(color => ({
  label: color,
  chip: color,
  click: () => appConfig.ui.primary = color
})))

const colors = computed(() => defaultColors.value.map(color => ({
  ...color,
  active: appConfig.ui.primary === color.label
})))
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar
        class="!border-transparent"
        :ui="{ left: 'flex-1' }"
      >
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <!--        <UDivider/> -->

        <!--        <UDashboardSidebarLinks -->
        <!--          :links="[{ label: 'Colors', draggable: true, children: colors }]" -->
        <!--          @update:links="colors => defaultColors = colors" -->
        <!--        /> -->

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <!--        <UDivider class="sticky bottom-0"/> -->

        <!--        <template #footer> -->
        <!--          &lt;!&ndash; ~/components/UserDropdown.vue &ndash;&gt; -->
        <!--          <UserDropdown/> -->
        <!--        </template> -->
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
