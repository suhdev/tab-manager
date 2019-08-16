import * as React from 'react';
import { ITab } from './types';
declare type ITabTitleRender = (tab: ITab, setActiveTab: (tab: ITab) => void, activeTab: ITab) => React.ReactNode;
export declare function TabBar({ renderTab, ...rest }: {
    renderTab?: ITabTitleRender;
}): JSX.Element;
export {};
