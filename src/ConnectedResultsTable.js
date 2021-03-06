import React from 'react';
import ResultsTable from './ResultsTable';
import Pusher from 'pusher-js';
 const socket = new Pusher('PUSHER_KEY', {
     cluster: 'PUSHER_CLUSTER',
     encrypted: true
 });
export default class ConnectedResultsTable extends React.Component {
    state = {
        results: []
    };
    componentDidMount() {
      const channel = socket.subscribe('results');
      channel.bind('results', (data) => {
          this.setState(data);
      });
        fetch('http://localhost:8080/results')
            .then((response) => response.json())
            .then((response) => this.setState(response));
    }
    render() {
        return <ResultsTable results={this.state.results} />;
    }
}
