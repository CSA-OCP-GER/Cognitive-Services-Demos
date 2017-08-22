function createRequest() {
  var result = null;
  if (window.XMLHttpRequest) {
    // FireFox, Safari, etc.
    result = new XMLHttpRequest();
  }
  else if (window.ActiveXObject) {
    // MSIE
    result = new ActiveXObject("Microsoft.XMLHTTP");
  } 
  else {
    // No known mechanism -- consider aborting the application
  }
  return result;
}



function send(image_url){
	if(image_url == ""){
		alert("Kein Bild angegeben!");
	}
var req = createRequest(); // defined above
// Create the callback:
req.onreadystatechange = function() {
  if (req.readyState != 4) return; // Not there yet
  if (req.status != 200) {
    // Handle request failure here...
    return;
  }
  // Request successful, read the response
  var resp = req.responseText;
  var parsedData = JSON.parse(resp);
 createTableFromJSON(resp)
//(alert(parsedData.Predictions["0"].Probability);
  // ... and use it as needed by your app.
}
/* 
* Boris: Fill url and Prediction-Key with your values
*
*/
var url="<API_URL>";
var data="{'Url':'"+image_url+"' }";
req.open("POST", url, true);
req.setRequestHeader("Content-Type","application/json");
req.setRequestHeader("Prediction-Key", "<PREDICTION_KEY>");
req.send(data);
}

function createTableFromJSON(jsonObj){
		var col=["Kategorie","Wahrscheinlichkeit"];
		var parsedData = JSON.parse(jsonObj);
	       // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }
		for (var i = 0; i < 4; i++) {
		    tr = table.insertRow(-1);
                var tabCell1 = tr.insertCell(-1);
				tabCell1.innerHTML = parsedData.Predictions[i].Tag;
				 var tabCell2 = tr.insertCell(-1);
                tabCell2.innerHTML += parsedData.Predictions[i].Probability;
		}
		
		var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);

  }


