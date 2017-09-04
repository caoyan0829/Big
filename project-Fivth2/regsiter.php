<?php
//支持跨域
header('Access-Control-Allow-Origin: *');
header("Content-Type:text/html; charset=utf8");
//接受客户端的参数
$username= $_POST["username"];            //右边的参数应与请求的  html文件参数一致 76行
$password= $_POST["password"];
//$age=$_POST["age"];
class  Res{
    public  $status;
    public $msg;
}




//把数据插入数据库中，链接数据库
$conn=new mysqli("127.0.0.1","root","","fivth") or die("连接失败");
//判断用户是否已经存在
$sql="select * from dwdd where username='$username'";
$result=$conn->query($sql);
if($result&&$result->num_rows>0){
    //存在相同用户
    $res = new Res();
    $res->status=0;
    $res->msg="该用户已存在";
    echo json_encode($res);
}else{
    //不存在相同用户，可以注册
    
    //插入数据
    $sql ="insert into dwdd(username,password) values('$username','$password')";   //前面的usermane 为数据库表中的定义变量。 后面的为上面定义的$username
    $result =$conn ->query($sql);//$conn->query($sql2);
    if($result){
       //echo "注册成功！";
        $res = new Res();
        $res->status = 1;
        $res->msg = "恭喜您， 注册成功!";
        echo  json_encode($res);
    }
    else{
         //echo "注册失败！";
        $res = new Res();
        $res->status = 2;
        $res->msg = "很抱歉， 注册失败!";
        echo  json_encode($res);
    }
}

$conn->close();























?>