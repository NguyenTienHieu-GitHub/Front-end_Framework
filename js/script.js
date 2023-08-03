var app = angular.module("myapp", ["ngRoute"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "home.html",
      controller: "homeCtrl",
    })
    .when("/shopSingle", {
      templateUrl: "shop-single.html",
      controller: "shopSingleCtrl",
    })
    .when("/shop", {
      templateUrl: "shop.html",
      controller: "shopCtrl",
    })
    .when("/shopingCart", {
      templateUrl: "shoping-cart.html",
      controller: "shopingCartCtrl",
    })
    .otherwise({
      // template: "<h1>404 - Không tìm thấy trang</h1>",
      redirectTo: "/home",
    });
});

app.controller("myctrl", function ($scope, $http) {
  //
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
  //search
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
});

app.controller("homeCtrl", [
  "$scope",
  function ($scope) {
    // Controller logic for homeCtrl
  },
]);

app.controller("shopSingleCtrl", [
  "$scope",
  "$routeParams",
  function ($scope, $routeParams) {
    var id = $routeParams.id;
    // Controller logic for shopSingleCtrl using the 'id' parameter
  },
]);

app.controller("shopCtrl", [
  "$scope",
  function ($scope, $http) {
    // Controller logic for shopCtrl
  },
]);

app.controller("shoppingCartCtrl", [
  "$scope",
  function ($scope) {
    // Controller logic for shoppingCartCtrl
  },
]);
