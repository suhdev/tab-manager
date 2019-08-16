"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.TabManagerController = TabManagerController;
