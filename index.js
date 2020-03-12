function response(room, msg, sender, isGroupChat, replier, ImageDB) {

    
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
