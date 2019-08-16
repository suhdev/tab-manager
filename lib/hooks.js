"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const context_1 = require("./context");
function useActiveTab() {
    const { activeTab } = React.useContext(context_1.TabManagerContext);
    return activeTab;
}
exports.useActiveTab = useActiveTab;
function useSetActiveTab() {
    const { setActiveTab } = React.useContext(context_1.TabManagerContext);
    return setActiveTab;
}
exports.useSetActiveTab = useSetActiveTab;
function useTabs() {
    const { controller } = React.useContext(context_1.TabManagerContext);
    const [tabs, setTabs] = React.useState(controller.getTabs());
    React.useEffect(() => {
        controller.subscribe(setTabs);
        return () => controller.unsubscribe(setTabs);
    }, []);
    return tabs;
}
exports.useTabs = useTabs;
