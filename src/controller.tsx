import { ITabManager, ITab } from './types';

export class TabManagerController implements ITabManager {
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
