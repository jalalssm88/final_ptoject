import React, {Component} from 'react';
import {Link} from 'react-router-dom'
class DynamicTable extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log('props in dynamic js', this.props)
        const {data} =this.props;
        const {button} = this.props;
        var button_status;
        if(button !== undefined){
            button_status = button.split('.')[1];
        }
        
        return(
            <React.Fragment>{
                ((data.length === 0)?<div>No Data Found</div>:
                    <div className="ui grid stackable">
                        {
                            ((this.props.count)?
                                <div className="ui sixteen wide column">
                                    <div className="ui segment">
                                        {<h4>{this.props.message}<span>{this.props.count}</span></h4>}
                                    </div>
                                </div>:
                                ''
                            )
                        }
                        <div className="sixteen wide column">
                            <table className="ui celled table">
                                <thead>
                                    <tr>
                                        {
                                            Object.keys(data[0]).map((header, index)=>{
                                                return (
                                                    ( (header.split('_')[1] != 'id')
                                                        ?
                                                            <th key={index} style={{"textTransform":"capitalize"}}>{header.replace(/_/g, ' ')}</th>
                                                        : ''
                                                    )
                                                )
                                            })
                                        }
                                        {
                                            button == undefined || button.length === 0?'':
                                            <th>{button_status}</th>
                                            
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((row, index)=>{
                                            return <tr key={index} data-id={row['_id']}>
                                                {
                                                    Object.keys(row).map((col_key, index) => {
                                                        var dataList = row[col_key].split('.')
                                                        return (
                                                            ( (col_key.split('_')[1] != 'id')
                                                            ? <td key={index}>
                                                                    {
                                                                        ( ( dataList.indexOf('xlsx') != -1 || dataList.indexOf('doc') != -1  )
                                                                            ?
                                                                                <Link to={'/download_cv/'+row['_id']} className="ui mini orange button" src={row[col_key]} alt="image">Download CV</Link>
                                                                            :
                                                                                row[col_key]
                                                                        )
                                                                    }
                                                            </td>
                                                            : ''
                                                            )

                                                        )
                                                    })
                                                    
                                                }
                                                {
                                                   button_status == null ?'':
                                                    <td>
                                                        <Link to={'/'} className="ui green button mini">view</Link>
                                                    </td>
                                                }
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
                
            </React.Fragment>
        )
    }
}

export default DynamicTable;