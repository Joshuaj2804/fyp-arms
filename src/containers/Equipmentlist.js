import React from 'react';
import axios from 'axios';
import EquipmentForm from '../components/EquipmentForm';
import { connect } from 'react-redux';
import { Card } from 'antd';
import Equipment from '../components/Equipment';


class Equipmentlist extends React.Component{

    state={
        equipment: [],
    }

    componentDidMount(){

        axios.get('http://127.0.0.1:8000/equipment/')
        .then (res=>{
            this.setState({
                equipment: res.data
            });
            console.log(res.data);
        })
    }

    render (){
        return (
            <div>
                <Card>
                    <Equipment data= {this.state.equipment} />
                </Card>
                <br />
                {
                    this.props.isAuthenticated?
                    <Card>
                    <h2>Add a new Equipment?</h2>
                    <EquipmentForm requestType="post" labID={null} btnText="Create"/>               
                    </Card>
                    :
                    <div></div>
                }    
                
                
                
            </div>
            
        )
    }

    
}
const MapStateToProps = state => {
     return {
         is_admin:state.is_admin,
         isAuthenticated:state.token==null?false:true
     }   
}
export default connect(MapStateToProps)(Equipmentlist);
