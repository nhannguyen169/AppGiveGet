it('trao doi phan tu trong mang',() =>{
    function shuffle(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
    function result(){
      var arr = [1,2,5];
      shuffle(arr);
      if(arr[0] != 1 || arr[1] != 2 || arr[2] != 5){
        return true;
      }else{
        return false;
      }
     
    }
    expect(true).toEqual(result())
});

it('kiểm tra lưu rating người dùng',() =>{
  function rating(giveUserID,rate){
    var rating;
    var numUserRate;
    var listAllUser= [
      {
        userID : 'u01',
        fullname: 'nhan',
        khoa:'khoa1',
        rating: 0,
        numUserRate : 0
      },
      {
        userID : 'u02',
        fullname: 'vi',
        khoa:'khoa2',
        rating : 3,
        numUserRate : 1
      }
    ];
    for(var i=0;i<listAllUser.length;i++){
      if(listAllUser[i].userID == giveUserID){
        if(listAllUser[i].rating == 0){
          rating = rate;
        }else if(listAllUser[i].rating > 0){
          rating = (listAllUser[i].rating + rate) /2;
        }
        numUserRate = listAllUser[i].numUserRate + 1;
      }
    }
    
    return rating+""+numUserRate;
  }

  expect('41').toEqual(rating('u01',4))
  expect('22').toEqual(rating('u02',1))
});
describe('Trang chủ', () =>{
  //unit test tìm kiếm sản phẩm
  it('kiểm tra tìm kiếm sản phẩm',()=>{
    var products = [
      {
        tensp : 'p1'
      },
      {
        tensp : 'p2'
      }
    ]
    function searchProduct(input: any) {
      let serVal = input;
      if (serVal && serVal.trim() != '') {
        products = products.filter((result) => {
          return (String(result.tensp).toLowerCase().indexOf(serVal.toLowerCase()) > -1);
        })
      }
    }
    function result(){
      searchProduct("p2");
      return products[0].tensp;
    }
    expect('p2').toEqual(result())
  });
});
describe('Trang chi tiết sản phẩm', () => {
    //unit-test kiểm tra người dùng có đăng ký
    it('kiểm tra người dùng có đăng ký',() =>{ 
        function checkUserSubmitOrGive(userID,productID){
            var checkGet;
            var checkGive;
            var userSubmit = [
                {
                    user: 'u01'
                }
            ];
            var products = [
                {
                    id:'p01',
                    user: 'u03'
                }
            ];
            if(userSubmit.length > 0){
              for(var i =0;i<userSubmit.length;i++){   
                if(userSubmit[i].user == userID){
                  return "Đã đăng ký nhận";
                }else{
                  checkGet = false;
                }
              }
            }else{
              checkGet = false;
            }
            for(var i =0;i<products.length;i++){   
              if(products[i].id == productID){
                if(products[i].user == userID){
                  return "Bài đăng này là của bạn";
                }else{
                  checkGive = false;
                }
              }
            }
            if(checkGive == false && checkGet == false){
              return "Đăng ký nhận";
            }
        }
        expect("Đã đăng ký nhận").toEqual(checkUserSubmitOrGive('u01','p01'));
        expect("Bài đăng này là của bạn").toEqual(checkUserSubmitOrGive('u03','p01'));
        expect("Đăng ký nhận").toEqual(checkUserSubmitOrGive('u04','p01'));
    });
});

describe('Trang danh sách đang giao dịch', () => { 
    //unit-test kiểm tra random người có tỉ lệ trúng cao nhất
    it('kiểm tra random user theo tỉ lệ',() =>{  
        function randomChooseUser(){
            var listRandomUser = [
                {
                    userId : 'u02',
                    ratioRandom : 2
                },
                {
                    userId : 'u02',
                    ratioRandom : 5
                },
                {
                    userId : 'u02',
                    ratioRandom : 3
                }
            ]
            listRandomUser.sort((a, b) => (a.ratioRandom > b.ratioRandom) ? 1 : -1)
            for(var i =0;i<this.listRandomUser.length;i++){
              if(i == this.listRandomUser.length - 1){
                return this.listRandomUser[i].userId;
              }
            }

            expect('u02').toEqual(randomChooseUser());
        }
    });

    //unit test kiểm tra các trạng thái giao dịch nhận
    it('kiểm tra các trạng thái giao dịch nhận',() =>{
      function statusGive(productid,fieldConfirm){
        var fieldChosen = 'Chưa có người đăng ký';
        var hasUserConfirm = false;
        var hasRated = false;
        var hasChosen = false;
        var confirmDone = false;
        var giverConfirmDone = false;
        var btn;
        var listUserSubmit = [
          {
          id : 'p01',
          user : 'u01',
          hasChosen : true
          },
          {
            id : 'p02',
            user : 'u02',
            hasChosen : false
          }
        ];
        var listAllUser= [
          {
            userID : 'u01'
          },
          {
            userID : 'u02'
          }
        ];
        for(var j =0;j<listUserSubmit.length;j++){
          for(var i =0;i<listAllUser.length;i++){
            if(listUserSubmit[j].id == productid){
              if(listUserSubmit[j].user == listAllUser[i].userID && listUserSubmit[j].hasChosen == true){
                hasChosen = true;
                fieldChosen = 'Người được nhận là';
                if(fieldConfirm == "Người nhận đã xác nhận Người cho đã xác nhận"){
                  confirmDone = true;
                }else if(fieldConfirm =="Người nhận chưa xác nhận Người cho đã xác nhận"){
                  giverConfirmDone = true;
                }
                hasUserConfirm = true;
              }else if(listUserSubmit[j].user == listAllUser[i].userID && listUserSubmit[j].hasChosen != true && hasChosen == false){
                fieldChosen = 'Chưa có người được nhận';
              }
            }
          }
        }
        if(confirmDone == true && hasUserConfirm == true && hasRated == false){
          btn = "Đợi người dùng đánh giá";
        }else if(giverConfirmDone == true && confirmDone == false && hasUserConfirm == true){
          btn = "Đóng";
        }else if(giverConfirmDone == false && confirmDone == false && hasUserConfirm == true){
          btn = "Xác nhận";
        }else if(hasUserConfirm == false){
          btn = "Đóng";
        }

        return fieldChosen+" "+btn;
      }

      expect('Người được nhận là Đợi người dùng đánh giá').toEqual(statusGive('p01','Người nhận đã xác nhận Người cho đã xác nhận'));
      expect('Người được nhận là Đóng').toEqual(statusGive('p01','Người nhận chưa xác nhận Người cho đã xác nhận'));
      expect('Chưa có người được nhận Đóng').toEqual(statusGive('p02','wrap'));
      expect('Chưa có người đăng ký Đóng').toEqual(statusGive('p03','wrap'));

    });

    //unit test kiểm tra các trạng thái giao dịch cho
    it('kiểm tra các trạng thái giao dịch cho',() =>{
      function statusGet(fieldConfirm){
        var confirmDone = false;
        var giverConfirmDone = false;
        var btn;
        if(fieldConfirm == "Người nhận đã xác nhận Người cho đã xác nhận"){
          confirmDone = true;
        }else if(fieldConfirm == "Người nhận đã xác nhận Người cho chưa xác nhận"){
          giverConfirmDone = true;
        }
        if(confirmDone == true){
          btn = "đánh giá";
        }else if(giverConfirmDone == true){
          btn = "đóng";
        }else{
          btn = "xác nhận"
        }
        return btn
      }
      expect('đánh giá').toEqual(statusGet('Người nhận đã xác nhận Người cho đã xác nhận'));
      expect('đóng').toEqual(statusGet('Người nhận đã xác nhận Người cho chưa xác nhận'));
      expect('xác nhận').toEqual(statusGet('wrap'));

    });
})
