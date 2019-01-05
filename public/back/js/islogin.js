

$.ajax({
    url:" /employee/checkRootLogin",
    dataType:"json",
    type:"get",
    success:function( res ){
        // console.log(res);
       if(res.error === 400){
        location.href = "login.html";
       }   
       if(res.success){
           console.log("当前用户已登录");
           
       }
    }
})

