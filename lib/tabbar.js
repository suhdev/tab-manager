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
const hooks_1 = require("./hooks");
function TabTitle(_a) {
    var { tab, setActiveTab, activeTab } = _a, rest = __rest(_a, ["tab", "setActiveTab", "activeTab"]);
    const onClick = React.useCallback(() => {
        setActiveTab(tab);
    }, [tab, setActiveTab]);
    return (React.createElement("div", { className: "sa-tabmanager__tab-title", "data-testid": rest['data-testid'] && `${rest['data-testid']}__${tab.id}`, "data-active": tab === activeTab, key: tab.id, onClick: onClick }, tab.label));
}
function TabBar(_a) {
    var { renderTab } = _a, rest = __rest(_a, ["renderTab"]);
    const tabs = hooks_1.useTabs();
    const activeTab = hooks_1.useActiveTab();
    const setActiveTab = hooks_1.useSetActiveTab();
    const defaultTabRenderer = React.useCallback((tab, setActiveTab, activeTab) => {
        return React.createElement(TabTitle, { tab: tab, setActiveTab: setActiveTab, "data-testid": rest['data-testid'], activeTab: activeTab, key: tab.id });
    }, []);
    const renderer = renderTab || defaultTabRenderer;
    return (React.createElement(React.Fragment, null, tabs.map(tab => renderer(tab, setActiveTab, activeTab))));
}
exports.TabBar = TabBar;
