import React from 'react';
import { RouteChildrenProps } from 'react-router';
import ROUTES from '../../constants/routes';
import { User } from '../../types/global';

interface Props extends RouteChildrenProps<{ sessionId: string }> {
  user: User;
}

class SessionPage extends React.Component<Props> {
  public componentDidMount() {
    const { match: { params: { sessionId } }, history } = this.props;

    if (this.isNotFound()) {
      history.push(ROUTES.SESSION_NOT_FOUND, { sessionId });
      return;
    }

    if (!this.isRegistered()) {
      history.push(ROUTES.JOIN_SESSION, { sessionId });
    }
  }

  private isNotFound = () => {
    const { match: { params: { sessionId } } } = this.props;
    return sessionId !== 'test';
  }

  private isRegistered = () => {
    const { match: { params: { sessionId } }, user } = this.props;
    return user && sessionId === user.registeredSessionId;
  }

  public render() {
    const { match: { params: { sessionId } } } = this.props;

    if (this.isNotFound() || !this.isRegistered()) {
      return null;
    }

    return (
      <div>
        {sessionId}
      </div>
    );
  }
}

export default SessionPage;