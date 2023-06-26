fetch("https://www.googleapis.com/books/v1/volumes?q=星の王子さま&printType=books&maxResults=1")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const data0 = data.items[0];
    // console.log(data0);//最初の要素を表示する
    console.log(data0.volumeInfo.industryIdentifiers[0]);
    const isbn10_data0 = data0.volumeInfo.industryIdentifiers[0].identifier;
    console.log(isbn10_data0);
    // ここでデータを処理する追加のコードを書くことができます
  })
  .catch(error => {
    console.log("エラーが発生しました", error);
  });
