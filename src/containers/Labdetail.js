import React from 'react';
import axios from 'axios';
import { Card,Button } from 'antd';
import LabForm from '../components/LabForm';
import { connect } from 'react-redux';


class Labdetail extends React.Component{

    state={
        lab: []
    }

    componentDidMount() {
        const labID = this.props.match.params.labID;
        axios.get(`http://127.0.0.1:8000/lab/${labID}/`)
        .then (res=>{
            this.setState({
                lab: res.data
            });
            console.log(res.data);
        })
    }

    handleDelete = (event)=>{
        event.preventDefault();
        const labID = this.props.match.params.labID;
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
          };
        axios.delete(`http://127.0.0.1:8000/lab/${labID}/`);
        this.props.history.push('/');
        this.forceUpdate();
    }

    render (){
        return (
            <div>
                <Card title={this.state.lab.name}>
                    <p>ADMINISTRATOR : {this.state.lab.administrator}</p>
                    <form  onSubmit={this.handleDelete}>
                    <Button type="danger" htmlType="submit">Delete</Button>
                </form>
                </Card> 
                    <br />
                <Card>
                    <LabForm {...this.props}
                        token={this.props.token}requestType="put" labID = {this.props.match.params.labID} btnText="Update"/>
                </Card> 
                
            </div>
            
         
        )
    }

}const MapStateToProps = state => {
    return {
        is_admin:state.is_admin,
        Token:state.token,
        isAuthenticated:state.token==null?false:true
    
    }   
}
export default connect(MapStateToProps)(Labdetail);