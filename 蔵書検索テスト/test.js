fetch("https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=4845422751&systemid=Ibaraki_Tsukuba&callback=no")
  .then(response => response.text())
  .then(data => {
    console.log(data);
    // 必要なデータの処理を行う
  })
  .catch(error => {
    console.log('エラーが発生しました', error);
  });
