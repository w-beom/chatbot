const Runnable = java.lang.Runnable;
const Executors = java.util.concurrent.Executors;
const TimeUnit = java.util.concurrent.TimeUnit;
const Calendar = java.util.Calendar;

let timer = null;
var old = "";

var welkeeps = "http://www.welkeepsmall.com/shop/shopdetail.html?branduid=1007205&xcode=023&mcode=001&scode=&type=X&sort=manual&cur_code=023&GfDT=bmt%2BW10%3D"
var welkeepsbefore = org.jsoup.Jsoup.connect(welkeeps).get();



function response(room, msg, sender, isGroupChat, replier, ImageDB) {

    if (sender == "범" && msg == "!배터리") {
        var battery = Device.getBatteryLevel();
        replier.reply(battery + "% 남았습니다.")
    }

    //경북대 학식 가져오기
    if (msg == "ㄱㅂ") {
        try {
            var calendar = Calendar.getInstance();
            var DOW = calendar.get(Calendar.DAY_OF_WEEK) - 2;
            var htmlData = org.jsoup.Jsoup.connect("https://coop.knu.ac.kr/sub03/sub01_01.html?shop_sqno=85").get();
            var jungsik = htmlData.select("table tr td").get(DOW).select("ul li p").get(0).text();
            var sucksik = htmlData.select("#print").select("tbody tr").get(1).select("ul li p").get(DOW).text().replace(/ /g, "\n")
            replier.reply("중식-----------------\n" + jungsik.replace(/ /g, "\n") + "\n석식-----------------\n" + sucksik);
        } catch (e) {
            replier.reply("불러올 수 없습니다.")
        }

    }

    if (msg.includes("ㄴㅆ")) {
        try {
            var msgWeather = msg.substring(msg.lastIndexOf("ㄴㅆ") + 2).trim();
            var html = org.jsoup.Jsoup.connect(
                    "https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=" + msgWeather + "+날씨")
                .get();
            var location = weatherChk(".btn_select", 0);
            var todayTemp = weatherChk(".todaytemp", 0);
            var cast_txt = weatherChk(".cast_txt", 0);
            var minTemp = weatherChk(".min .num", 0);
            var maxTemp = weatherChk(".max .num", 0);
            var sensible = weatherChk(".sensible .num", 0);
            var indicator = weatherChk(".lv1", 0);
            var lv2 = weatherChk(".lv2 .num", 0);
            var lv3 = finedust();
            var lv1 = weatherChk(".lv1 .num", 0);

            replier.reply(location + "\n현재 " + todayTemp + "도\n" + cast_txt + "\n" + minTemp + "도/" + maxTemp + "도\n체감온도 " + sensible + "도\n자외선수치 " + indicator + "\n미세먼지 " + lv2 + "\n초미세먼지 " + lv3 + "\n오존지수 " + lv1);
        } catch (e) {
            replier.reply(e);
        }
    }


    //날씨체크
    function weatherChk(check, num) {
        try {
            var html = org.jsoup.Jsoup.connect(
                    "https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=" + msgWeather + "+날씨")
                .get();
            var str = html.select(check).get(num).text();
        } catch (e) {
            return "x";

        }
        return str;
    }

    //미세먼지 가져오기
    function finedust() {
        try {
            var html = org.jsoup.Jsoup.connect(
                    "https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=" + msgWeather + "+날씨")
                .get();
            var dust = html.select(".indicator dt").get(1).select("a").attr("href");
            var dustHtml = "https://search.naver.com/search.naver" + dust;
            var lastHtml = org.jsoup.Jsoup.connect(dustHtml).get();
            var str = lastHtml.select(".main_figure").get(0).text();
        } catch (e) {
            return "x";
        }
        return str;
    }

    //우한폐렴 국내확진환자
    if (msg == "!우한") {
        var html = org.jsoup.Jsoup.connect("http://ncov.mohw.go.kr/bdBoardList.do").get();
        var select = html.select(".s_title_in2").get(0).text();
        var select2 = html.select(".s_descript").get(0).text();
        var select3 = html.select(".s_listin_dot").get(0).text();
        replier.reply(select + "\n" + select2 + "\n" + select3);
    }

    if (sender == "효경" && msg == "효겨엉") {
        replier.reply("사랑해~");
    }



    //워크맨 알림
    /*if (room == "특문메하") {
        var doc = org.jsoup.Jsoup.connect("https://www.youtube.com/user/skswhdkgo/videos").get()
        var A = doc.select("h3[class='yt-lockup-title ']").get(0).text()
        var B = doc.select("div[class='yt-lockup-content']").get(0).toString().split("href=\"/watch?v=")[1].split("\"")[0]
        var talk = "🎉(채널 이름)채널에 새로운 영상이 올라왔어요!\n" + A.split("- 길이:")[0].trim() + "\n\n바로가기 링크에요!\nhttps://m.youtube.com/watch?v=" + B
        if (talk != old) {
            replier.reply(talk);
            old = talk;
        }
    }*/

    /*   if (msg == "테스트") {
           while (true) {
               var after = org.jsoup.Jsoup.connect("https://cafe.naver.com/ArticleList.nhn?search.clubid=16996348&search.boardtype=L").get();
               var a = before.select(".article-board").get(1).select(".article").get(0).text();
               var b = after.select(".article-board").get(1).select(".article").get(0).text();
               replier.reply("before \n" + a);
               replier.reply("after \n" + b);
               if (a != b) {
                   var url = "https://cafe.naver.com/dokchi?iframe_url=";
                   var link = after.select(".article-board").get(1).select(".article").get(0).attr("href");

                   replier.reply("새 글이 올라왔습니다.\n" + url + link);
                   before = after;
               }
               java.lang.Thread.sleep(5000);

           }
       }*/

    /*if (sender == "범" && msg == "마스크") {
        while (true) {
            var welkeppsafter = org.jsoup.Jsoup.connect(welkeeps).get();
            var a = welkeepsbefore.select(".prd-btns").get(0).text();
            var b = welkeppsafter.select(".prd-btns").get(0).text();
            replier.reply("before \n" + a);
            replier.reply("after \n" + b);
            if (a != b) {
                replier.reply("마스크가 입고 되었습니다.\n" + welkeeps);
                welkeepsbefore = welkeppsafter;
            }
            java.lang.Thread.sleep(60000);

        }
    }*/

    /*if (msg == "테스트2") {
        var test = org.jsoup.Jsoup.connect("https://cafe.naver.com/ArticleList.nhn?search.clubid=16996348&search.boardtype=L").get();
        var test2 = test.select(".article-board").get(1).select(".article").get(0).text();
        replier.reply(test2);
    }*/

    //성준 논문 DDAY
    if (msg == "ㄴㅁ") {
        var today = Calendar.getInstance();
        var dday = Calendar.getInstance();
        dday.set(2020, 2, 17);

        var l_dday = dday.getTimeInMillis() / (24 * 60 * 60 * 1000);
        var l_today = today.getTimeInMillis() / (24 * 60 * 60 * 1000);

        var substract = l_dday - l_today;
        replier.reply("성준이의 논문 마감일까지 " + Math.floor(substract) + "일 남았습니다.");
    }
    //운선 퇴사일
    if (msg == "ㅌㅅ") {
        var today = Calendar.getInstance();
        var dday = Calendar.getInstance();
        dday.set(2021, 6, 1);

        var l_dday = dday.getTimeInMillis() / (24 * 60 * 60 * 1000);
        var l_today = today.getTimeInMillis() / (24 * 60 * 60 * 1000);

        var substract = l_dday - l_today;
        replier.reply("운선이의 퇴사일까지 " + Math.floor(substract) + "일 남았습니다.");
    }

    //마리의 비밀상점

    if (msg == "!마리") {
        var doc = org.jsoup.Jsoup.connect("https://lostark.game.onstove.com/Shop/Mari").get();
        var a = new Array();
        var b = new Array();
        var c = "";
        for (var i = 0; i < 6; i++) {
            a[i] = doc.select(".item-name").get(i).text();
            b[i] = doc.select(".amount").get(i).text();
            c += a[i] + " 💎 " + b[i] + "\n";
        }
        replier.reply(c);

    }

    //마스크 검색

    if (msg.includes('/마스크 ')) {
        var address = msg.split('/마스크 ')[1];
        var doc = org.jsoup.Jsoup.connect("https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json?address=" + address).header("content-type", "application/json;charset=UTF-8").ignoreContentType(true).get().text();
        var data = JSON.parse(doc);
        var chat = "";
        var remain = "";
        try {
            for (var i = 0; i < data.stores.length; i++) {
                if (data.stores[i].remain_stat == 'empty') {
                    remain = "없음";
                } else if (data.stores[i].remain_stat == 'few') {
                    remain = "2개이상 30개미만";
                } else if (data.stores[i].remain_stat == 'some') {
                    remain = "30개이상 100개미만";
                } else {
                    remain = "100개 이상";
                }
                chat = chat + "이름 : " +
                    data.stores[i].name + "\n주소 : " + data.stores[i].addr + "\n재고 : " + remain + "\n데이터 생성 일자 : " + data.stores[i].stock_at + "\n\n";

            }
        } catch (e) {

        }
        if (data.count == '0') {
            replier.reply("주소를 올바르게 입력해주세요.\n예) '서울특별시 강남구' or '서울특별시 강남구 논현동'\n('서울특별시' 와 같이 '시' 단위만 입력하는 것은 불가능합니다.)");
            }
            else {
                replier.reply(chat);
            }


        }

    }
