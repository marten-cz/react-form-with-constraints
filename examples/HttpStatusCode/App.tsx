import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { withConstraints, withConstraintsProps, FieldFeedbacks, FieldFeedback } from '../../index';

import 'file-loader?name=[path][name].[ext]!./index.html';
import 'file-loader?name=[path][name].[ext]!./style.css';

interface Props extends withConstraintsProps {}

interface State {
  [name: string]: string;

  httpStatusCode: string;
}

// Inspired by http://codepen.io/nukos/pen/RPwxBp
class Form extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      httpStatusCode: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.currentTarget;

    this.setState({
      [target.name]: target.value
    });

    this.props.form.handleChange(e);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    this.props.form.handleSubmit(e);

    if (this.props.form.isValid()) {
      console.log('form is valid: submit');
    } else {
      console.log('form is invalid');
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        <div>
          <label>HTTP Status code (enter 200, 404, 500, 503)</label>
          <input type="number" name="httpStatusCode"
                 value={this.state.httpStatusCode} onChange={this.handleChange}
                 min={100} max={599} required />
          <FieldFeedbacks for="httpStatusCode">
            <FieldFeedback when="*" />
            <FieldFeedback when={value => value === '200'} info>{this.state.httpStatusCode} OK</FieldFeedback>
            <FieldFeedback when={value => value === '404'} info>{this.state.httpStatusCode} Not Found</FieldFeedback>
            <FieldFeedback when={value => value === '500'} info>{this.state.httpStatusCode} Internal Server Error</FieldFeedback>
            <FieldFeedback when={value => value === '503'} info>{this.state.httpStatusCode} Service Unavailable</FieldFeedback>
          </FieldFeedbacks>
        </div>

        <button>Submit</button>
      </form>
    );
  }
}
const FormWithConstraints = withConstraints(Form);

const App = () => (
  <div>
    <p>
      Inspired by <a href="http://codepen.io/nukos/pen/RPwxBp">http://codepen.io/nukos/pen/RPwxBp</a>
    </p>
    <FormWithConstraints />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
