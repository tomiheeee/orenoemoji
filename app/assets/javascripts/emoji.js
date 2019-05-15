$(document).on('turbolinks:load', function(){ //リロードしなくてもjsが動くようにする
  $(document).on('keyup', '#form', function(e){ //このアプリケーション(document)の、formというid('#form')で、キーボードが押され指が離れた瞬間(.on('keyup'...))、eという引数を取って以下のことをしなさい(function(e))
    e.preventDefault(); //キャンセル可能なイベントをキャンセル
    var input = $.trim($(this).val()); //この要素に入力された語句を取得し($(this).val())、前後の不要な空白を取り除いた($.trim(...);)上でinputという変数に(var input =)代入
    $.ajax({ //ajax通信で以下のことを行います
      url: '/emojis/search', //urlを指定
      type: 'GET', //メソッドを指定
      data: ('keyword=' + input), //コントローラーに渡すデータを'keyword=input(入力された文字のことですね)'にするように指定
      processData: false, //おまじない
      contentType: false, //おまじない
      dataType: 'json' //データ形式を指定
    })
    .done(function(data){ //データを受け取ることに成功したら、dataを引数に取って以下のことする(dataには@usersが入っている状態ですね)
      $('#result').find('li').remove();  //idがresultの子要素のliを削除する
      $(data).each(function(i, emoji){ //dataをuserという変数に代入して、以下のことを繰り返し行う(単純なeach文ですね)
        $('#result').append('<li>' + emoji.name + '<%= image_tag emoji.image.url %> </li>') //resultというidの要素に対して、<li>ユーザーの名前</li>を追加する。
  });
});
  });
});
