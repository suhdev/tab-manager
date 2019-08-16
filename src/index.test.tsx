import * as React from 'react';
import { TabManager, Tab, useSetActiveTab, useActiveTab, TabBar } from './';
import { cleanup, render, act, fireEvent } from '@testing-library/react';
describe('tab-manager', () => {
  afterEach(cleanup);
  afterAll(cleanup);

  function TestActiveTabSetter() {
    const activeTab = useActiveTab();
    const setActiveTab = useSetActiveTab();
    const onTabChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setActiveTab({ id: value });
      },
      []);

    return (<div>
      <input onChange={onTabChange}
        data-testid="tab-selector"
        value={activeTab && activeTab.id || ''} />
    </div>);
  }
  describe('add/remove tabs correctly', () => {

    it('should not render any tab if no tab is active', () => {
      const { getByTestId } = render(
        <TabManager>
          <div className="container" data-testid="container">
            <Tab id="tab-1" label="Tab 1">
              <div className="tab-1" data-testid="tab-1">
                Tab 1 Content
              </div>
            </Tab>
            <Tab id="tab-2" label="Tab 2">
              <div className="tab-2" data-testid="tab-2">
                Tab 2 Content
              </div>
            </Tab>
            <Tab id="tab-3" label="Tab 3">
              <div className="tab-3" data-testid="tab-3">
                Tab 3 Content
              </div>
            </Tab>
          </div>
          <TestActiveTabSetter />
        </TabManager>);

      expect(getByTestId('container').innerHTML).toEqual('');
    });

    it('should render only active tab', () => {
      const { getByTestId } = render(
        <TabManager>
          <div className="container" data-testid="container">
            <Tab id="tab-1" label="Tab 1">
              <div className="tab-1" data-testid="tab-1">
                Tab 1 Content
              </div>
            </Tab>
            <Tab id="tab-2" label="Tab 2">
              <div className="tab-2" data-testid="tab-2">
                Tab 2 Content
              </div>
            </Tab>
            <Tab id="tab-3" label="Tab 3">
              <div className="tab-3" data-testid="tab-3">
                Tab 3 Content
              </div>
            </Tab>
          </div>
          <TestActiveTabSetter />
        </TabManager>);

      act(() => {
        fireEvent.change(getByTestId('tab-selector'), {
          target: {
            value: 'tab-1',
          },
        });
      });

      expect(getByTestId('container').textContent).toEqual('Tab 1 Content');

      act(() => {
        fireEvent.change(getByTestId('tab-selector'), {
          target: {
            value: 'tab-2',
          },
        });
      });

      expect(getByTestId('container').textContent).toEqual('Tab 2 Content');

      act(() => {
        fireEvent.change(getByTestId('tab-selector'), {
          target: {
            value: 'tab-3',
          },
        });
      });

      expect(getByTestId('container').textContent).toEqual('Tab 3 Content');
    });

    it('should not render any tab if active tab could not be found', () => {
      const { getByTestId } = render(
        <TabManager>
          <div className="container" data-testid="container">
            <Tab id="tab-1" label="Tab 1">
              <div className="tab-1" data-testid="tab-1">
                Tab 1 Content
              </div>
            </Tab>
            <Tab id="tab-2" label="Tab 2">
              <div className="tab-2" data-testid="tab-2">
                Tab 2 Content
              </div>
            </Tab>
            <Tab id="tab-3" label="Tab 3">
              <div className="tab-3" data-testid="tab-3">
                Tab 3 Content
              </div>
            </Tab>
          </div>
          <TestActiveTabSetter />
        </TabManager>);

      act(() => {
        fireEvent.change(getByTestId('tab-selector'), {
          target: {
            value: 'tab-x',
          },
        });
      });

      expect(getByTestId('container').textContent).toEqual('');

    });

  });

  describe('should render tab bar', () => {
    afterEach(cleanup);

    it('should render tab bar correctly', () => {
      const { getByTestId } = render(
        <TabManager>
          <div className="container" data-testid="container">
            <Tab id="tab-1" label="Tab 1">
              <div className="tab-1" data-testid="tab-1">
                Tab 1 Content
            </div>
            </Tab>
            <Tab id="tab-2" label="Tab 2">
              <div className="tab-2" data-testid="tab-2">
                Tab 2 Content
            </div>
            </Tab>
            <Tab id="tab-3" label="Tab 3">
              <div className="tab-3" data-testid="tab-3">
                Tab 3 Content
            </div>
            </Tab>
          </div>
          <div className="container" data-testid="tabbar-container">
            <TabBar data-testid="tabbar" />
          </div>
          <TestActiveTabSetter />
        </TabManager>);

      act(() => {
        fireEvent.change(getByTestId('tab-selector'), {
          target: {
            value: 'tab-1',
          },
        });
      });

      expect(getByTestId('container').textContent).toEqual('Tab 1 Content');

      expect(getByTestId('tabbar-container').children.length).toEqual(3);

      expect(getByTestId('tabbar-container').children.item(0).textContent).toEqual('Tab 1');
      expect(getByTestId('tabbar-container').children
        .item(0).getAttribute('data-active')).toEqual('true');
      expect(getByTestId('tabbar-container').children.item(1).textContent).toEqual('Tab 2');
      expect(getByTestId('tabbar-container').children.item(2).textContent).toEqual('Tab 3');

      act(() => {
        fireEvent.change(getByTestId('tab-selector'), {
          target: {
            value: 'tab-3',
          },
        });
      });

      expect(getByTestId('tabbar-container').children.item(0).textContent).toEqual('Tab 1');
      expect(getByTestId('tabbar-container').children
        .item(0).getAttribute('data-active')).toEqual('false');
      expect(getByTestId('tabbar-container').children.item(1).textContent).toEqual('Tab 2');
      expect(getByTestId('tabbar-container').children.item(2).textContent).toEqual('Tab 3');
      expect(getByTestId('tabbar-container').children
        .item(2).getAttribute('data-active')).toEqual('true');

      act(() => {
        fireEvent.click(getByTestId('tabbar__tab-1'));
      });

      expect(getByTestId('tabbar-container').children.item(0).textContent).toEqual('Tab 1');
      expect(getByTestId('tabbar-container').children
        .item(0).getAttribute('data-active')).toEqual('true');
      expect(getByTestId('tabbar-container').children.item(1).textContent).toEqual('Tab 2');
      expect(getByTestId('tabbar-container').children.item(2).textContent).toEqual('Tab 3');
      expect(getByTestId('tabbar-container').children
        .item(2).getAttribute('data-active')).toEqual('false');
    });

    it('should call custom tab title renderer', () => {
      const renderTab = jest.fn((tab, setActiveTab, activeTab) => {
        return <div key={tab.id} data-enable={activeTab === tab}
          data-testid={`tab__${tab.id}`} onClick={() => setActiveTab(tab)}>CUSTOM {tab.label}</div>;

      });
      const { getByTestId } = render(
        <TabManager>
          <div className="container" data-testid="container">
            <Tab id="tab-1" label="Tab 1">
              <div className="tab-1" data-testid="tab-1">
                Tab 1 Content
            </div>
            </Tab>
            <Tab id="tab-2" label="Tab 2">
              <div className="tab-2" data-testid="tab-2">
                Tab 2 Content
            </div>
            </Tab>
            <Tab id="tab-3" label="Tab 3">
              <div className="tab-3" data-testid="tab-3">
                Tab 3 Content
            </div>
            </Tab>
          </div>
          <div className="container" data-testid="tabbar-container">
            <TabBar data-testid="tabbar" renderTab={renderTab} />
          </div>
          <TestActiveTabSetter />
        </TabManager>);

      act(() => {
        fireEvent.change(getByTestId('tab-selector'), {
          target: {
            value: 'tab-1',
          },
        });
      });

      expect(getByTestId('container').textContent).toEqual('Tab 1 Content');

      expect(getByTestId('tabbar-container').children.length).toEqual(3);

      expect(getByTestId('tabbar-container').children.item(0).textContent).toEqual('CUSTOM Tab 1');
      expect(getByTestId('tabbar-container').children
        .item(0).getAttribute('data-enable')).toEqual('true');
      expect(getByTestId('tabbar-container').children.item(1).textContent).toEqual('CUSTOM Tab 2');
      expect(getByTestId('tabbar-container').children
        .item(1).getAttribute('data-enable')).toEqual('false');
      expect(getByTestId('tabbar-container').children.item(2).textContent).toEqual('CUSTOM Tab 3');
      expect(getByTestId('tabbar-container').children
        .item(2).getAttribute('data-enable')).toEqual('false');

      act(() => {
        fireEvent.change(getByTestId('tab-selector'), {
          target: {
            value: 'tab-3',
          },
        });
      });

      expect(getByTestId('tabbar-container').children.item(0).textContent).toEqual('CUSTOM Tab 1');
      expect(getByTestId('tabbar-container').children
        .item(0).getAttribute('data-enable')).toEqual('false');
      expect(getByTestId('tabbar-container').children.item(1).textContent).toEqual('CUSTOM Tab 2');
      expect(getByTestId('tabbar-container').children
        .item(1).getAttribute('data-enable')).toEqual('false');
      expect(getByTestId('tabbar-container').children.item(2).textContent).toEqual('CUSTOM Tab 3');
      expect(getByTestId('tabbar-container').children
        .item(2).getAttribute('data-enable')).toEqual('true');

      act(() => {
        fireEvent.click(getByTestId('tab__tab-1'));
      });

      expect(getByTestId('tabbar-container').children.item(0).textContent).toEqual('CUSTOM Tab 1');
      expect(getByTestId('tabbar-container').children
        .item(0).getAttribute('data-enable')).toEqual('true');
      expect(getByTestId('tabbar-container').children.item(1).textContent).toEqual('CUSTOM Tab 2');
      expect(getByTestId('tabbar-container').children
        .item(1).getAttribute('data-enable')).toEqual('false');
      expect(getByTestId('tabbar-container').children.item(2).textContent).toEqual('CUSTOM Tab 3');
      expect(getByTestId('tabbar-container').children
        .item(2).getAttribute('data-enable')).toEqual('false');
    });

  });
});
