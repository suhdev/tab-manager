import * as React from 'react';

export interface ITab {
  id: string | number;
  label: React.ReactNode;
}

export interface ITabManager {
  addTab(tab: ITab): void;
  removeTab(tab: ITab): void;
  getTabs(): ITab[];
  subscribe(cb: (tabs: ITab[]) => void);
  unsubscribe(cb: (tabs: ITab[]) => void);
}

interface ITabManagerContext {
  controller: ITabManager;
  activeTab: ITab;
  setActiveTab: (tab: { id: string | number }) => void;
}

const TabManagerContext = React.createContext<ITabManagerContext>(null);

class TabManagerController implements ITabManager {
  tabs: ITab[] = [];
  activeTab: ITab = null;
  subscribers: ((tabs: ITab[]) => void)[] = [];

  addTab(tab: ITab): void {
    const idx = this.tabs.findIndex(t => t.id === tab.id);
    if (idx !== -1) {
      console.warn(`Tab with id ${tab.id} already exists`);
      this.tabs[idx] = tab;
      this.notifyChange();
      return;
    }
    this.tabs.push(tab);
    this.notifyChange();

  }

  removeTab(tab: ITab): void {
    const lengthBefore = this.tabs.length;
    this.tabs = this.tabs.filter(t => t.id !== tab.id);
    if (this.tabs.length !== lengthBefore) {
      this.notifyChange();
    }
  }

  notifyChange() {
    this.subscribers.forEach(s => s(this.tabs));
  }

  getTabs() {
    return this.tabs;
  }

  subscribe(callback: (tabs: ITab[]) => void) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback: (tabs: ITab[]) => void) {
    this.subscribers = this.subscribers.filter(s => s !== callback);
  }
}

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

export function useActiveTab() {
  const { activeTab } = React.useContext(TabManagerContext);
  return activeTab;
}

export function useSetActiveTab() {
  const { setActiveTab } = React.useContext(TabManagerContext);

  return setActiveTab;
}

export function ActiveTab({ id }: { id: string | number }) {
  const tabs = useTabs();
  const setActiveTab = useSetActiveTab();

  React.useEffect(
    () => {
      const tab = tabs.find(t => t.id === id);
      if (!tab) {
        console.warn(`Could not find tab with id ${id}`);
        return;
      }
      setActiveTab(tab);
    },
    [tabs]);

  return null;
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

export function Tabs({ children }) {
  const tabs = useTabs();

  if (typeof children !== 'function') {
    throw new Error(`Expected children to be a function, but got ${typeof children}`);
  }

  return children(tabs);
}

type ITabTitleRender = (
  tab: ITab, setActiveTab: (tab: ITab) => void, activeTab: ITab) => React.ReactNode;

function TabTitle({ tab, setActiveTab, activeTab, ...rest }: {
  tab: ITab,
  setActiveTab: (tab: ITab) => void,
  activeTab: ITab,
}) {
  const onClick = React.useCallback(
    () => {
      setActiveTab(tab);
    },
    [tab, setActiveTab]);
  return (
    <div className="sa-tabmanager__tab-title"
      data-testid={rest['data-testid'] && `${rest['data-testid']}__${tab.id}`}
      data-active={tab === activeTab}
      key={tab.id} onClick={onClick}>{tab.label}</div>
  );
}

export function TabBar({ renderTab, ...rest }: { renderTab?: ITabTitleRender }) {
  const tabs = useTabs();

  const activeTab = useActiveTab();
  const setActiveTab = useSetActiveTab();

  const defaultTabRenderer = React.useCallback(
    (tab: ITab, setActiveTab: (tab: ITab) => void, activeTab: ITab) => {
      return <TabTitle tab={tab}
        setActiveTab={setActiveTab}
        data-testid={rest['data-testid']}
        activeTab={activeTab}
        key={tab.id} />;
    },
    []);

  const renderer = renderTab || defaultTabRenderer;

  return (
    <>{tabs.map(tab => renderer(tab, setActiveTab, activeTab))}</>
  );
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
