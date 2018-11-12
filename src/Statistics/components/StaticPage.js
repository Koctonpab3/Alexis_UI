import React from 'react';
import {
  Row, Col, Select, Table, notification,
} from 'antd';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import uuidv4 from 'uuid/v4';
import { configApi } from '../../Base/api/setup/setupApi';
import {
  pageTitle, backgroundColorFalseDefault, backgroundColorSuccessDefault, backgroundColorFalse, backgroundColorSuccess,
  succesTitleTable, inProcessTitleTable, errServerConnection, wordtitle, successTitle, titleFail,
  labelSucces, labelInprocess, noGroupsTest, inprogressForUrl, learnedForUrl
} from '../constants/constants';
import { wordGroupsApi } from '../../Base/api/wordGroups/wordGroupsApi';
import groupStatistApi from '../../Base/api/statisticApi/groupStatisticApi';
import wordsStatisticApi from '../../Base/api/statisticApi/wordsStatisticApi';
import { loadData } from '../../WordGroups/actions/wordGroups';
import { configure } from 'enzyme';

class StatisticPage extends React.Component {
  state = {
    backgroundColorFalse: backgroundColorFalseDefault,
    backgroundColorSuccess,
    defaultSelectValue: '',
    titleTable: succesTitleTable,
    inprogress: 0,
    learned: 0,
    wordsTable: [],
    activeGroupId: '',
    pagination: {},
    loading: false,
    acitveFilter: learnedForUrl,
  };

  componentDidMount = async () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const defaultSetup = await configApi(user.token);
    const { loadData } = this.props;
    const groupList = await wordGroupsApi(user.token);
    const defauldName = groupList.find(item => item.id === defaultSetup.defaultGroupId);
    if (defauldName.name) {
      loadData(groupList);
      this.setState(() => ({
        defaultSelectValue: defauldName.name,
        activeGroupId: defauldName.id,
      }));
      this.statisctiAmount(user.token, defaultSetup.defaultGroupId);
      this.handlewordsTable(user.token, defaultSetup.defaultGroupId, this.state.acitveFilter);
    }
  }
  handleTableChange = (pagination) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.handlewordsTable(user.token, this.state.activeGroupId, this.state.acitveFilter, pagination.current);

  }

  handleChange = (value) => {
    const { dataSource } = this.props;
    const pagination = { ...this.state.pagination };
    pagination.current = 1;
    const user = JSON.parse(localStorage.getItem('userInfo'));
    this.setState({ defaultSelectValue: value });
    const getIndex = dataSource.findIndex(elemet => elemet.name === value);
    this.statisctiAmount(user.token, dataSource[getIndex].id);
    this.handlewordsTable(user.token, dataSource[getIndex].id, this.state.acitveFilter);
    this.setState(() => ({
      activeGroupId: dataSource[getIndex].id,
      pagination,
    }))
  }

  statisctiAmount = async (token, idGroup) => {
    const result = await groupStatistApi(token, idGroup);
    this.setState(() => ({
      inprogress: result.inprogress,
      learned: result.learned,
    }));
  };

  handlewordsTable = async (token, groupId, statusWords, page) => {
    const pagination = { ...this.state.pagination };
    const result = await wordsStatisticApi(token, groupId, statusWords, page);
    const wordsWithKey = result.words.map((word) => ({...word, key: uuidv4()}))
    pagination.total = result.numberOfPages * 10,
    this.setState(() => ({
      wordsTable: wordsWithKey,
      pagination,
      acitveFilter: statusWords
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
      this.handlewordsTable(user.token, this.state.activeGroupId, learnedForUrl );
    } else {
      this.setState({
        backgroundColorFalse,
        backgroundColorSuccess: backgroundColorSuccessDefault,
        titleTable: inProcessTitleTable,
      });
      this.handlewordsTable(user.token, this.state.activeGroupId, inprogressForUrl);
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
            </Select>) : (<p>{noGroupsTest}</p>) }
              
              <Pie data={data} getElementAtEvent={this.changeColor} />
            </Col>
            <Col span={12}>
              <h2 className="table-title">
                {titleTable}
              </h2>
              <Table dataSource={wordsTable} columns={columns} pagination={this.state.pagination} loading={this.state.loading} 
                onChange={this.handleTableChange}
              />
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
