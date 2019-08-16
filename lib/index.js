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
const controller_1 = require("./controller");
const context_1 = require("./context");
const hooks_1 = require("./hooks");
function TabManager({ children }) {
    const [activeTab, setActive] = React.useState(null);
    const [controller] = React.useState(() => new controller_1.TabManagerController());
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
    return (React.createElement(context_1.TabManagerContext.Provider, { value: value }, children));
}
exports.TabManager = TabManager;
function ActiveTab({ id }) {
    const tabs = hooks_1.useTabs();
    const setActiveTab = hooks_1.useSetActiveTab();
    React.useEffect(() => {
        requestAnimationFrame(() => {
            const tab = tabs.find(t => t.id === id);
            if (!tab) {
                console.warn(`Could not find tab with id ${id}`);
                return;
            }
            setActiveTab(tab);
        });
    }, [tabs]);
    return null;
}
exports.ActiveTab = ActiveTab;
function Tabs({ children }) {
    const tabs = hooks_1.useTabs();
    if (typeof children !== 'function') {
        throw new Error(`Expected children to be a function, but got ${typeof children}`);
    }
    return children(tabs);
}
exports.Tabs = Tabs;
function Tab(_a) {
    var { id, label, children } = _a, rest = __rest(_a, ["id", "label", "children"]);
    const [tab] = React.useState(() => (Object.assign({ id, label }, rest)));
    const { controller, activeTab } = React.useContext(context_1.TabManagerContext);
    React.useEffect(() => {
        controller.addTab(tab);
        return () => {
            controller.removeTab(tab);
        };
    }, [controller]);
    return activeTab && (activeTab.id === id) ? children : null;
}
exports.Tab = Tab;
var hooks_2 = require("./hooks");
exports.useTabs = hooks_2.useTabs;
exports.useSetActiveTab = hooks_2.useSetActiveTab;
exports.useActiveTab = hooks_2.useActiveTab;
var tabbar_1 = require("./tabbar");
exports.TabBar = tabbar_1.TabBar;
