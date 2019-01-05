$(document).ajaxStart(function() {
  // 开启进度条
  NProgress.start();
});
$(document).ajaxStop(function() {
  // 模拟网络延迟
  setTimeout(function() {
    // 结束进度条
    NProgress.done();
  }, 1000);
});
$(function() {
  //功能1.二级导航显示与隐藏
  $(".lt_slide .category").on("click", function() {
    $(this).next().stop().slideToggle();    
  });

  //功能2. 侧边栏的显示与隐藏

  $(".lt_right_slide .icon_menu").on("click", function() {
    $(".lt_slide").toggleClass("hidemenu");
    $(".lt_right_slide").toggleClass("hidemenu");
    $(".lt_right_slide .header").toggleClass("hidemenu");
  });
  //功能3. 退出功能
  $(".icon_logout").on("click", function() {
    $("#myModal").modal("show");
  });

  //功能4. 点击退出 发送ajax请求
  $(".btn-logout").on("click", function() {
    $.ajax({
      url: "/employee/employeeLogout",
      type: "get",
      dataType: "json",
      success: function(res) {
        console.log(res);
        // alert(111);
        if (res.success) {
          location.href = "login.html";
        }
      }
    });
  });
});
