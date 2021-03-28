import React, { CSSProperties, ReactNode, useContext, useState } from 'react';
import noop from 'lodash/noop';
import isEqual from 'lodash/isEqual';

const style: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  right: 0,
  top: 0,
  background: 'white',
  border: '2px solid',
};

type LoggerCtx = {
  items: Record<string, any>[];
  setItems: (items: Record<string, any>[]) => void;
}

export const LoggerContext = React.createContext<LoggerCtx>({
  items: [],
  setItems: noop,
});

export const LoggerContextProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState([]);

  const setter = (newItems) => {
    if (isEqual(items, newItems)) {
      return;
    }

    setItems(newItems);
  };

  return (
    <LoggerContext.Provider value={{ items, setItems: setter }}>
      <Logger />
      {children}
    </LoggerContext.Provider>
  );
};

const Logger: React.FC = () => {
  const { items } = useContext(LoggerContext);

  const renderItem = (item: Record<string, any>, idx) => {
    if (!item) {
      return null;
    }

    return (
      <div style={{ borderBottom: '1px solid', padding: 5 }} key={idx}>
        {Object.entries(item).map(([key, value]) => (
          <div key={key}>
            <span>
              {key}
              :
            </span>
            <span style={{ marginLeft: 2 }}>
              {JSON.stringify(value)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (!items?.length) {
    return null;
  }

  return (
    <div style={style}>
      {items.map(renderItem)}
    </div>
  );
};
