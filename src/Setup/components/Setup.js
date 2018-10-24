import React from 'react';
import { connect } from 'react-redux';
import { Select, Button } from 'antd';
import axios from 'axios';
import { mainUrl } from '../../Base/api/auth/constants';
import { wordGroupsApi } from '../../Base/api/wordGroups/wordGroupsApi';

const Option = Select.Option;
// const provinceData = ['Zhejiang', 'Jiangsu'];
// const cityData = {
//   Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
//   Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
// };

// const wordGroups = ['Animals', 'Planet', 'School'];
const failApproaches = ['1', '2', '3'];

export default class Setup extends React.Component {
    state = {
      groupsList: [],
    };

  // state = {
  //   cities: cityData[provinceData[0]],
  //   secondCity: cityData[provinceData[0]][0],
  // };
  //
  // handleProvinceChange = (value) => {
  //   this.setState({
  //     cities: cityData[value],
  //     secondCity: cityData[value][0],
  //   });
  // };
  //
  // onSecondCityChange = (value) => {
  //   this.setState({
  //     secondCity: value,
  //   });
  // };
    loadWordGroups = () => {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      wordGroupsApi(user.token).then((data) => {
        const resData = data;
        const resWordGroups = [];
        const toArr = () => {
          for (const value of resData.values()) {
            resWordGroups.push(value.name);
          }
        };
        toArr();
        this.setState({
          groupsList: resWordGroups,
        });
      }).catch((error) => {
        console.log(error);
      });
    };

    componentDidMount() {
      this.loadWordGroups();
    }

    render() {
      const { groupsList } = this.state;
      return (
        <div className="select-block">
          <div className="select-block-text">
            <span>You can choose the number of fail approaches for each group</span>
          </div>
          <div className="select-wrapper">
            <div className="select-block-item-wrap">
              <div className="select-block-item select-label">
                <span className="label-text">Fail Approach: </span>
              </div>
              <Select
                className="select-block-item select-item select-input fail-num-select"
                defaultValue={failApproaches[2]}
              >
                {failApproaches.map(fnum => <Option key={fnum}>{fnum}</Option>)}
              </Select>
            </div>
            <div className="select-block-item-wrap">
              <div className="select-block-item select-label">
                <span className="label-text">Word Group: </span>
              </div>
              <Select
                className="select-block-item select-item select-input wordgroup-select"
                value={groupsList[0]}
              >
                {groupsList.map(wordGroup => <Option key={wordGroup}>{wordGroup}</Option>)}
              </Select>
            </div>
          </div>
          <Button id="save-select-btn" type="primary">Save</Button>
        </div>
      );
    }
}
