$(function() {
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */

  $("#form").bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok", // 校验成功
      invalid: "glyphicon glyphicon-remove", // 校验失败
      validating: "glyphicon glyphicon-refresh" // 校验中
    },
    fields: {
      username: {
        // 规则
        validators: {
          notEmpty: {
            message: "用户名不能为空"
          },
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须为 2 ~6 位"
          },
          callback: {
            // 专门用于配置回调的提示
            message: "用户名不存在"
          }
        }
      },
      password: {
        // 规则
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须为 6 ~12 位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });

  //   重置表单
  $(".btn-default").on("click", function() {
    $("#form").data("bootstrapValidator").resetForm(); //不传参只重置状态,不充值内容
  });

  //   表单成功验证
  $("#form").on("success.form.bv", function(e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url: "/employee/employeeLogin",
      dataType: "json",
      data: $("#form").serialize(),
      type: "post",
      success: function(res) {
        console.log(res);
        if (res.success) {
          location.href = "index.html";
          return;
        }
        if (res.error === 1000) {
          // 提示用户名不存在
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
          return;
        }
        if (res.error === 1001) {
          // 提示用户密码错误
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
          return;
        }
      }
    });
  });
});
