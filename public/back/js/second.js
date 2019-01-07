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

    //获取ID 值 赋值给隐藏域,用于提交
    var Id = $(this).data("id");
    // console.log(Id);
    // 赋值给隐藏域
    $('[name="categoryId"]').val(Id);
    // 改变图片验证状态
    $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
    
  });

  //功能 4 ：表单验证
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，
    excluded: [],
    // 配置图标
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok", // 校验成功
      invalid: "glyphicon glyphicon-remove", // 校验失败
      validating: "glyphicon glyphicon-refresh" // 校验中
    },
    // 字段校验
    fields: {
      brandName: {
        // 规则
        validators: {
          notEmpty: {
            message: "请输入二级分类名称"
          }
        }
      },
      categoryId: {
        // 规则
        validators: {
          notEmpty: {
            message: "请选择一级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请上传图片"
          }
        }
      }
    }
  });

  //功能 5 :表单成功验证
  $('#form').on("success.form.bv",function( e ){
      e.preventDefault();

      //通过ajax 发送请求

      $.ajax({
        url:"/category/addSecondCategory",
        type:"post",
        data: $('#form').serialize(),
        dataType:"json",
        success:function( res ){
          console.log(res);
          if(res.success){
            // 重新渲染第一页
            currentPage:1;
            // 关闭模态框
            $("#addModal").modal("hide");

            // 重置表单状态
            $("#form").data("bootstrapValidator").resetForm(true);

            // 手动重置下拉菜单
            $(".Text").text("请选择一级分类");
            // 手动重置图片状态
            $("#Box img").attr("src","../images/none.png")
          }
        }
      })
  })

  //功能 6 : 图片预览
  $("#fileupload").fileupload({
    dataType: "json",
    // 文件上传完成的回调函数
    done: function(e, data) {
      console.log(data);
      var picUrl = data.result.picAddr; // 获取地址
      console.log(picUrl);
      
      $("#Box img").attr("src", picUrl);
      // 将获取到的地址赋值给隐藏域
      $('[name="brandLogo"]').val(picUrl);
      // 修改图片状态
      $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");

    }
  });
});
