import React from 'react';
import { List,Card } from 'antd';
import { connect } from 'react-redux';




const Equipment = (props) => {
    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 3,
            }}
            dataSource={props.data}
            renderItem={item => (
                <Card>
                   <List.Item
                    key={item.title}
                >
                    <List.Item.Meta
                        title={<a href={`/equipment/${item.id}`}>{item.name}</a>}
                        
                    />
                    Maintenance Date={item.maintenancedate}
                    <hr/>
                    Lab: {item.lab}
                    <br/>
                    <br/>
                    Comment: {item.comment}
                </List.Item> 
                </Card>
                
            )}
        />
    )
}
const MapStateToProps = state => {
    return {
        is_admin:state.is_admin,
        isAuthenticated:state.token==null?false:true
    }   
}
export default connect(MapStateToProps)(Equipment);