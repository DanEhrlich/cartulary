<?include get_cfg_var("cartulary_conf").'/includes/env.php';?>
<?include "$confroot/$templates/php_cgi_init.php"?>
<?
// Json header
header("Cache-control: no-cache, must-revalidate");
header("Content-Type: application/json");
$jsondata = array();


//Get all the users in the system
$posts = get_blog_posts($g_uid);


//--------------------------------------------------------------------------------
//Give feedback that all went well
$jsondata['data']['posts'] = $posts;
$jsondata['status'] = "true";
$jsondata['description'] = "List of posts.";
echo json_encode($jsondata);

return(0);

?>

