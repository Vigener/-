document.getElementById("begin_search").addEventListener("click", searchBooks);
document.getElementById("keyword").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searchBooks();
  }
});

function searchBooks() {
  console.clear()
  const key_word = document.getElementById("keyword").value;
  var google_api_key = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(key_word) + "&printType=books&maxResults=10";
  fetch(google_api_key)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const isbn10_data0 = data.items[0].volumeInfo.industryIdentifiers[0].identifier;
      const isbn10_data1 = data.items[1].volumeInfo.industryIdentifiers[0].identifier;
      const isbn10_data2 = data.items[2].volumeInfo.industryIdentifiers[0].identifier;
      const imageLinks_data0 = data.items[0].volumeInfo.imageLinks;
      var title_data0 = data.items[0].volumeInfo.title;

      //// 最終的にはコメントに変える
      if (imageLinks_data0 && imageLinks_data0.thumbnail) {
        var thumbnail_data0 = imageLinks_data0.thumbnail
        // var thumbnail_data0_str = JSON.stringify(thumbnail_data0); //data0のサムネイルをjson形式→文字列;
        // console.log(thumbnail_data0_str);
        console.log(thumbnail_data0);
      } else if (imageLinks_data0 && imageLinks_data0.smallThumbnail) {
        console.log(imageLinks_data0.smallThumbnail);
      } else {
        console.log("画像が見つかりませんでした。");
      }
      ////

      const system_id = "Ibaraki_Tsukuba"
      
      const api_key0 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data0 + "&systemid=" + system_id + "&callback=no";
      // const api_key1 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data1 + "&systemid=Ibaraki_Tsukuba&callback=no";
      // const api_key2 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data2 + "&systemid=Ibaraki_Tsukuba&callback=no";
      ////一番目のデータ(data0)についてデータの取得が完了するまで繰り返す////
      const fetchData = () => {
        fetch(api_key0)
          .then(response => response.json())
          .then(data => {
            if (data.continue === 1) {
              fetchData(); // 再帰的にリクエストを行う
            } else {
              for (const key in data.books) {
                const lib_key_data0 = data.books[key][system_id]["libkey"];
                console.log(lib_key_data0)
                var lib_key_data0_str = JSON.stringify(lib_key_data0); //data0のlibkey（貸出状況）をjson形式→文字列
                // var title_data0_str = JSON.stringify(title_data0); //data0のタイトルをjson形式→文字列
                document.getElementById("title_data0").innerHTML = title_data0; //data0のタイトルをHTMLに表示
                // 「一冊目」とHTMLに表示
                document.getElementById("data0").innerHTML = "一冊目";
                // 本の表紙をHTMLに表示
              //トライ３
                // $.ajax({
                //   type: "GET",
                //   url: googleUrl,
                //   dataType: "json"
                //  }).done(function(json){
                //   var thumb = json.items[0].volumeInfo.imageLinks.thumbnail;
                //   console.log(thumb);
                //   if(thumb){
                //    $("#bookImage").empty();
                //    $("#bookImage").prepend("<img src='" + thumb + "'/>");
                //   };
                //  });
                //   if(thumbnail_data0){
                //     $("#bookImage").empty();
                //     $("#bookImage").prepend("<img src='" + thumbnail_data0_str + "'/>");       
                //   }
              //完成ver
                var img_scr = "<img src='" + thumbnail_data0 + "'/>";
                document.getElementById("image_area_data0").innerHTML = img_scr;
              //トライ２ 成功！　constだとだめでvarだといけた
                // var id = document.getElementById("image_area_data0");
                // id.insertAdjacentHTML("afterbegin","<img src='" + thumbnail_data0 + "'/>");    
              //トライ１  
                // let img_data0 = document.createElement('img');
                // img_data0.src =thumbnail_data0_str; //画像パス
                // img_data0.src = "http://books.google.com/books/content?id=Bx47PgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
                // img_data0.alt = "本の表紙"; // 代替テキスト
                // img_data0.width = 200; // 横サイズ（px）
                // img_data0.height = 200; // 縦サイズ（px）
                // 指定した要素にimg要素を挿入
                // let image_area_data0 = document.getElementById("image_area_data0");
                // image_area_data0.appendChild(img_data0);
                // 貸出状況をHTMLに表示
                document.getElementById("lending_status_data0").innerHTML = lib_key_data0_str;
              }
              // continueが0になった時の処理  data0のlibkey（貸出状況）を取得
            }
          })
          .catch(error => {
            console.log('エラーが発生しました', error);
          });
      };

      fetchData(); // 初回のリクエスト

      ////
      // fetch(api_key1)
      //   .then(response => response.text())
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(error => {
      //     console.log('エラーが発生しました', error);
      //   });

      // fetch(api_key2)
      //   .then(response => response.text())
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(error => {
      //     console.log('エラーが発生しました', error);
      //   });
    })
    .catch(error => {
      console.log("エラーが発生しました", error);
    });
};

//著者、出版年月日、
//見た目整える
//筑波大学図書館の方もできそうなら同時に表示させる
//三冊以上も表示する
//それぞれの図書館のウェブサイトでのURLを表示