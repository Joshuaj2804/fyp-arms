import React from 'react';
import { Layout, Menu} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    render() {
        return (
            <Layout className="layout" align='center'>
                <Header>
                <div className="logo" 
                    />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '54px' }}
                >
    
                {
                    this.props.isAuthenticated ?
    
                    <Menu.Item key="1" onClick={this.props.logout}>
                        Logout
                    </Menu.Item>
    
                    :
    
                    <Menu.Item key="1" textAlign='center'>
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                }
    
                    <Menu.Item key="2" textAlign='center'>
                        <Link to="/labs">Labs</Link>
                    </Menu.Item>

                    <Menu.Item key="3" textAlign='center'>
                        <Link to="/equipment">Equipment</Link>
                    </Menu.Item>
                    
                </Menu>
                </Header>
                <Content style={{ padding: '0 30px' }}>
                    <div style={{ background: '#ffff', padding: 30, minHeight: 450 }}>
                        {this.props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                Lab System Management ©2019 Created by Jo.N.Co
                </Footer>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));