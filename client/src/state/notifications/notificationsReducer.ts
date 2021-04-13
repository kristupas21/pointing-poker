import { ActionType, Reducer } from 'typesafe-actions';
import { NotificationLifespan, NotificationsState, NotificationType } from './notificationsModel';
import { CLEAR_NOTIFICATION, PUSH_NOTIFICATION } from './notificationsConstants';

type Action = ActionType<typeof import('./notificationsActions')>;

type State = Readonly<NotificationsState>;

const initialState: State = {
  items: [],
};

const notificationsReducer: Reducer<State, Action> = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_NOTIFICATION: {
      const { payload: notification } = action;

      return {
        ...state,
        items: [
          {
            ...notification,
            type: notification.type || NotificationType.Default,
            lifespan: notification.lifespan || NotificationLifespan.Short,
          },
          ...state.items.filter((n) => n.id !== notification.id),
        ]
      };
    }
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        items: state.items.filter((n) => n.id !== action.payload),
      };
    default:
      return state;
  }
};

export default notificationsReducer;
