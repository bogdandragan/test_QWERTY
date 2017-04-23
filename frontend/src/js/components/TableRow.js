import React from 'react'

export default class TableRow extends React.Component{
    render(){
        return(
            <tr>
                <td>{this.props.country}</td>
                <td>{this.props.count}</td>
            </tr>
        );
    }
}