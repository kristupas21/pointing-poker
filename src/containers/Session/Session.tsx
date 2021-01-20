import React from 'react';
import { match as Match, Redirect } from 'react-router';
import ROUTES from '../../constants/routes';

interface Props {
  match: Match<{ id: string }>;
}

class Session extends React.Component<Props> {
  private testId = 'xo';

  public render() {
    const { match: { params: { id } } } = this.props;

    if (id !== this.testId) {
      return <Redirect to={ROUTES.BASE} />;
    }

    return (
      <div>
        {id}
      </div>
    );
  }
}

export default Session;
