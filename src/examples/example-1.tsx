import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TabManager, Tab, ActiveTab } from '../index';
import { useSetActiveTab } from '../hooks';

function MySubApp({ children, id, label }) {
  const setActiveTab = useSetActiveTab();
  return (
    <div className="tab-2">
      {children}
      <button onClick={() => setActiveTab({ id })}>{label}</button>
    </div>
  );
}

function MyTabbedApp() {
  return (
    <TabManager>
      <div className="tabs-container">
        <Tab id="tab-1" label="Tab 1">
          <MySubApp id="tab-2" label="Go to tab 2">
            Tab 1 content
          </MySubApp>
        </Tab>
        <Tab id="tab-2" label="Tab 2">
          <MySubApp id="tab-1" label="Go to tab 1">
            Tab 2 content
          </MySubApp>
        </Tab>
        <Tab id="tab-3" label="Tab 3">
          Content for third tab
        </Tab>
      </div>
      <ActiveTab id="tab-2" />
    </TabManager>
  );
}

(function () {
  let el = document.getElementById('app');
  if (!el) {
    el = document.createElement('div');
    el.id = 'app';
    document.body.appendChild(el);
  }

  ReactDOM.render(
    <MyTabbedApp />,
    el,
  );

}());
