const search_word = "脳を鍛えるには運動しかない"
// 検索キーワードを含んだGoogle Books APIキーを設定
const google_api_key = "https://www.googleapis.com/books/v1/volumes?q=" + search_word + "&printType=books&maxResults=10"
fetch(google_api_key)
  .then(response => response.json())
  .then(data => {
    // Google Books APIの出力から上位3つのデータのISBN10を取得
    const isbn10_data0 = data.items[0].volumeInfo.industryIdentifiers[0].identifier;//ここの0はisbnの10と16のうち前の10を選ぶためだからすべて0でいい
    const isbn10_data1 = data.items[1].volumeInfo.industryIdentifiers[0].identifier;
    const isbn10_data2 = data.items[2].volumeInfo.industryIdentifiers[0].identifier;
    // カーリルでの検索用のURLを設定
    const api_key0 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data0 + "&systemid=Ibaraki_Tsukuba&callback=no"
    const api_key1 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data1 + "&systemid=Ibaraki_Tsukuba&callback=no"
    const api_key2 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data2 + "&systemid=Ibaraki_Tsukuba&callback=no"

    //Google Booksでの検索結果の上から一番目の本のカーリルでの状態を表示
    fetch(api_key0)
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log('エラーが発生しました', error);
      });
      //Google Booksでの検索結果の上から二番目の本のカーリルでの状態を表示
    fetch(api_key1)
      .then(response => response.text())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log('エラーが発生しました', error);
      });
      //Google Booksでの検索結果の上から三番目の本のカーリルでの状態を表示
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

