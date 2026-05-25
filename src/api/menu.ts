import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

interface MenuMasterState {
  openedItem: string;
  openedComponent: string;
  openedHorizontalItem: string | null;
  isDashboardDrawerOpened: boolean;
  isComponentDrawerOpened: boolean;
}

const initialState: MenuMasterState = {
  openedItem: 'dashboard',
  openedComponent: 'buttons',
  openedHorizontalItem: null,
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true
};

export const endpoints = {
  key: 'api/menu',
  master: 'master',
  dashboard: '/dashboard' // server URL
};

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR<MenuMasterState>(endpoints.key + endpoints.master, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerDrawerOpen(isDashboardDrawerOpened: boolean) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: MenuMasterState | undefined) => {
      const menuMaster = currentMenuMaster ?? initialState;
      return { ...menuMaster, isDashboardDrawerOpened } satisfies MenuMasterState;
    },
    false
  );
}

export function handlerActiveItem(openedItem: string) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster: MenuMasterState | undefined) => {
      const menuMaster = currentMenuMaster ?? initialState;
      return { ...menuMaster, openedItem } satisfies MenuMasterState;
    },
    false
  );
}
