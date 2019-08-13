import * as React from 'react';
export interface ITab {
    id: string | number;
    label: React.ReactNode;
}
export interface ITabManager {
    addTab(tab: ITab): void;
    removeTab(tab: ITab): void;
    getTabs(): ITab[];
    subscribe(cb: (tabs: ITab[]) => void): any;
    unsubscribe(cb: (tabs: ITab[]) => void): any;
}
export declare function TabManager({ children }: {
    children: any;
}): JSX.Element;
export declare function useActiveTab(): ITab;
export declare function useSetActiveTab(): (tab: {
    id: string | number;
}) => void;
export declare function ActiveTab({ id }: {
    id: string | number;
}): any;
export declare function useTabs(): ITab[];
export declare function Tabs({ children }: {
    children: any;
}): any;
declare type ITabTitleRender = (tab: ITab, setActiveTab: (tab: ITab) => void, activeTab: ITab) => React.ReactNode;
export declare function TabBar({ renderTab, ...rest }: {
    renderTab?: ITabTitleRender;
}): JSX.Element;
export declare function Tab({ id, label, children, ...rest }: {
    [x: string]: any;
    id: any;
    label: any;
    children: any;
}): any;
export {};
