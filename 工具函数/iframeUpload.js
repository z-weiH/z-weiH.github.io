// 使用 iframe上传 文件 （支持 ie8+ 未验证）
var iframeUpload = ({ url , data = {} , success = () => {} }) => {
  // 设置 ifram
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  // 设置 from
  var form = document.createElement('form');
  form.method = 'post';
  form.enctype = 'multipart/form-data';
  form.action = url;
  
  // 设置 提交内容
  for(var key in data) {
    var val = data[key];
    var input = document.createElement('input');
    input.name = key;
    // 文件上传内容
    if(key === 'file') {
      input = val.cloneNode(); // 传递文件流 需要原生 file元素
    // 普通内容
    }else{
      input.value = val;
    }
    form.appendChild(input);
  }
  iframe.contentWindow.document.body.appendChild(form);

  form.submit();
  // 定时器 轮询获取成功回调
  var fn = () => {
    setTimeout(() => {
      try{
        var res = JSON.parse(iframe.contentWindow.document.body.innerText);
        document.body.removeChild(iframe);
        success(res);
      }catch(err) {
        fn();
      }
    },100);
  }
  fn();
}

export default iframeUpload