import React from 'react';
import axios from 'axios';
import Graph from './Graph';

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {country: '', points: []};
  
      this.handleCountryChange = this.handleCountryChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleCountryChange(event) {
      this.setState({country: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();

        const defaultRateSi = 0.05
        const defaultRateIr = 0.01
        const defaultEons = 1000;
        const queryString = `?country=${this.state.country}&rateSi=${defaultRateSi}0.05&rateIr=${defaultRateIr}&eons=${defaultEons}`;
        
        const baseProdUrl = "https://coronavirus-sir-model-api.herokuapp.com/v1/sir_model";
        const baseLocalUrl = `http://localhost:4567/v1/sir_model`;

        const url = baseProdUrl + queryString;
        axios.get(url)
        .then((response) => {
          this.setState({points: response.data.points})
        }).catch(() => {
          this.setState({ points: [] })
        })
    }
  
    render() {
      return (
        <div>
          { this.state.points.length > 0 && <Graph points={this.state.points} /> }
        <form onSubmit={this.handleSubmit}>
          <label>
            Country:
            <input type="text" value={this.state.country} onChange={this.handleCountryChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
      );
    }
}

export default Form;
