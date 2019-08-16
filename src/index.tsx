import * as React from 'react';
import { ITab } from './types';
import { TabManagerController } from './controller';
import { TabManagerContext } from './context';
import { useTabs, useSetActiveTab } from './hooks';

export function TabManager({ children }) {
  const [activeTab, setActive] = React.useState<ITab>(null);

  const [controller] = React.useState(() => new TabManagerController());

  const setActiveTab = React.useCallback(
    ({ id }: { id: string | number }) => {
      const tabs = controller.getTabs();
      const tab = tabs.find(tab => tab.id === id);
      setActive(tab || null);
    },
    [controller]);

  const value = React.useMemo(
    () => ({
      controller,
      activeTab,
      setActiveTab,
    }),
    [controller, activeTab]);

  return (
    <TabManagerContext.Provider value={value}>
      {children}
    </TabManagerContext.Provider>
  );
}

export function ActiveTab({ id }: { id: string | number }) {
  const tabs = useTabs();
  const setActiveTab = useSetActiveTab();

  React.useEffect(
    () => {
      requestAnimationFrame(() => {
        const tab = tabs.find(t => t.id === id);
        if (!tab) {
          console.warn(`Could not find tab with id ${id}`);
          return;
        }
        setActiveTab(tab);
      });
    },
    [tabs]);

  return null;
}

export function Tabs({ children }) {
  const tabs = useTabs();

  if (typeof children !== 'function') {
    throw new Error(`Expected children to be a function, but got ${typeof children}`);
  }

  return children(tabs);
}

export function Tab({ id, label, children, ...rest }) {
  const [tab] = React.useState(() => ({ id, label, ...rest }));
  const { controller, activeTab } = React.useContext(TabManagerContext);

  React.useEffect(
    () => {
      controller.addTab(tab);

      return () => {
        controller.removeTab(tab);
      };
    },
    [controller]);

  return activeTab && (activeTab.id === id) ? children : null;
}

export { useTabs, useSetActiveTab, useActiveTab } from './hooks';
export { TabBar } from './tabbar';
