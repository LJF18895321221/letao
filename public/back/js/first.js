
$(function(){

    //声明全局变量,用于记录当前页和当前页的数据
    var currentPage = 1;
    var pageSize = 5;

    //功能1 : 发送ajax 请求 获取数据 进行渲染页面
    render()
    function render(){
            $.ajax({
                url:"/category/queryTopCategoryPaging",
                type:"get",
                dataType:"json",
                data:{
                    page:currentPage,
                    pageSize:pageSize,
                },
                success:function( res){
                    // console.log(res);
                    
                    var htmlStr = template("first",res);
                    $("tbody").html(htmlStr);

                    // 处理分页问题
                    $('#paginator').bootstrapPaginator({
                        // 版本号
                        bootstrapMajorVersion: 3,
                        // 当前页
                        currentPage: res.page,
                        // 总页数
                        totalPages:Math.ceil( res.total /res.size),
                        // 注册页码点击事件
                        onPageClicked: function( a, b, c, page ) {
                            // 更新当前页
                            currentPage = page;
                            // 重新渲染当前页
                            render();

                        }
                    })
                }

            })
  }

    //功能2 :点击按钮,显示模态框
        $(".btn-add").on("click",function(){
            // 显示模态框
            $("#addModal").modal("show");
        })

    //功能3 : 表单验证功能
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
                           message:"请输入一级分类名称"
                       }
                    }
                }
            }
    })
    //功能4 : 点击添加按钮,发送ajax 请求
    $("#form").on("success.form.bv",function( e ){
        // 阻止 submit 按钮的默认提交功能
        e.preventDefault();
        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            dataType:"json",
            data: $('#form').serialize(),
            success:function( res ){
                console.log(res);
                if(res.success){
                    // 关闭模态框
                    $("#addModal").modal("hide");
                    // 返回第一页
                    currentPage = 1;
                    // 重新渲染页面
                    render();
                }

            }
        })



    })








})