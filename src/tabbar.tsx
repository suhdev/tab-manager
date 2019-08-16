import * as React from 'react';
import { ITab } from './types';
import { useTabs, useActiveTab, useSetActiveTab } from './hooks';

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
