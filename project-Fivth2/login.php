<?php
header('Access-Control-Allow-Origin: *');
header("Content-Type:text/html; charset=utf8");

//先获取客户端提交的参数
$username = $_POST["username"];
$password=$_POST["password"];

class  Res{
    public  $status;
    public $msg;
}
 //链接数据库
$conn=new mysqli("127.0.0.1","root","","fivth") or die("连接失败");
$sql="select * from dwdd where username='$username'and password='$password'";
$result=$conn->query($sql);
if($result&&$result->num_rows>0){
    //登录成功
    $res = new Res();
    $res->status=1;
    $res->msg="登录成功";
    echo json_encode($res);
    
}
else{
    //登录失败
    $res = new Res();
    $res->status=0;
    $res->msg="登录失败";
    echo json_encode($res);
}
$conn->close();


















?>