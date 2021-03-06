var $ = require("jquery");


function validateLoginUser(param){
    return $.ajax({
        url : "/api/auth/login",
        type : "GET",
        dataType : "JSON",
        data:{
            user_name : param.user_name,
            password : param.password
        }
    });
}

function addUserwithLogOn (body){
    return $.ajax({
       url : "/api/auth/logon",
       type : "POST",
       dataType : "JSON",
       contentType : "application/json",
       data : JSON.stringify(body)
    });
}

function fetchUserInfo (){
    return $.ajax({
        url : "/api/auth/fetchUser",
        type : "GET",
        dataType : "JSON"
    });
}

module.exports = {
    validateLoginUser : validateLoginUser,
    addUserwithLogOn : addUserwithLogOn,
    fetchUserInfo : fetchUserInfo
}