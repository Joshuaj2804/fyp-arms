import React from 'react';
import axios from 'axios';
import { Card,Button } from 'antd';
import EquipmentForm from '../components/EquipmentForm';
import { connect } from 'react-redux';
var QrCode = require('qrcode.react');
class Equipmentdetail extends React.Component{
    user=localStorage.getItem('user')
    token=this.user.token

    state={
        user:this.user,
        token:this.token,
        equipment: []
    }

    componentDidMount() {
        const equipmentID = this.props.match.params.equipmentID;
        axios.get(`https://arms-fyp-v1.herokuapp.com/equipment/${equipmentID}/`)
        .then (res=>{
            this.setState({
                equipment: res.data
            });
            console.log(res.data);
        })
    }

    handleDelete = (event)=>{
        event.preventDefault();
        const equipmentID = this.props.match.params.equipmentID;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.state.user.token}`
          };
        axios.delete(`https://arms-fyp-v1.herokuapp.com/equipment/${equipmentID}/`);
        this.props.history.push('/');
        this.forceUpdate();
    }

    render (){
        return (
            <div>
                <Card title={this.state.equipment.name}>
                    <p>Lab : {this.state.equipment.lab}</p>
                    <p>Maintenance Date : {this.state.equipment.maintenancedate}</p>
                    <p>Comments : {this.state.equipment.comment}</p>
                    <QrCode value={`https://arms-fyp-v1.herokuapp.com/equipment/${this.state.equipment.id}`} align= 'center'/>
                    <br/>
                    <br/>
                    <form  onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>  
                    </form>
                </Card> 
                    <br />
                <Card>
                    <EquipmentForm {...this.props}
                        token={this.props.token}requestType="put" equipmentID = {this.props.match.params.equipmentID} btnText="Update"/>
                </Card> 
                
            </div>
            
         
        )
    }

}const MapStateToProps = state => {
    return {
        token:state.token,
        is_admin:state.is_admin,
        isAuthenticated:state.token==null?false:true
    }   
}
export default connect(MapStateToProps)(Equipmentdetail);