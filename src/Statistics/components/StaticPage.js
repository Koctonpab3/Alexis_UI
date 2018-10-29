import React from 'react';
import {
  Row, Col, Select, Table,
} from 'antd';
import { Pie } from 'react-chartjs-2';
import { pageTitle } from '../constants/constants';




class StatisticPage extends React.Component {

  state = {
    backgroundColor: '#20a854',
  }



  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  handle = (e) => {
    console.log(e.target)
  }

   handleBlur = (value) => {
     console.log('blur');
   }

  handleFocus = (value) => {
    console.log('focus');
  }

  changeColor = (dataset, event) => {
    console.log(dataset[0]._index)
    if (dataset[0]._index) {
      this.setState({ backgroundColor: '#001529' });
    }
  }

  render() {
    const data = {
      labels: [
        'Success',
        'False',
      ],
      datasets: [{
        data: [70, 30],
        backgroundColor: [
        '#FF6384',
        this.state.backgroundColor,
        ],
        hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        ]
      }]
    };

    const Option = Select.Option;
    const dataSource = [{
      key: '6',
      word: 'parrot',
      success: 3,
      fail: 4,
    },
    {
      key: '5',
      word: 'book',
      success: 32,
      fail: 4,
    },
    {
      key: '4',
      word: 'farm',
      success: 2,
      fail: 413,
    },
    {
      key: '3',
      word: 'Ghost',
      success: 32,
      fail: 44,
    },
    {
      key: '2',
      word: 'cat',
      success: 32,
      fail: 4,
    },
    {
      key: '1',
      word: 'dog',
      success: 3,
      fail: 7,
    }];
    const columns = [{
      title: 'word',
      dataIndex: 'word',
      key: 'name',
    }, {
      title: 'success',
      dataIndex: 'success',
      key: 'success',
    }, {
      title: 'fail',
      dataIndex: 'fail',
      key: 'fail',
    }];
    return (
      <div className="page static-page">
        <h1 className="page__title">
          {pageTitle}
        </h1>
        <div>
          <Row>
            <Col span={12}>
              <Select
                showSearch
                style={{ width: '300px' }}
                placeholder="Select a Group"
                optionFilterProp="children"
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="jack">
Jack
                </Option>
                <Option value="lucy">
Lucy
                </Option>
                <Option value="tom">
Tom
                </Option>
              </Select>
              <p>
                DIAGRAM HERE
              </p>
              <Pie data={data} getElementAtEvent={this.changeColor} /> 
            </Col>
            <Col span={12}>
              <Table dataSource={dataSource} columns={columns} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StatisticPage;
