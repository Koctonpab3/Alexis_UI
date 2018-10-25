import React from 'react';
import { connect } from 'react-redux';
import { Select, Button, notification } from 'antd';
import axios from 'axios';
import { mainUrl } from '../../Base/api/auth/constants';
import { loadActiveWordGroups } from '../actions/setupActions';
import { failApproaches } from '../constans/setup';
import {
  errServerConnection,
} from '../../WordGroups/constans/constants';

const Option = Select.Option;

export class Setup extends React.Component {
    state = {

    };

    componentDidMount() {
      this.loadActiveWordGroups();
    }

    loadActiveWordGroups = () => {
      // const wordGroupsId = this.props.match.params.id;
      const activeWordGroupsApi = async (token) => {
        const response = await axios({
          method: 'get',
          // url: `${mainUrl}/home/wordgroups/activeState/${true}`,
          url: `${mainUrl}/home/wordgroups/`,
          data: {},
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (response.status <= 400) {
          return response.data;
        }
        throw new Error(response.status);
      };
      const user = JSON.parse(localStorage.getItem('userInfo'));
      activeWordGroupsApi(user.token).then((data) => {
        const resObj = data;
        const resData = [];
        const toArr = () => {
          for (const value of resObj.values()) {
            resData.push(value.name);
          }
        };
        toArr();
        this.props.loadActiveWordGroups(resData);
      }).catch((error) => {
        console.log(error);
      });
    };

    render() {
      const { words } = this.state;
      const { setup } = this.props;
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
              <Button id="save-approach" className="save-select-btn" type="primary">Save</Button>
            </div>
            <div className="select-block-item-wrap">
              <div className="select-block-item select-label">
                <span className="label-text">Default Word Group: </span>
              </div>
              <Select
                className="select-block-item select-item select-input wordgroup-select"
                // defaultValue={setup.activeWordGroups[0]}
                placeholder={setup.defaultWordGroup}
              >
                {(setup.activeWordGroups).map(wordGroup => <Option key={wordGroup}>{wordGroup}</Option>)}
              </Select>
              <Button id="save-default-group" className="save-select-btn" type="primary">Save</Button>
            </div>
          </div>
        </div>
      );
    }
}

const mapDispatchToProps = dispatch => ({
  loadActiveWordGroups: (resData) => {
    dispatch(loadActiveWordGroups(resData));
  },
});

const mapStateToProps = state => ({
  setup: state.setup,
});

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
