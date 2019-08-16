import * as React from 'react';
import { TabManagerContext } from './context';

export function useActiveTab() {
  const { activeTab } = React.useContext(TabManagerContext);
  return activeTab;
}

export function useSetActiveTab() {
  const { setActiveTab } = React.useContext(TabManagerContext);

  return setActiveTab;
}

export function useTabs() {
  const { controller } = React.useContext(TabManagerContext);
  const [tabs, setTabs] = React.useState(controller.getTabs());

  React.useEffect(
    () => {
      controller.subscribe(setTabs);
      return () => controller.unsubscribe(setTabs);
    },
    []);

  return tabs;
}
