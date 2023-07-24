window.onload = function(){
  document.getElementById('keyword').focus();
};
// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript(tab.ib, {
//     code: 'document.getElementById("keyword").focus();'
//   });
// });

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
      const imageLinks_data1 = data.items[1].volumeInfo.imageLinks;
      const imageLinks_data2 = data.items[2].volumeInfo.imageLinks;
      var author_data0 = data.items[0].volumeInfo.authors;
      var author_data1 = data.items[1].volumeInfo.authors;
      var author_data2 = data.items[2].volumeInfo.authors;
      var title_data0 = data.items[0].volumeInfo.title;
      var thumbnail_data0 = imageLinks_data0.thumbnail;
      var thumbnail_data1 = imageLinks_data1.thumbnail;
      var thumbnail_data2 = imageLinks_data2.thumbnail;
      const system_id_1 = "Ib2raki_Tsukuba"; //つくば市立図書館のシステムID
      const system_id_2 = "Univ_Tsukuba"; //筑波大学附属図書館のシステムID
      
      const api_key0_id_1 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data0 + "&systemid=" + system_id_1 + "&callback=no";
      const api_key0_id_2 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data0 + "&systemid=" + system_id_2 + "&callback=no";
      const api_key1_id_1 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data1 + "&systemid=Ibaraki_Tsukuba&callback=no";
      const api_key1_id_2 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data1 + "&systemid=Ibaraki_Tsukuba&callback=no";
      const api_key2_id_1 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data2 + "&systemid=Ibaraki_Tsukuba&callback=no";
      const api_key2_id_2 = "https://api.calil.jp/check?appkey={468b8efa42978747b9bca6d60a9c384d}&isbn=" + isbn10_data2 + "&systemid=Ibaraki_Tsukuba&callback=no";
      ////一番目のデータ(data0)についてデータの取得が完了するまで繰り返す////
      const fetchData0 = () => {
        //つくば市立図書館の蔵書検索
        fetch(api_key0_id_1)
          .then(response => response.json())
          .then(data => {
            if (data.continue === 1) {
              fetchData0(); // 再帰的にリクエストを行う
            } else {
              for (const key in data.books) {
                const lib_key_data0_id_1 = data.books[key][system_id_1]["libkey"];
                var lib_key_data0_str_id_1 = JSON.stringify(lib_key_data0_id_1); //data0のlibkey（貸出状況）をjson形式→文字列
                // const lib_key_data0_str_id_1_n_1 = Object.entries(lib_key_data0_str_id_1)[0];
                // console.log(lib_key_data0_str_id_1_n_1);
                // console.log(lib_key_data0_str_id_1[0]);
                console.log(lib_key_data0_id_1);
                console.log(lib_key_data0_str_id_1);
                console.log(author_data0);
                console.log(lib_key_data0_id_1);
                document.getElementById("title_data0").innerHTML = "タイトル:" + title_data0; //data0のタイトルをHTMLに表示
                // 「一冊目」とHTMLに表示
                //document.getElementById("data0").innerHTML = "一冊目";
                $('#data0>h1').html("一冊目");
                //本の著者を表示
                $("#author_area_data0").html("著者:" + author_data0);
                // $("#author_name_data0").html(author_data0);
                // 本の表紙をHTMLに表示
                var img_scr = "<img src='" + thumbnail_data0 + "'/>";
                document.getElementById("image_area_data0").innerHTML = img_scr;
                // 貸出状況をHTMLに表示
                document.getElementById("lending_status_data0_id_1").innerHTML = "<h3>蔵書状況</h3>つくば市立中央図書館<br>" + lib_key_data0_str_id_1;
              }
              // continueが0になった時の処理  data0のlibkey（貸出状況）を取得
            }
          })
          .catch(error => {
            console.log('エラーが発生しました', error);
          });

        //筑波大学中央図書館の蔵書検索
        fetch(api_key0_id_2)
        .then(response => response.json())
        .then(data => {
          if (data.continue === 1) {
            fetchData0(); // 再帰的にリクエストを行う
          } else {
            for (const key in data.books) {
              const lib_key_data0_id_2 = data.books[key][system_id_2]["libkey"];
              var lib_key_data0_str_id_2 = JSON.stringify(lib_key_data0_id_2); //data0のlibkey（貸出状況）をjson形式→文字列
              document.getElementById("lending_status_data0_id_2").innerHTML = "筑波大学附属中央図書館<br>" + lib_key_data0_str_id_2;
              
            }
            // data0のlibkey（貸出状況）を取得
            // continueが0になった時の処理  
          }
        })
        .catch(error => {
          console.log('エラーが発生しました', error);
        });        
      };


      //// data0に関する記述終了
      fetchData0(); // 初回のリクエスト

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
//検索履歴の保存
//パワポ作成する際に使ったAPIのURLを貼る