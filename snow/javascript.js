//ここに追加したいJavaScript、jQueryを記入してください。
//このJavaScriptファイルは、親テーマのJavaScriptファイルのあとに呼び出されます。
//JavaScriptやjQueryで親テーマのjavascript.jsに加えて関数を記入したい時に使用します。
///////////////////////////////////
// 折り畳み式アーカイブウィジェット
/////////////////////////////////
(function($) {
  $(function() {
    var wgts = $(".widget_archive");//アーカイブウィジェット全てを取得
    //アーカイブウィジェットを1つずつ処理する
    wgts.each(function(i, el) {
      wgt = $(el);

      //日付表示＋投稿数か
      var has_date_count = wgt.text().match(/\d+年\d+月\s\(\d+\)/);
      //日付表示だけか
      var has_date_only = wgt.text().match(/\d+年\d+月/) && !has_date_count;

      //日付表示されているとき（ドロップダウン表示でない時）
      if ( has_date_count || has_date_only ) {
        var
          clone = wgt.clone(),//アーカイブウィジェットの複製を作成
          year = [];
        //クローンはウィジェットが後に挿入。クローンはcssで非表示
        wgt.after(clone);
        clone.attr("class", "archive_clone").addClass('hide');

        var
          acv = wgt; //ウィジェット
          acvLi = acv.find("li"); //ウィジェット内のli全て
        //ul.yearsをアーカイブウィジェット直下に追加してそのDOMを取得
        var acv_years =  acv.append('<ul class="years"></ul>').find("ul.years");

        //liのテキストから年がどこからあるかを調べる
        acvLi.each(function(i) {
          var reg = /(\d+)年(\d+)月/;
          //日付表示＋投稿数か
          if ( has_date_count ) {
            reg = /(\d+)年(\d+)月\s\((\d+)\)/;
          }
          var dt = $(this).text().match(reg);
          year.push(dt[1]);

        });
        $.unique(year); //重複削除

        acvLi.unwrap(); //liの親のulを解除

        //投稿年があるだけ中にブロックを作る
        var
          yearCount = year.length,
          i = 0;
        while (i < yearCount) {
          acv_years.append("<li class='year_" + year[i] + "'><a class='year'>" + year[i] + "年</a><ul class='month'></ul></li>");
          i++;
        }

        //作ったブロック内のulに内容を整形して移動
        //オリジナルのクローンは順番に削除
        var j = 0;
        acvLi.each(function(i, el) {
          var reg = /(\d+)年(\d+)月/;
          //日付表示＋投稿数か
          if ( has_date_count ) {
            reg = /(\d+)年(\d+)月\s\((\d+)\)/;
          }
          var
            dt = $(this).text().match(reg),
            href = $(this).find("a").attr("href");

          //月の追加
          var rTxt = "<li><a href='" + href + "'>" + "" + dt[2] + "月</a>";
          //日付表示＋投稿数か
          if ( has_date_count ) {
            rTxt += " (" + dt[3] + ")" + "</li>"; //投稿数の追加
          }

          //作成した月のHTMLを追加、不要なものは削除
          if (year[j] === dt[1]) {
            acv_years.find(".year_" + year[j] + " ul").append(rTxt);
            $(this).remove();
          } else {
            j++;
            acv_years.find(".year_" + year[j] + " ul").append(rTxt);
            $(this).remove();
          }
        });

        //クローン要素を削除
        clone.remove();

        //直近の年以外は非表示
        acv.find("ul.years ul:not(:first)").addClass("hide");

        //年をクリックで展開
        acv.find("a.year").on("click", function() {
          $(this).next().toggleClass("hide");
        });
      }//if has_date_count || has_date_only
    });//wgts.each

  });

})(jQuery);
