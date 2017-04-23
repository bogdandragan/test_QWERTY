import React from 'react'
import { connect } from 'react-redux'
import { fetchUsers, importVKUsers } from "../actions/usersActions"
import Table from './Table'
import Charts from './Charts'
import '../../assets/bootstrap/css/bootstrap.min.css'

@connect((store) => {
    return {
        users: store.users.users,
        usersError: store.users.error,
        fetching: store.users.fetching,
        importVK: store.users.importVK
    };
})
export default class App extends React.Component {
    constructor(){
        super();
        this.state = {
            title : "Users by country statistics from VK group id40567146",
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchUsers())
    }

    refreshUsers() {
        this.props.dispatch(fetchUsers())
    }

    importUsers(){
        this.props.dispatch(importVKUsers())
    }

    render() {
        const { users, usersError, fetching, importVK } = this.props;
        const buttonStyle = {
            marginRight: '20'
        };
        const importVKStyle = {
            display: 'inline',
            marginLeft: '20'
        }

        if (usersError) {
            return (
                <div className="container">
                    <h2>{this.state.title}</h2>
                    <h4>{usersError.toString()}</h4>
                </div>
            )
        }

        if (fetching) {
            return (
                <div className="container">
                    <h2>{this.state.title}</h2>
                    <h4>loading...</h4>
                </div>
            )
        }

        let importVKStatus = null;
        if(importVK.fetching){
            importVKStatus = <p style={importVKStyle}>importing users...</p>
        }
        else if(importVK.fetched){
            importVKStatus = <p style={importVKStyle}>{importVK.result}</p>
        }else if(importVK.error){
            importVKStatus = <p style={importVKStyle}>{importVK.error}</p>
        }else{
            importVKStatus = <p style={importVKStyle}></p>
        }

        return (
            <div className="container">
                <h2>{this.state.title}</h2>
                <button style={buttonStyle} className="btn btn-primary" onClick={() => this.refreshUsers()}><span className="glyphicon glyphicon-refresh"></span> Refresh</button>
                <button disabled={users.length} className="btn btn-primary" onClick={() => this.importUsers()}><span className="glyphicon glyphicon-download"></span> Import VK Users</button>
                {importVKStatus}
                <Charts users={users}/>
                <Table users={users}/>
            </div>
        )
    }
}