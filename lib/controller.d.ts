import { ITabManager, ITab } from './types';
export declare class TabManagerController implements ITabManager {
    tabs: ITab[];
    activeTab: ITab;
    subscribers: ((tabs: ITab[]) => void)[];
    addTab(tab: ITab): void;
    removeTab(tab: ITab): void;
    notifyChange(): void;
    getTabs(): ITab[];
    subscribe(callback: (tabs: ITab[]) => void): void;
    unsubscribe(callback: (tabs: ITab[]) => void): void;
}
