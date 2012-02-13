<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Social Search - A Social Search Engine for Facebook &amp; Twitter</title>
    <meta content="Virendra Rajput" name="author">
    <meta content="A Social Search Engine for Facebook &amp; Twitter" name="description">
    <meta content="social search engine, social search, facebook search, twitter search" name="keywords">
    <link href="http://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet" type="text/css">
	<style>
	img {width: 20px; float: left; }
       .style3 {
        font-family: 'Shadows Into Light', serif;
		color:#E60000;
        font-size: 36px;
      }
	   .style2 {
        font-family: 'Shadows Into Light', serif;
        font-size: 14px;
      }
 .myInputbox{
	  font:bold 16px Shadows Into Light,arial,helvetica,sans-serif;
	  color:#666;
	  border:1px solid #c0c0c0;
	  border-right:none;
	  background:#ffffff !important;
	  background-image:linear-gradient(top, #fff, #efefef);
	  background-image:-moz-linear-gradient(top, #fff, #fff);
	  background-image:-webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff), to(#efefef));
	  filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#ffffff, endColorStr=#efefef);
	  height:1.9331em;
	  padding:0 0.5em;
	  cursor:normal;
	  width:450px;
	  white-space:nowrap;
	  overflow:visible; /* fixes width in IE7 */
	  outline:0 none /* removes focus outline in IE */
	  input::-moz-focus-inner {border:none} /* removes focus outline in FF */
	  -moz-border-radius: 0.1em;
	  border-radius: 0.1em;
	  -moz-box-shadow: 0 0 0.1em 0 #c0c0c0;
	  -webkit-box-shadow: 0 0 0.1em 0 #c0c0c0;
	  box-shadow: 0 0 0.1em 0 #c0c0c0;
  }
  .myButton{
	  font:normal 15px arial,helvetica,sans-serif;
	  color:#000;
	  border:1px solid #c0c0c0;
	  background-color:#f1f1f1;
	  background:url(bg.png) no-repeat;
	  filter:progid:DXImageTransform.Microsoft.Gradient(startColorStr=#ffffff, endColorStr=#efefef);
	  padding:0.4em 0.7em;
	  cursor:pointer;
	  white-space:nowrap;
	  overflow:visible; /* fixes width in IE7 */
	  outline:0 none /* removes focus outline in IE */
	  input::-moz-focus-inner {border:none} /* removes focus outline in FF */
	  -moz-border-radius: 0.1em;
	  border-radius: 0.1em;
	  -moz-box-shadow: 0 0 0.1em 0 #c0c0c0;
	  -webkit-box-shadow: 0 0 0.1em 0 #c0c0c0;
	  box-shadow: 0 0 0.1em 0 #c0c0c0;
	  position:relative;
	  left:-3px;
	  top:5px\9;
	  padding:5px 4px 7px 4px\9;
  }

</style>
  </head>
<body>
          <div align="center" style="margin-top:20px;">
		<form action="yql.php" method="post">
		<p class="style3"><strong>So.Search It!</strong> 
<input name="searchq" value="type here to start your search..." onFocus="if (this.value=='type here to start your search...')this.value=''" onBlur="if(this.value=='') this.value='type here to start your search...'" class="myInputbox" type="text" autocomplete="off"><button class="myButton" type="text" name="submit" id="">Search</button></p>
		</form>
	</div>
	<br>


<?php

$search = $_POST['searchq'] ; 
$query = "select text,profile_image_url from twitter.search where q= '$search' limit 5";
$url = "http://query.yahooapis.com/v1/public/yql?q=";
$url .= rawurlencode($query);
$url .= "&format=json&env=store://datatables.org/alltableswithkeys";

// $json = file_get_contents($url, true);
 $json = get_data($url);

$info = json_decode($json, true) ;
// debug, if json_decode fails
//$error = json_last_error(); echo $error; exit;  
// debug, check structure result
//echo "<pre>"; print_r($info ); echo "</pre>"; exit;

function get_data($url) { 
  $ch = curl_init();
  $timeout = 5;
  curl_setopt($ch,CURLOPT_URL,$url);
  curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
  curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,$timeout);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}

	foreach($info['query']['results']['results'] as $tweet) {
					$tweetText = $tweet['text'];
					$pic = $tweet['profile_image_url'];

					// URLs (from http://www.phpro.org/examples/URL-to-Link.html)
					$tweetText = preg_replace("/([\w]+:\/\/[\w-?&;#~=\.\/\@]+[\w\/])/i","<a target=\"_blank\" href=\"$1\" target=\"_blank\">$1</a>",$tweetText);

					// twitter handles
					$tweetText = preg_replace('/(@\S+)/i',"<a target=\"_blank\" href=\"http://twitter.com/$1\" target=\"_blank\">$1</a>",$tweetText);

					// hash tags map to search?q=#hash
					$tweetText = preg_replace('/(#)(\S+)/i',"<a target=\"_blank\" href=\"http://twitter.com/search?q=%23$2\" target=\"_blank\">$1$2</a>",$tweetText);	

					echo '<p><ul><img src="'.$pic.'">'.$tweetText .'</p></ul>';
	}
?>