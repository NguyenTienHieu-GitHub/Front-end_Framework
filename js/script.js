var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "home.html?" + Math.random(),
      controller: "homeCtrl",
    })
    .when("/shopSingle", {
      templateUrl: "shop-single.html?" + Math.random(),
      controller: "shopSingleCtrl",
    })
    .when("/shop", {
      templateUrl: "shop.html?" + Math.random(),
      controller: "shopCtrl",
    })
    .when("/login", {
      templateUrl: "login.html?" + Math.random(),
      controller: "loginCtrl",
    })
    .when("/shopingCart", {
      templateUrl: "shoping-cart.html?" + Math.random(),
      controller: "shopingCartCtrl",
    })
    .otherwise({
      // template: "<h1>404 - Không tìm thấy trang</h1>",
      redirectTo: "/home",
    });
});

app.controller('homeCtrl', function ($scope,) {

});
app.controller('shopSingleCtrl', function ($scope,) {

});
app.controller('shopCtrl', function ($scope,) {
  var gioiHan=6;  
  $scope.phanTrang ={
       gioiHan:gioiHan,
      sotrang: Math.ceil($scope.sanPham.length /gioiHan),
      dangChon: 1,
    };
});
app.controller('loginCtrl', function ($scope,) {

});
app.controller('shopingCartCtrl', function ($scope,) {

});

app.controller("myctrl", function ($scope, $http) {
  $scope.gioHang = [];
  $scope.sanPham = [];
  $http.get("./js/data.json").then(function (sanPham) {
    $scope.sanPham = sanPham.data;
  });
  $scope.themGioHang = function (sanPham) {
    //Cách 1: JS Nâng cao
    if ($scope.gioHang.filter((i) => i.id == sanPham.id).length == 0) {
      //TH1: nếu chưa có sản phẩm đó thì thêm vào mảng gioHang[]
      sanPham.soluong = 1;
      $scope.gioHang.push(sanPham);
    } else {
      //TH2: Nếu đã có sản phẩm đó thì tăng số lượng lên
      $scope.gioHang.filter((i) => i.id == sanPham.id).soluong++;
    }
    console.log($scope.gia);
  };
  $scope.tinhSoLuong = function () {
    var sum = 0;
    for (sp of $scope.gioHang) {
      sum += sp.soluong;
    }
    console.log($scope.gioHang);
    return sum;
  };
  $scope.tinhTongThanhTien = function () {
    var sum = 0;
    for (sp of $scope.gioHang) {
      sum += sp.soluong * sp.gia;
    }
    return sum;
  };
  $scope.xoaSanPham = function (sanPham) {
    var index = $scope.gioHang.indexOf(sanPham);
    if (index !== -1) {
      $scope.gioHang.splice(index, 1);
    }
  };
  /*
  //Cách 2 JS Cơ bản

  var daCoSP = true;
  var iSP = 0;

  for (sp of $scope.gioHang) {
    if (sp.id == sanPham.id) {
      daCoSP = true;
      break;
    }
    if (!daCoSP) {
      sanPham.soluong = 1;
      $scope.gioHang.push(sanPham);
    }
    else {
      $scope.gioHang[iSP].soluong++;
    }
  }
  */
  $scope.keyword = "";
  $http.get("./js/data.json").then(
    function (res) {
      //Chạy đúng
      $scope.sanPham = res.data;
    },
    function (res) {
      //BỊ lối
      console.log(res);
    }
  );
});