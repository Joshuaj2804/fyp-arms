import React from 'react';
import { Form, Input, Button} from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';

class LabForm extends React.Component {

    handleFormSubmit = (event, requestType, labID)=>{

        const name= event.target.elements.name.value;
        const administrator= event.target.elements.administrator.value;

        switch(requestType){
            case 'post':
                return axios.post('https://arms-fyp-v1.herokuapp.com/lab/',{
                    name: name,
                    administrator: administrator
                })
                .then(res => console.log(res))
                .catch(error=> console.error(error)); 

            case 'put':
                return axios.put(`https://arms-fyp-v1.herokuapp.com/lab/${labID}/`,{
                    name: name,
                    administrator: administrator
                })
                .then(res => console.log(res))
                .catch(error => console.error(error));
        }
    }

  render() {
    return (
      <div>
        <Form onSubmit={(event)=> this.handleFormSubmit(
            event,
            this.props.requestType,
            this.props.labID)}>
          <Form.Item label="Name">
            <Input name="name" placeholder="Enter the lab name" />
          </Form.Item>
          <Form.Item label="Administrator">
            <Input name="administrator" placeholder="Enter the Administrator" />
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const MapStateToProps = state => {
  return {
      is_admin:state.is_admin,
      isAuthenticated:state.token==null?false:true
  }   
}
export default connect(MapStateToProps)(LabForm);
