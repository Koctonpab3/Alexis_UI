import React from 'react';

const Statistics = () => (
  <div>
    <p>Test Statistics page</p>
    <Data />
  </div>
);
export default Statistics;

// Test server connection for word table
const URL = 'http://d978f450.ngrok.io/home/wordgroups/all';

class Data extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordData: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    // const param = {
    //   method: 'GET',
    //   mode: 'no-cors',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer: token',
    //   },
    // };
    fetch(URL, { mode: 'no-cors' })
      .then((response) => {
        if (!response.ok) {
          if (response.status >= 400 && response.status < 500) {
            return response.json().then((data) => {
              const err = { errMessage: data.message };
              throw err;
            });
          }
          const err = { errMessage: 'Something went wrong' };
          throw err;
        }
        return response.json();
      })
      .then(wordData => this.setState({ wordData }));

    console.log(this.state.wordData);
  }

  render() {
    const dataArray = this.state.wordData;
    const itemsList = dataArray.map((item, index) => (
      <div className="response" key={index}>
        <div className="name">
          {item.name}
        </div>
        <div className="State">
          {item.activeState}
        </div>
      </div>
    ));

    return (
      <div className="groups">
        {itemsList}
      </div>
    );
  }
}
