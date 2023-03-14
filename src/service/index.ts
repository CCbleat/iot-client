import axios from 'axios';

// 代理参数
const http: string = '/api/';

// url处理
const getUrl = (url: string) => {
  if (!url) {
    return '';
  }
  return `${http}${url}`;
};

// Post方法
const Post = ({url = '', data = {}}) => {

  let theUrl: string = getUrl(url);

  return axios.post(theUrl, data)
    .then((response) => {
      if (response) {
        return response;
      } else {
        return Promise.reject();
      }
    })
};

export default {
  Post
};
export {
  Post
};