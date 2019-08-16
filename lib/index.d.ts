/// <reference types="react" />
export declare function TabManager({ children }: {
    children: any;
}): JSX.Element;
export declare function ActiveTab({ id }: {
    id: string | number;
}): any;
export declare function Tabs({ children }: {
    children: any;
}): any;
export declare function Tab({ id, label, children, ...rest }: {
    [x: string]: any;
    id: any;
    label: any;
    children: any;
}): any;
export { useTabs, useSetActiveTab, useActiveTab } from './hooks';
export { TabBar } from './tabbar';
