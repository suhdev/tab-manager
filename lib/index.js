"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const TabManagerContext = React.createContext(null);
class TabManagerController {
    constructor() {
        this.tabs = [];
        this.activeTab = null;
        this.subscribers = [];
    }
    addTab(tab) {
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
    removeTab(tab) {
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
    subscribe(callback) {
        this.subscribers.push(callback);
    }
    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter(s => s !== callback);
    }
}
function TabManager({ children }) {
    const [activeTab, setActive] = React.useState(null);
    const [controller] = React.useState(() => new TabManagerController());
    const setActiveTab = React.useCallback(({ id }) => {
        const tabs = controller.getTabs();
        const tab = tabs.find(tab => tab.id === id);
        setActive(tab || null);
    }, [controller]);
    const value = React.useMemo(() => ({
        controller,
        activeTab,
        setActiveTab,
    }), [controller, activeTab]);
    return (React.createElement(TabManagerContext.Provider, { value: value }, children));
}
exports.TabManager = TabManager;
function useActiveTab() {
    const { activeTab } = React.useContext(TabManagerContext);
    return activeTab;
}
exports.useActiveTab = useActiveTab;
function useSetActiveTab() {
    const { setActiveTab } = React.useContext(TabManagerContext);
    return setActiveTab;
}
exports.useSetActiveTab = useSetActiveTab;
function ActiveTab({ id }) {
    const tabs = useTabs();
    const setActiveTab = useSetActiveTab();
    React.useEffect(() => {
        const tab = tabs.find(t => t.id === id);
        if (!tab) {
            console.warn(`Could not find tab with id ${id}`);
            return;
        }
        setActiveTab(tab);
    }, [tabs]);
    return null;
}
exports.ActiveTab = ActiveTab;
function useTabs() {
    const { controller } = React.useContext(TabManagerContext);
    const [tabs, setTabs] = React.useState(controller.getTabs());
    React.useEffect(() => {
        controller.subscribe(setTabs);
        return () => controller.unsubscribe(setTabs);
    }, []);
    return tabs;
}
exports.useTabs = useTabs;
function Tabs({ children }) {
    const tabs = useTabs();
    if (typeof children !== 'function') {
        throw new Error(`Expected children to be a function, but got ${typeof children}`);
    }
    return children(tabs);
}
exports.Tabs = Tabs;
function TabTitle(_a) {
    var { tab, setActiveTab, activeTab } = _a, rest = __rest(_a, ["tab", "setActiveTab", "activeTab"]);
    const onClick = React.useCallback(() => {
        setActiveTab(tab);
    }, [tab, setActiveTab]);
    return (React.createElement("div", { className: "sa-tabmanager__tab-title", "data-testid": rest['data-testid'] && `${rest['data-testid']}__${tab.id}`, "data-active": tab === activeTab, key: tab.id, onClick: onClick }, tab.label));
}
function TabBar(_a) {
    var { renderTab } = _a, rest = __rest(_a, ["renderTab"]);
    const tabs = useTabs();
    const activeTab = useActiveTab();
    const setActiveTab = useSetActiveTab();
    const defaultTabRenderer = React.useCallback((tab, setActiveTab, activeTab) => {
        return React.createElement(TabTitle, { tab: tab, setActiveTab: setActiveTab, "data-testid": rest['data-testid'], activeTab: activeTab, key: tab.id });
    }, []);
    const renderer = renderTab || defaultTabRenderer;
    return (React.createElement(React.Fragment, null, tabs.map(tab => renderer(tab, setActiveTab, activeTab))));
}
exports.TabBar = TabBar;
function Tab(_a) {
    var { id, label, children } = _a, rest = __rest(_a, ["id", "label", "children"]);
    const [tab] = React.useState(() => (Object.assign({ id, label }, rest)));
    const { controller, activeTab } = React.useContext(TabManagerContext);
    React.useEffect(() => {
        controller.addTab(tab);
        return () => {
            controller.removeTab(tab);
        };
    }, [controller]);
    return activeTab && (activeTab.id === id) ? children : null;
}
exports.Tab = Tab;
