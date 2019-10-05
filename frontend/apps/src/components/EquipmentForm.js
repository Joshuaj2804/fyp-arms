import React from 'react';
import { Form, Input, Button} from 'antd';
import axios from 'axios';

    

class EquipmentForm extends React.Component {


    handleFormSubmit = (event, requestType, equipmentID)=>{

        const name= event.target.elements.name.value;
        const lab= event.target.elements.lab.value;
        const maintenancedate= event.target.elements.maintenancedate.value;
        const comment= event.target.elements.comment.value;

        switch(requestType){
            case 'post':
                return axios.post('http://127.0.0.1:8000/equipment/',{
                    name: name,
                    lab: lab,
                    maintenancedate: maintenancedate,
                    comment:comment
                    
                })
                .then(res => console.log(res))
                .catch(error=> console.error(error)); 

            case 'put':
                return axios.put(`http://127.0.0.1:8000/equipment/${equipmentID}/`,{
                    name: name,
                    lab: lab,
                    maintenancedate: maintenancedate,
                    comment:comment
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
            this.props.equipmentID)}>
          <Form.Item label="Name">
            <Input name="name" placeholder="Enter the Equipment name" />
          </Form.Item>
          <Form.Item label="Lab">
            <Input name="lab" placeholder="Enter the Lab ID" />
          </Form.Item>
          <Form.Item label="Maintenance Date">
            <Input name="maintenancedate" placeholder="Enter the Maintenance Date" />
          </Form.Item>
          <Form.Item label="Comment">
            <Input name="comment" placeholder="Enter your comments" />
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default EquipmentForm;
