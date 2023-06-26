const title = "脳を鍛えるには運動しかない"
const google_api_key = "https://www.googleapis.com/books/v1/volumes?q=" + title + "&printType=books&maxResults=10"
fetch(google_api_key)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    const data0 = data.items[0];
    const data1 = data.items[1];
    const data2 = data.items[2];
    // console.log(data0);//最初の要素を表示する
    // console.log(data0.volumeInfo.industryIdentifiers[0]);
    const isbn10_data0 = data0.volumeInfo.industryIdentifiers[0].identifier;//ここの0はisbnの10と16のうち前の10を選ぶためだからすべて0でいい
    const isbn10_data1 = data1.volumeInfo.industryIdentifiers[0].identifier;
    const isbn10_data2 = data2.volumeInfo.industryIdentifiers[0].identifier;
    // console.log(isbn10_data0);
    const api_key0 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data0 + "&systemid=Ibaraki_Tsukuba&callback=no"
    const api_key1 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data1 + "&systemid=Ibaraki_Tsukuba&callback=no"
    const api_key2 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data2 + "&systemid=Ibaraki_Tsukuba&callback=no"
fetch(api_key0)
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log('エラーが発生しました', error);
  });
fetch(api_key1)
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log('エラーが発生しました', error);
  });
  fetch(api_key2)
  .then(response => response.text())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log('エラーが発生しました', error);
  });


  })
  .catch(error => {
    console.log("エラーが発生しました", error);
  });

// fetch("https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=4845422751&systemid=Ibaraki_Tsukuba&callback=no")
//   .then(response => response.text())
//   .then(data => {
//     console.log(data);
//     // 必要なデータの処理を行う
//   })
//   .catch(error => {
//     console.log('エラーが発生しました', error);
//   });
