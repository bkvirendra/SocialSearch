  $(document).ready(function(){
  $("#query").focus(); // Focusing on the Search
  $("#sidebar").hide();
  $("#header").html('<div class="well" id="header"><div id="carousel" class="carousel"><div class="carousel-inner"><div class="item active"><img src="img/main.jpg" alt="Main Slider1"></div><div class="item"><img src="img/main1.jpg" alt="Main Slider2"></div><div class="item"><img src="img/main2.jpg" alt="Main Slider2"></div></div><a class="carousel-control left" href="#carousel" data-slide="prev">&lsaquo;</a><a class="carousel-control right" href="#carousel" data-slide="next">&rsaquo;</a></div></div>');
   $('#carousel').carousel({
    interval: 7000
    })
  		$("#query").autocomplete({
			source: function( request, response ) {
				$.ajax({
					url: "q.php",
					dataType: "json",
					data: {
                        "q" : request.term
					},
					success: function( data ) {
					response(data[1])
					}
				});
			},
			minLength: 2
		});
  
  $('#query').typeWatch({ callback: function() {
   $("#header").hide();
   $("#result").empty().html('<img class="center" src="img/loading.gif">'); //Showing the Loading Image
   var search_input = $("#query").val(); // Getting the value from the Query
   document.title = ''+ search_input +' - FB Instant Search'; // Chaning the Title of the Page
   window.location.hash = '#' + $("#query").val(); // Setting the Query in the URL Bar
   $("#showing").empty().html('&nbsp; &nbsp;<img src="img/loader.gif">');
   var myquery = window.location.hash.substr(1);
   var keyword= encodeURIComponent(myquery); // Encoding it in the URI format
   var search_url='http://graph.facebook.com/search?q='+keyword+'&type=post&limit=20'; // Creating SearchURL 
   var i = 0; //Initialize the counter
   $.ajax({ // Sending the Request
          type: "GET",  
          url: search_url,
          dataType:"jsonp",
          success: function(response){
          $("#result").html(''); 
          if(response.data) {
          $.each(response.data, function(i,data){
		  i++;
          var profile=data.from.id;
          var title=data.from.name;
          var dis=data.message;
		  var type = data.type;
		  var date = new Date(data.created_time);
		  var exact_date = date.toLocaleDateString();
		  var exact_time = date.toLocaleTimeString();
          if (profile) {
		   switch (type) {
			   case "status": 
			      var final="<div class='well'><a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'><img class='profile_pics' src='http://graph.facebook.com/"+profile+"/picture?type=small' title='"+title+"' alt='"+title+"'></a><div class='profile_text'><div class='title'><p id='name'><i class='icon-search icon-user'></i> <a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'>"+title+"</p></a></div><div class='desc'><p>"+dis+"</p></div><div><p><i class='icon-search icon-envelope'></i><span class='status_type'> "+type+" </span> &nbsp; &nbsp; &nbsp;  <span class='timestamp'>"+data.created_time+"</span></p></div></div></div>";
				  break;
			   	case "link":  
				  var final="<div class='well'><a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'><img class='profile_pics' src='http://graph.facebook.com/"+profile+"/picture?type=small' title='"+title+"' alt='"+title+"'></a><div class='profile_text'><div class='title'><p id='name'><i class='icon-search icon-user'></i> <a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'>"+title+"</p></a></div><div class='desc'><p><b>Title : &nbsp;</b> "+data.name+"<br><b>Link :&nbsp;</b><a href="+data.link+" target='_blank'>"+data.link+"</a><br><b>Description :&nbsp;</b> "+data.description+"<br><b>Caption :&nbsp;</b> <a href='http://"+data.caption+"' target='_blank'>"+data.caption+"</a></p></div><div><p><i class='icon-search icon-tags'></i><span class='status_type'> "+type+" </span> &nbsp; &nbsp; &nbsp;  <span class='timestamp'>"+data.created_time+"</span></p></div></div></div>";
				  break;
				case "video":
				if (data.caption == 'www.youtube.com') {
				function youtube_parser(url){
                  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
                  var match = url.match(regExp);
                  if (match&&match[7].length==11){
                     return match[7];
                   }else{
                     
                  }
               }
               var videoID = youtube_parser(data.link);
			   var final="<div class='well'><a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'><img class='profile_pics' src='http://graph.facebook.com/"+profile+"/picture?type=small' title='"+title+"' alt='"+title+"'></a><div class='profile_text'><div class='title'><p id='name'><i class='icon-search icon-user'></i> <a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'>"+title+"</p></a></div><div class='desc'><p><b>Title : &nbsp;</b>"+data.name+"<br><b>Watch it Now : &nbsp;</b><a class='youtube' title="+data.name+" href="+data.source+" target='_blank'>Click here to Watch the Video</a></p><a class='youtube' title="+data.name+" href="+data.source+" target='_blank'><img style='border: 1px solid white; height:70px; width:120px; margin-left:95px; margin:3px; border:2px solid rgb(204, 204, 204); display:inline-block;' src='http://i.ytimg.com/vi/"+videoID+"/default.jpg' alt="+data.name+"></a><a class='youtube' title="+data.name+" href="+data.source+" target='_blank'><img style='border: 1px solid white; height:70px; width:120px;  margin:3px; border:2px solid rgb(204, 204, 204); display:inline-block;' src='http://i.ytimg.com/vi/"+videoID+"/1.jpg' alt="+data.name+"></a><a class='youtube' title="+data.name+" href="+data.source+" target='_blank'><img style='border: 1px solid white; height:70px; width:120px;  margin:3px; border:2px solid rgb(204, 204, 204); display:inline-block;' src='http://i.ytimg.com/vi/"+videoID+"/3.jpg' alt="+data.name+"></a></div><div><p><i class='icon-search icon-film'></i><span class='status_type'> "+type+" </span> &nbsp; &nbsp; &nbsp;  <span class='timestamp'>"+data.created_time+"</span></p></div></div></div>";
				  } else if(!data.caption) {
				var final = "<div class='well'><a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'><img class='profile_pics' src='http://graph.facebook.com/"+profile+"/picture?type=small' title='"+title+"' alt='"+title+"'></a><div class='profile_text'><div class='title'><p id='name'><i class='icon-search icon-user'></i> <a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'>"+title+"</p></a></div><div class='desc'><p><b>Title : &nbsp;</b>"+data.name+"<br><b>Caption : &nbsp;</b>"+data.caption+"<br><b>Watch it Now : &nbsp;</b><a class='youtube' title="+data.name+" href="+data.source+" target='_blank'>Click here to Watch the Video</a></p><img style='border: 1px solid white; height:70px; width:120px; margin-left:95px; margin:3px; border:2px solid rgb(204, 204, 204); display:inline-block;' src="+data.picture+" alt="+data.name+"></div><div><p><i class='icon-search icon-film'></i><span class='status_type'> "+type+" </span> &nbsp; &nbsp; &nbsp;  <span class='timestamp'>"+data.created_time+"</span></p></div></div></div>";	  
				  } else {
				var final = "<div class='well'><a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'><img class='profile_pics' src='http://graph.facebook.com/"+profile+"/picture?type=small' title='"+title+"' alt='"+title+"'></a><div class='profile_text'><div class='title'><p id='name'><i class='icon-search icon-user'></i> <a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'>"+title+"</p></a></div><div class='desc'><p><b>Title : &nbsp;</b>"+data.name+"<br><b>Caption : &nbsp;</b>"+data.caption+"<br><b>Watch it Now : &nbsp;</b><a class='youtube' title="+data.name+" href="+data.source+" target='_blank'>Click here to Watch the Video</a></p></div><div><p><i class='icon-search icon-film'></i><span class='status_type'> "+type+" </span> &nbsp; &nbsp; &nbsp;  <span class='timestamp'>"+data.created_time+"</span></p></div></div></div>";	  
				  }
				  break; 
				case "photo":
				  var final="<div class='well'><a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'><img class='profile_pics' src='http://graph.facebook.com/"+profile+"/picture?type=small' title='"+title+"' alt='"+title+"'></a><div class='profile_text'><div class='title'><p id='name'><i class='icon-search icon-user'></i> <a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'>"+title+"</p></a></div><div class='desc'><p><b>Title : &nbsp;</b>"+data.name+"<br><b>Thumbnail :</b><br>&nbsp;<a style='margin-left:95px; margin:3px; border:3px solid rgb(204, 204, 204); display:inline-block;' class='iframe' title="+data.name+" href='http://graph.facebook.com/"+data.object_id+"/picture'><img style='border: 1px solid white; height:140px; width:100px;' class='thumb_nails' src='http://graph.facebook.com/"+data.object_id+"/picture?type=thumbnail' alt="+data.name+"></a><br><b>Caption : &nbsp;</b> "+data.caption+"<br><b>Link : &nbsp;</b> <a href="+data.link+" target='_blank'>"+data.link+"</a></p></div><div><p><i class='icon-search icon-picture'></i><span class='status_type'> "+type+" </span> &nbsp; &nbsp; &nbsp;  <span class='timestamp'>"+data.created_time+"</span></p></div></div></div>";  
				  break;  
				default:
				    var final="<div class='well'><a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'><img class='profile_pics' src='http://graph.facebook.com/"+profile+"/picture?type=small' title='"+title+"' alt='"+title+"'></a><div class='profile_text'><div class='title'><p id='name'><i class='icon-search icon-user'></i> <a href='http://www.facebook.com/profile.php?id="+profile+"' target='_blank'>"+title+"</p></a></div><div class='desc'><p>"+dis+"</p></div><div><p><i class='icon-search icon-envelope'></i><span class='status_type'> "+type+" </span> &nbsp; &nbsp; &nbsp;  <span class='timestamp'>"+data.created_time+"</span></p></div></div></div>";
		   }
		   $(".youtube").colorbox({iframe:true, innerWidth:625, innerHeight:444});
		   $(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
           
          } else if(!profile) {
         $("#result").html("<br><br><br><br><div id='no'>Wo...woo..! Wait on buddy what are exactly lookin for ??</div>"); 
         } else {
		 $("#result").html("<br><br><br><br><div id='no'>Wo...woo..! Wait on buddy what are exactly lookin for ??</div>");	 
		 } 
		   $('#result p').highlight(keyword);
           $('p').expander();
		   $('.timestamp').cuteTime();
		   $("#sidebar").show();
           $("#result").append(final);
		   var showq = decodeURIComponent(keyword);
		   if (showq.length < 15) {
		   $("#showing").empty().html('&nbsp; Showing Search Results for "'+showq+'"');
		   $("#sidebar").html("<p><b>Search Results</b></p><p>Showing <b>"+i+"</b>&nbsp; Search Results for <b>&quot;"+showq+"&quot;</b></p><br><br><p><b>Search It On</b></p><p><a href='http://www.google.co.in/search?q="+showq+"' target='_blank'>Google</a><br><a href='https://twitter.com/#!/search/"+showq+"' target='_blank'>Twitter</a><br><a href='http://search.yahoo.com/search?p="+showq+"' target='_blank'>Yahoo</a><br><a href='http://www.bing.com/search?q="+showq+"' target='_blank'>Bing</a><br></p>");
		   } else {
			 String.prototype.trunc = function(n,useWordBoundary){
             var toLong = this.length>n,
             s_ = toLong ? this.substr(0,n-1) : this;
             s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
             return  toLong ? s_ +'...' : s_;
            }; 
            var newq = showq.trunc(19,true);
			$("#showing").empty().html('&nbsp; Showing Results for "'+newq+'"');
		   $("#sidebar").html("<p><b>Search Results</b></p><p>Showing <b>"+i+"</b> Results for <b>&quot;"+newq+"&quot;</b></p><br><br><p><b>Search It On</b></p><p><a href='http://www.google.co.in/search?q="+showq+"' target='_blank'>Google</a><br><a href='https://twitter.com/#!/search/"+showq+"' target='_blank'>Twitter</a><br><a href='http://search.yahoo.com/search?p="+showq+"' target='_blank'>Yahoo</a><br><a href='http://www.bing.com/search?q="+showq+"' target='_blank'>Bing</a><br></p>");
		   }
		   
          });
         } else if (!response.data) {
         $("#result").html("<br><br><br><br><div id='no'>Wo...woo..! Wait on buddy what are exactly lookin for ??</div>");
         } else {
         $("#result").html("<br><br><br><br><div id='no'>Wo...woo..! Wait on buddy what are exactly lookin for ??</div>"); 
         }		 
        }  
		
           
		});
		},
        wait: 700,
        highlight: true,
        captureLength: 1
       }) 
		  var url_query = window.location.hash.substr(1);
	      if (url_query.length) {
			 $("#query").val(url_query);
             $("#query").trigger('keyup');
	     }
  });