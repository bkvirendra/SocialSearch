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
	<style>
       div.box {
	border: solid 1px #CCCCCC;
	background-color: #f9f9f9;
	float:left;
	padding: 4px;
	margin: 4px 4px 0px 4px;
	min-width:1000px;
      }
	</style>
  </head>
  <body>
        <div id="header">
		 <form action="fb.php" method="POST">
           <img src="smalllogo.JPG" alt="So. Search It!"><br> 
           <input name="searchq" value="type here to start your search..." onFocus="if (this.value=='type here to start your search...')this.value=''" onBlur="if(this.value=='') this.value='type here to start your search...'" class="myInputbox" type="text" autocomplete="off">
           <button class="myButton" type="text" name="submit" id="">Search</button></p>
		 </form>
	    </div>
	   <div id="container">
  
  <hr align="center">
  <p>
    <?php

$raw = $_POST['searchq'] ; 
$query = rawurlencode($raw);
$url = "http://graph.facebook.com/search?q=$query&type=post&limit=10";

// using curl, as file_get_contents sometimes fails on remote server
//$json = file_get_contents($url, true);
$json = get_data($url);

$info = json_decode($json, true) ;
// debug, if json_decode fails
// $error = json_last_error(); echo $error; exit;  
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

foreach($info['data'] as $tweet) {
	                
					$tweetText = $tweet['message'];
                    $name = $tweet['from']['name'];
					$uid = $tweet['from']['id'];

					// URLs (from http://www.phpro.org/examples/URL-to-Link.html)
					$tweetText = preg_replace("/([\w]+:\/\/[\w-?&;#~=\.\/\@]+[\w\/])/i","<a target=\"_blank\" href=\"$1\" target=\"_blank\">$1</a>",$tweetText);

					// twitter handles
					$tweetText = preg_replace('/(@\S+)/i',"<a target=\"_blank\" href=\"http://facebook.com/$1\" target=\"_blank\">$1</a>",$tweetText);

					// hash tags map to search?q=#hash
					$tweetText = preg_replace('/(#)(\S+)/i',"<a target=\"_blank\" href=\"http://facebook.com/search?q=%23$2\" target=\"_blank\">$1$2</a>",$tweetText);	
                    
					/*if (strlen($tweet['picture']) != 0 && strlen($tweet['message']) != 0){
						$pic = $tweet['picture'];
						echo '<ul><img src="'.$pic.'"><p>'.$tweetText .'</p></ul>';
					} else { */
					  echo "<ul><img src=\"http://graph.facebook.com/$uid/picture\">";
                      echo '<p><a target=\"_blank\" href="http://www.facebook.com/profile.php?id='.$uid.'">'.$name.'</a></p>';
					  echo $tweetText;
					  echo "</ul>";
				}				
?>
  </p>
</body>
</html>