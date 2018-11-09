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
import groupStatistApi from '../../Base/api/statisticApi/groupStatisticApi';
import wordsStatisticApi from '../../Base/api/statisticApi/wordsStatisticApi';
import { loadData } from '../../WordGroups/actions/wordGroups';
import { filteerSuccess, filteerInProcess } from '../utils/utils';
import dataSour from '../utils/data';


class StatisticPage extends React.Component {
  state = {
    backgroundColorFalse: backgroundColorFalseDefault,
    backgroundColorSuccess,
    defaultSelectValue: '',
    titleTable: succesTitleTable,
    inprogress: 0,
    learned: 0,
    activeGroupId: '',
    pagination: {},
    loading: false,
  };

  componentDidMount = async () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const { loadData } = this.props;
    const groupList = await wordGroupsApi(user.token);
    if (groupList[0].name) {
      loadData(groupList);
      this.setState(() => ({
        defaultSelectValue: groupList[0].name,
        activeGroupId: groupList[0].id
        
      }));
      this.statisctiAmount(user.token, groupList[0].id);
      this.handlewordsTable(user.token, groupList[0].id);
    }
  }

  handleChange = (value) => {
    const { dataSource } = this.props;
    const user = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({ defaultSelectValue: value });
    const getIndex = dataSource.findIndex(elemet => elemet.name === value);
    console.log(dataSource[getIndex].id);
    this.statisctiAmount(user.token, dataSource[getIndex].id);
    this.handlewordsTable(user.token, dataSource[getIndex].id);
    this.setState(() => ({
      activeGroupId: dataSource[getIndex].id,
    }))
  }

  statisctiAmount = async (token, idGroup) => {
    const result = await groupStatistApi(token, idGroup);
    this.setState(() => ({
      inprogress: result.inprogress,
      learned: result.learned,
    }));
  };

  handlewordsTable = async (token, groupId, statusWords) => {
    const pagination = { ...this.state.pagination };
    const result = await wordsStatisticApi(token, groupId, statusWords);
    console.log(result.numberOfPages);
    pagination.total = result.numberOfPages,
    console.log(pagination.total)
    this.setState(() => ({
      wordsTable: result.words,
      pagination,
    }));
  };


  changeColor = (dataset) => {
    const { dataSource } = this.props;
    const pagination = { ...this.state.pagination };
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!dataset[0]._index) {
      this.setState({
        backgroundColorFalse: backgroundColorFalseDefault,
        backgroundColorSuccess,
        titleTable: succesTitleTable,
      });
      this.handlewordsTable(user.token, this.state.activeGroupId, );
    } else {
      this.setState({
        backgroundColorFalse,
        backgroundColorSuccess: backgroundColorSuccessDefault,
        titleTable: inProcessTitleTable,
      });
      this.handlewordsTable(user.token, this.state.activeGroupId, 'inprogress');
    }
  }

  render() {
    const { dataSource } = this.props;
    const {
      titleTable, wordsTable, defaultSelectValue, backgroundColorSuccess, backgroundColorFalse,
    } = this.state;

    const data = {
      labels: [
        labelSucces,
        labelInprocess,
      ],
      datasets: [{
        data: [this.state.inprogress, this.state.learned],
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
            {this.state.defaultSelectValue ? (<Select
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
            </Select>) : (<p>No groups to select(This text is temporary)</p>) }
              
              <Pie data={data} getElementAtEvent={this.changeColor} />
            </Col>
            <Col span={12}>
              <h2 className="table-title">
                {titleTable}
              </h2>
              <Table dataSource={wordsTable} columns={columns} pagination={this.state.pagination} loading={this.state.loading} />
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
