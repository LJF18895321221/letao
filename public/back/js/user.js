


$(function() {
  var id; //声明一个全局变量id 用于存储点击时的按钮ID
  var isDelete; //按钮状态
  //声明全局变量用来记录当前页和当前页的条数
  var currentPage = 1;
  var pageSize = 5;
  //一进入页面就开始渲染
  render();
  function render() {
    //发送 ajax 请求
    $.ajax({
      url: "/user/queryUser",
      type: "get",
      dataType: "json",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function(res) {
        // console.log(res);
        var htmlStr = template("user", res);
        $("tbody").html(htmlStr);

        //分页初始化
        $("#paginator").bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          //当前页
          currentPage: res.page,
          //总页数
          totalPages: Math.ceil(res.total / res.size),

          //添加页码点击事件
          onPageClicked: function(a, b, c, page) {
            //更新到当前页
            currentPage = page;
            // 重新渲染页面
            render();
          }
        });
      }
    });
  }

  //功能2 : 给按钮注册点击事件
  $("tbody").on("click", ".btn", function() {
    //点击的时候显示模态框
    $("#userModal").modal("show");
    //获取点击时的按钮的id
    id = $(this).parent().data("id");
    // console.log(id);
    //改变用户转状态
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    // console.log(isDelete);
    
  });
  //点击确定按钮,发送ajax请求
  $("#submitBtn").on("click", function() {
    $.ajax({
      url: "/user/updateUser",
      type: "post",
      dataType: "json",
      data: {
        id:id,
        isDelete:isDelete
      },
      success: function(res) {
        console.log(res);
        if (res.success) {
          // 关闭模态框
          $("#userModal").modal("hide");
          // 重新渲染页面
          render();
        }
      }
    });
  });
});
