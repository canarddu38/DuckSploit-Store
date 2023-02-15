function getallapps() 
{
	b = 0;
	fetch('https://dsrestapi-default-rtdb.firebaseio.com/Store-Listing.json')
	 .then(response => response.text())
	 .then(data => {
		var storelisting = data;
		
		const map = new Map(Object.entries(JSON.parse(storelisting)));
		map.forEach((_value, key) => {
			if (b < 50)
			{
				const map2 = new Map(Object.entries(map.get(key)));
				id=map2.get('shildkey');
				imageurl=map2.get('icon');
				title=map2.get('title');
				url="./download.html?id="+id
				document.getElementById("recentapps").innerHTML += 
				"<a href='"+url+"' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
			}
			b++;
		})
		
	})
}
function getappbyid() 
{
	fetch('https://dsrestapi-default-rtdb.firebaseio.com/Store-Listing.json')
	 .then(response => response.text())
	 .then(data => {
		var storelisting = data;
		
		const map = new Map(Object.entries(JSON.parse(storelisting)));
		id = window.location.search.replace('?id=', '');
		const map2 = new Map(Object.entries(map.get(id)));
		id=map2.get('shildkey');
		imageurl=map2.get('icon');
		title=map2.get('title');
		url="./download.html?id="+id
		devname=map2.get('creator');
		devuid=map2.get('uid');
		fetch('https://dsrestapi-default-rtdb.firebaseio.com/Accounts.json')
		 .then(response2 => response.text())
		 .then(data2 => {
			const map3233 = new Map(Object.entries(JSON.parse(data2)));
			const map32334 = new Map(Object.entries(map3233.get(devuid)));
			devname=map32334.get("name");
		 });
		
		appdesc=map2.get('description');
		apkurl=map2.get('APK');
		
		screen1=map2.get('screen1');
		screen2=map2.get('screen2');
		screen3=map2.get('screen3');
		
		
		document.getElementById("appname").innerHTML = title;
		document.getElementById("appicon").src = imageurl;
		
		document.getElementById("screen1").src = screen1;
		document.getElementById("screen2").src = screen2;
		document.getElementById("screen3").src = screen3;
		
		document.getElementById("appdeveloper").innerHTML = devname;
		document.getElementById("appdesc").innerHTML = appdesc;
		
		var link = document.getElementById("appdevurl");
		
		var titlemeta = document.createElement('meta');  
		titlemeta.setAttribute('property', 'og:title');  titlemeta.content = "Download "+title+" - DuckSploit Store";
		document.getElementsByTagName('head')[0].appendChild(titlemeta);
		
		var descmeta = document.createElement('meta');  
		descmeta.setAttribute('property', 'og:title');  descmeta.content = "Download "+title+" android apk on DuckSploit Store";
		document.getElementsByTagName('head')[0].appendChild(descmeta);
		
		document.title = "Download "+title+" - DuckSploit Store";
		document.querySelector('meta[name="title"]').setAttribute("content", "Download "+title+" - DuckSploit Store");
		document.querySelector('meta[name="description"]').setAttribute("content", "Download "+title+" android apk on DuckSploit Store");
        link.setAttribute('href', "./devprofile.html?id="+devuid);
		
		var link2 = document.getElementById("downloadbut");
		link2.setAttribute('href', apkurl);
		
	})
}
function getdevbyid() 
{
	fetch('https://dsrestapi-default-rtdb.firebaseio.com/Accounts.json')
	 .then(response => response.text())
	 .then(data => {
		var storelisting = data;
		
		const map = new Map(Object.entries(JSON.parse(storelisting)));
		id = window.location.search.replace('?id=', '');
		const map2 = new Map(Object.entries(map.get(id)));
		icon=map2.get('image');
		name=map2.get('name');
		
		document.getElementById("name").innerHTML = name;
		document.getElementById("uid").innerHTML = id;
		document.getElementById("icon").src = icon;
		
	})
}
function gotosearch() 
{
	searchcontent = document.getElementById('searchbox').value
	window.location.replace("./search.html?s="+searchcontent);
}
function search() 
{
	query = window.location.search;
	
	if (window.location.search.includes("category"))
	{
		if (query.includes("game"))
		{
			document.getElementById("gamesbut").style.color = 'white';
			fetch('https://dsrestapi-default-rtdb.firebaseio.com/Store-Listing.json')
			 .then(response => response.text())
			 .then(data => {
				var storelisting = data;
				
				const map = new Map(Object.entries(JSON.parse(storelisting)));
				map.forEach((_value, key) => {
					const map2 = new Map(Object.entries(map.get(key)));
					if (map2.get('apkCategory') == "game")
					{
						id=map2.get('shildkey');
						imageurl=map2.get('icon');
						title=map2.get('title');
						url="./download.html?id="+id
						document.getElementById("applist").innerHTML += 
						"<a href='"+url+"' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
					}
				})
				
			})
		}
		else
		{
			if (query.includes("all"))
			{
				var elem = document.getElementById("applist");
				elem.parentNode.removeChild(elem);
				var elem2 = document.getElementById("searchresult");
				elem2.parentNode.removeChild(elem2);
				
				
				document.getElementById("categoriesbut").style.color = 'white';
				fetch('https://dsrestapi-default-rtdb.firebaseio.com/Store-Listing.json')
				 .then(response => response.text())
				 .then(data => {
					var storelisting = data;
					
					a = 0;
					const categories = [];
					
					const map = new Map(Object.entries(JSON.parse(storelisting)));
					map.forEach((_value, key) => {
						const map2 = new Map(Object.entries(map.get(key)));
						
						if (categories[map2.get('category')] == undefined)
						{
							categories[map2.get('category')] = map2.get('category');
							
							document.getElementById("storecontainer").innerHTML += 
							"<h1>"+map2.get('category')+"</h1>"
							document.getElementById("storecontainer").innerHTML +=
							"<div id='"+map2.get('category')+"' class='search-container4'></div>"
						}
						id=map2.get('shildkey');
						imageurl=map2.get('icon');
						title=map2.get('title');
						url="./download.html?id="+id
						document.getElementById(map2.get('category')).innerHTML += 
						"<a href='"+url+"' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
						a++;
					})
					
				})
			}
			else
			{
				document.getElementById("appsbut").style.color = 'white';
				fetch('https://dsrestapi-default-rtdb.firebaseio.com/Store-Listing.json')
				 .then(response => response.text())
				 .then(data => {
					var storelisting = data;
					
					const map = new Map(Object.entries(JSON.parse(storelisting)));
					map.forEach((_value, key) => {
						const map2 = new Map(Object.entries(map.get(key)));
						if (map2.get('apkCategory') == "application")
						{
							id=map2.get('shildkey');
							imageurl=map2.get('icon');
							title=map2.get('title');
							url="./download.html?id="+id
							document.getElementById("applist").innerHTML += 
							"<a href='"+url+"' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
						}
					})
					
				})
			}
		}
		document.getElementById("searchresult").innerHTML = "Result for '"+query.replace('?category=', '')+"'";
	}
	else
	{
		input_search = query.replace("?s=", "")
		document.getElementById("searchresult").innerHTML = "Result for '"+input_search+"'";
		
		fetch('https://dsrestapi-default-rtdb.firebaseio.com/Store-Listing.json')
		 .then(response => response.text())
		 .then(data => {
			var storelisting = data;
			
			const map = new Map(Object.entries(JSON.parse(storelisting)));
			map.forEach((_value, key) => {
				const map2 = new Map(Object.entries(map.get(key)));
				if (map2.get('title').toLowerCase().includes(input_search.trim().toLowerCase()))
				{
					id=map2.get('shildkey');
					imageurl=map2.get('icon');
					title=map2.get('title');
					url="./download.html?id="+id
					document.getElementById("applist").innerHTML += 
					"<a href='"+url+"' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
				}
			})
				
		})
	}
}
function downloadfile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
