
/**
 * A tab should have at least these properties
 */
export interface ITab {
  id: string | number;
  label: React.ReactNode;
}

export interface ITabManager {
  /**
   * Adds a tab to the tab manager
   * @param {ITab} tab the tab to register with the manager
   */
  addTab(tab: ITab): void;
  /**
   * Removes a tab from the tab manager
   * @param {ITab} tab the tab to remove
   */
  removeTab(tab: ITab): void;
  /**
   * Returns a list of the tabs that are currently registered with the
   * tab manager
   * @returns {ITab[]}
   */
  getTabs(): ITab[];
  /**
   * Subscribe a callback to tab registrations.
   * @param cb the callback to call when a tab is added/removed.
   */
  subscribe(cb: (tabs: ITab[]) => void);
  /**
   * Unsubscribe a callback from tab registrations.
   * @param cb the callback to unsubscribe.
   */
  unsubscribe(cb: (tabs: ITab[]) => void);
}

export interface ITabManagerContext {
  controller: ITabManager;
  activeTab: ITab;
  setActiveTab: (tab: { id: string | number }) => void;
}
