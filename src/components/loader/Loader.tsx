import React, { FC, useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { AppDispatch} from '../../store/store';
import {useDispatch, useSelector} from 'react-redux';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Loader: FC = () => {

  return (
    <Spin indicator={antIcon} />
    
  )
}
