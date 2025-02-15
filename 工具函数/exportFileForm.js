// host为 跨域请求url 前缀
import host from '@/axios/host'

// 使用此方法 没有接口回调
export default ({url = '' , data = {} , method = 'get'} = {}) => {
  let iframe = document.createElement('iframe');
  let form = document.createElement('form');
  form.method = method;
  form.action = host.target + url;
  // 增加 token
  //data['token'] = JSON.parse(localStorage.getItem('loginInfo')).token;
  Object.keys(data).map((k) => {
    let v = data[k];
    let input = document.createElement('input');
    input.setAttribute('value',v);
    input.setAttribute('name',k);
    form.appendChild(input);
  });
  // 先要插入body 不染无法获取 iframe中的window
  document.body.appendChild(iframe);
  iframe.contentWindow.document.body.appendChild(form);
  form.submit();

  // 定时器铺货异常信息
  /* let timer = setInterval(() => {
    console.log(iframe.contentWindow.document.body.innerHTML);
  },1000); */
}