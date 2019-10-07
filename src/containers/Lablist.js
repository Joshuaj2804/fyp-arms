import React from 'react';
import axios from 'axios';
import Labs from '../components/Lab';
import LabForm from '../components/LabForm';
import { connect } from 'react-redux';
import { Card } from 'antd';


class Lablist extends React.Component{

    state={
        labs: []
    }

    componentDidMount(){

        axios.get('https://arms-fyp-v1.herokuapp.com/lab/')
        .then (res=>{
            this.setState({
                labs: res.data
            });
            console.log(res.data);
        })
    }

    render (){
        return (
            <div>
                <Card>
                    <Labs data={this.state.labs} />
                </Card>
                <br />
                {
                    this.props.is_admin?
                    <Card>
                    <h2>Create a New Lab</h2>
                    <LabForm requestType="post" labID={null} btnText="Create"/>               
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
export default connect(MapStateToProps)(Lablist);
