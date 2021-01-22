import React from 'react';
import { RouteChildrenProps } from 'react-router';
import ROUTES from '../../constants/routes';

interface Props extends RouteChildrenProps<{ sessionId: string }> {
  isLoading?: boolean;
}

class SessionPage extends React.Component<Props> {
  public componentDidMount() {
    const { match: { params: { sessionId } }, history } = this.props;

    if (this.isNotFound()) {
      history.push(ROUTES.SESSION_NOT_FOUND, { sessionId });
    }
  }

  private isNotFound = () => {
    const { match: { params: { sessionId } } } = this.props;
    return sessionId === 'test';
  }

  public render() {
    const { match: { params: { sessionId } } } = this.props;

    if (this.isNotFound()) {
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
