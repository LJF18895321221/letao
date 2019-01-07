$(function() {
  // 一进入页面就发送请求进行页面的渲染

  var currentPage = 1;
  var pageSize = 5;
  render();
  //功能 1 :发送ajax 请求 进行页面的渲染
  function render() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      dataType: "json",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function(res) {
        console.log(res);
        var htmlStr = template("second", res);
        $("tbody").html(htmlStr);

        //分页管理
        $("#paginator").bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: res.page,
          // 总页数
          totalPages: Math.ceil(res.total / res.size),
          // 添加页码点击事件
          onPageClicked: function(a, b, c, page) {
            currentPage = page;
            //渲染页面
            render();
          }
        });
      }
    });
  }

  // 功能 2 :点击添加按钮 显示模态框,并立即发送请求 渲染一级分类
  $(".btn-add").on("click", function() {
    // 显示模态框
    $("#addModal").modal("show");

    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      dataType: "json",
      data: {
        page: 1,
        pageSize: 50
      },
      success: function(res) {
        var htmlStr = template("dropdownTpl", res);
        $(".dropdown-menu").html(htmlStr);
      }
    });
  });

  // 功能3 :给下拉菜单里面的所有的 a 注册点击事件 并赋值给 button
  $(".dropdown-menu").on("click", "a", function() {
    //获取文本内容
    // console.log(this);
    var txt = $(this).text();
    // 将获取到的内容设置给按钮
    $(".Text").text(txt);
  });

  //功能 4 ：表单验证
    $("#form").bootstrapValidator({
        // 配置图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',   // 校验失败
            validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
        // 字段校验
        fields: {
            categoryName:{
                // 规则
                validators:{
                notEmpty:{
                    message:"请输入二级分类名称"
                }
                }
            }
        }
    })
    
    //功能 5 : 图片预览
    $('#fileupload').fileupload({
        dataType: "json",
        // 文件上传完成的回调函数
        done: function( e, data ) {
          console.log( data );
          var picUrl = data.result.picAddr; // 获取地址
          $('#Box img').attr("src", picUrl);
        }
      })
});
