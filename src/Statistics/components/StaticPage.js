import React from 'react';
import {
  Row, Col, Select, Table, notification,
} from 'antd';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import {
  pageTitle, backgroundColorFalseDefault, backgroundColorSuccessDefault, backgroundColorFalse, backgroundColorSuccess,
  succesTitleTable, inProcessTitleTable, errServerConnection, wordtitle, successTitle, titleFail,
  labelSucces, labelInprocess,
} from '../constants/constants';
import { wordGroupsApi } from '../../Base/api/wordGroups/wordGroupsApi';
import { loadData } from '../../WordGroups/actions/wordGroups';
import { filteerSuccess, filteerInProcess } from '../utils/utils';
import dataSour from '../utils/data';


class StatisticPage extends React.Component {
  state = {
    backgroundColorFalse: backgroundColorFalseDefault,
    backgroundColorSuccess,
    defaultSelectValue: '',
    filtaredDate: [],
    titleTable: succesTitleTable,
  };

  componentDidMount = () => {
    this.loadWordGroups();
    const data = filteerSuccess(dataSour);
    this.setState({
      filtaredDate: data,
    });
  }

  loadWordGroups = async () => {
    const { loadData } = this.props;
    const user = JSON.parse(localStorage.getItem('userInfo'));
    try {
      const dataNew = await wordGroupsApi(user.token);
      loadData(dataNew);
      this.setState(() => ({
        defaultSelectValue: dataNew[0].name,
      }));
    } catch (error) {
      notification.open({
        type: 'error',
        message: errServerConnection,
      });
    }
  };

  handleChange = (value) => {
    this.setState({ defaultSelectValue: value });
  }

  changeColor = (dataset) => {
    console.log(dataset[0]._index);
    if (!dataset[0]._index) {
      const data = filteerSuccess(dataSour);
      this.setState({
        backgroundColorFalse: backgroundColorFalseDefault,
        backgroundColorSuccess,
        titleTable: succesTitleTable,
        filtaredDate: data,
      });
    } else {
      const data = filteerInProcess(dataSour);
      this.setState({
        backgroundColorFalse,
        backgroundColorSuccess: backgroundColorSuccessDefault,
        titleTable: inProcessTitleTable,
        filtaredDate: data,
      });
    }
  }

  render() {
    const { dataSource } = this.props;
    const {
      titleTable, filtaredDate, defaultSelectValue, backgroundColorSuccess, backgroundColorFalse,
    } = this.state;

    const data = {
      labels: [
        labelSucces,
        labelInprocess,
      ],
      datasets: [{
        data: [70, 30],
        backgroundColor: [
          backgroundColorSuccess,
          backgroundColorFalse,
        ],
        hoverBackgroundColor: [
          backgroundColorSuccess,
          backgroundColorFalse,
        ],
      }],
    };

    const Option = Select.Option;
    const columns = [{
      title: wordtitle,
      dataIndex: wordtitle,
      key: wordtitle,
    }, {
      title: successTitle,
      dataIndex: successTitle,
      key: successTitle,
    }, {
      title: titleFail,
      dataIndex: titleFail,
      key: titleFail,
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
                value={defaultSelectValue}
                onChange={this.handleChange}
                className="static-select"
              >
                {dataSource.map(group => (
                  <Option value={group.name} key={group.id}>
                    {group.name}
                  </Option>
                ))}
              </Select>
              <Pie data={data} getElementAtEvent={this.changeColor} />
            </Col>
            <Col span={12}>
              <h2 className="table-title">
                {titleTable}
              </h2>
              <Table dataSource={filtaredDate} columns={columns} pagination={{ pageSize: 10 }} />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadData: (dataNew) => {
    dispatch(loadData(dataNew));
  },
});

const mapStateToProps = state => ({
  dataSource: state.wordGroups.dataSource,
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticPage);
