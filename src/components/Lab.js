import React from 'react';
import { List} from 'antd';
import { connect } from 'react-redux';



const Labs = (props) => {
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
                <List.Item
                    key={item.title}
                >
                    <List.Item.Meta
                        title={<a href={`/labs/${item.id}`}>{item.name}</a>}
                        description={item.description}
                    />
            
                    ADMINISTRATOR: {item.administrator}
                </List.Item>
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
export default connect(MapStateToProps)(Labs);
