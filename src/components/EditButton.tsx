import * as React from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const EditButton = (props: { label: string; onClickFunction: Function }) => {
  const [label, setLabel] = React.useState(props.label);
  React.useEffect(() => {
    setLabel(props.label);
  }, [props.label]);
  return (
    <Button
      className='sm:float-center float-right my-6 sm:my-0'
      onClick={() => props.onClickFunction()}
    >
      <EditOutlined />
      {label}
    </Button>
  );
};

export default EditButton;
