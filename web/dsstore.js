function getallapps() 
{
	fetch('https://duckpvp-rpg-default-rtdb.firebaseio.com/Store-Listing.json')
	 .then(response => response.text())
	 .then(data => {
		var storelisting = data;
		
		const map = new Map(Object.entries(JSON.parse(storelisting)));
		map.forEach((_value, key) => {
			const map2 = new Map(Object.entries(map.get(key)));
			id=map2.get('shildkey');
			imageurl=map2.get('icon');
			title=map2.get('title');
			url="./download.html?id="+id
			document.getElementById("recentapps").innerHTML += 
            "<a href='"+url+"' target='_blank' rel='noreferrer noopener' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
		})
		
	})
}
function getappbyid() 
{
	fetch('https://duckpvp-rpg-default-rtdb.firebaseio.com/Store-Listing.json')
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
        link.setAttribute('href', "./devprofile.html?id="+devuid);
		var link2 = document.getElementById("downloadbut");
        link2.onclick()
		{
			downloadapk(apkurl);
		}
		
	})
}
function downloadapk(apkurl)
{
	const documentName = "DSstore_apk.apk";

	fetch(apkurl)
	.then(res => {
		return res.blob();
	})
	.then(blob => {
		const href = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.download = documentName;
		a.href = href;
		a.click();
		a.href = "";
	  })
	  .catch(err => console.error(err));
}
function getdevbyid() 
{
	fetch('https://duckpvp-rpg-default-rtdb.firebaseio.com/Accounts.json')
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
			fetch('https://duckpvp-rpg-default-rtdb.firebaseio.com/Store-Listing.json')
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
						"<a href='"+url+"' target='_blank' rel='noreferrer noopener' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
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
				fetch('https://duckpvp-rpg-default-rtdb.firebaseio.com/Store-Listing.json')
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
						"<a href='"+url+"' target='_blank' rel='noreferrer noopener' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
						a++;
					})
					
				})
			}
			else
			{
				document.getElementById("appsbut").style.color = 'white';
				fetch('https://duckpvp-rpg-default-rtdb.firebaseio.com/Store-Listing.json')
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
							"<a href='"+url+"' target='_blank' rel='noreferrer noopener' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
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
		
		fetch('https://duckpvp-rpg-default-rtdb.firebaseio.com/Store-Listing.json')
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
					"<a href='"+url+"' target='_blank' rel='noreferrer noopener' class='streapp-link'><div class='streapp-container1'><img alt='image' src='"+imageurl+"' class='streapp-image'><span class='streapp-text'><span>"+title+"</span></span></div></a>";
				}
			})
				
		})
	}
}