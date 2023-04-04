import axios from "axios";
import axiosGlobal from 'axios';
import { BASE_URL } from '@utils';

export const axiosOur = axiosGlobal.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImpvaG5kb2UiLCJpYXQiOjk5OTk5OTk5OSwiYXV0aG9yaXRpZXMiOlsiZW1wbG95ZWUiLCJzeXN0ZW1fYWRtaW5pc3RyYXRvciIsInN0b3JlX2FkbWluaXN0cmF0b3IiLCJldmVudF9hZG1pbmlzdHJhdG9yIiwiYWNjcnVhbF9hZG1pbmlzdHJhdG9yIiwiYnVkZ2V0X293bmVyIiwiYXVkaXRvciIsImV2ZW50X29yZ2FuaXplciJdfQ.sqjyo3YQSc-kGLoyyDRIYiHeDQu8nWJyhoMxMnMDC14`;
  return config;
});

axiosOur.interceptors.request.use((config) => {
  config.headers.Authorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwibmFtZSI6ImpvaG5kb2UiLCJpYXQiOjk5OTk5OTk5OSwiYXV0aG9yaXRpZXMiOlsiZW1wbG95ZWUiLCJzeXN0ZW1fYWRtaW5pc3RyYXRvciIsInN0b3JlX2FkbWluaXN0cmF0b3IiLCJldmVudF9hZG1pbmlzdHJhdG9yIiwiYWNjcnVhbF9hZG1pbmlzdHJhdG9yIiwiYnVkZ2V0X293bmVyIiwiYXVkaXRvciIsImV2ZW50X29yZ2FuaXplciJdfQ.sqjyo3YQSc-kGLoyyDRIYiHeDQu8nWJyhoMxMnMDC14`;
  return config;
});
