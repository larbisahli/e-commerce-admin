import type { ModalView, Nullable } from '@ts-types/custom.types';
import React from 'react';
interface State {
  view?: ModalView;
  id?: Nullable<String>;
  isOpen: boolean;
  meta: Nullable<any>;
}
type Action =
  | { type: 'close'; view?: ModalView; id?: String; meta?: String }
  | { type: 'open'; view?: ModalView; id?: String; meta?: String };

const initialState: State = {
  view: undefined,
  isOpen: false,
  id: null,
  meta: null
};

function modalReducer(state: State, action: Action): State {
  return {
    ...state,
    view: action.view,
    id: action.id,
    isOpen: action.type === 'open',
    meta: action.meta
  };
}

const ModalStateContext = React.createContext<State>(initialState);

ModalStateContext.displayName = 'ModalStateContext';

const ModalActionContext = React.createContext<
  React.Dispatch<Action> | undefined
>(undefined);

ModalActionContext.displayName = 'ModalActionContext';

interface Props {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = React.useReducer(modalReducer, initialState);
  return (
    <ModalStateContext.Provider value={state}>
      <ModalActionContext.Provider value={dispatch}>
        {children}
      </ModalActionContext.Provider>
    </ModalStateContext.Provider>
  );
};

export function useModalState() {
  const context = React.useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error(`useModalState must be used within a ModalProvider`);
  }
  return context;
}

export function useModalAction() {
  const dispatch = React.useContext(ModalActionContext);
  if (dispatch === undefined) {
    throw new Error(`useModalAction must be used within a ModalProvider`);
  }
  return {
    closeModal(view?: ModalView, id?: String, meta?: any) {
      dispatch({ type: 'close', view, id, meta });
    },
    openModal(view?: ModalView, id?: String, meta?: any) {
      dispatch({ type: 'open', view, id, meta });
    }
  };
}
