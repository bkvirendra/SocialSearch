<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Social Search - A Social Search Engine for Facebook &amp; Twitter</title>
    <meta content="Virendra Rajput" name="author">
    <meta content="A Social Search Engine for Facebook &amp; Twitter" name="description">
    <meta content="social search engine, social search, facebook search, twitter search" name="keywords">
    <link href="http://fonts.googleapis.com/css?family=Shadows+Into+Light" rel="stylesheet" type="text/css">
	<link href="style.css" rel="stylesheet" type="text/css">
  </head>
  <body>
        <div id="header">
		 <form action="yql.php" method="POST">
		   <p class="style3"><strong>So.Search It!</strong> 
           <input name="searchq" value="type here to start your search..." onFocus="if (this.value=='type here to start your search...')this.value=''" onBlur="if(this.value=='') this.value='type here to start your search...'" class="myInputbox" type="text" autocomplete="off"><button class="myButton" type="text" name="submit" id="">Search</button></p>
		 </form>
	    </div>
	   <div id="container">
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
					
					echo '<div style="background-color:#DCDCDC; color:#000000; font-style: normal; font-family: Georgia;"><ul>';

					echo '<p><img src="'.$pic.'">'.$tweetText .'</p></div></blockquote></ul>';
	}
?>
</div>
</body>
</html>