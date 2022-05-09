import React from 'react'
import { Popconfirm  } from 'antd';

export default function DeleteConfirm({children, title="", action="", confirm, cancel}) {

 
      
    return (
        <Popconfirm
        style={{ padding: "10px 20px"}}
        title={`Are you sure to ${(action !== "") ? action : 'delete'} ?`}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
          {children}
          </Popconfirm>
    )
}
