<?php
session_start();
if(isset($_SESSION['usuario_id'])){
    header("Location: src/app/dashboard.php");
}else{
    header("Location: src/app/components/login/login.html");
}
exit;
?>