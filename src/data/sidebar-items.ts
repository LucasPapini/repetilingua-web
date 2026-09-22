import type { IconName } from "@/helpers/icon-helper"

interface SidebarItemData {
  label: string
  to?: string
  icon: IconName
}

export const sidebarItems: SidebarItemData[] = [
  {
    label: 'Dashboard',
    to: '/app',
    icon: 'LayoutDashboard',
  },

  {
    label: 'Textos',
    to: '/app/texts',
    icon: 'TextInitial',
  },

  // {
  //   label: 'Modulos',
  //   to: '/app/modules',
  //   icon: 'Puzzle',
  // },

  // {
  //   label: 'FlashCards',
  //   to: '/app/flashcards',
  //   icon: 'CardSim',
  // },
]
