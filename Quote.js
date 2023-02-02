var t=setInterval(do_interval,1000);	
	

function do_interval() {
	
	var startStop = document.getElementById('startStop').value;               
	if (startStop == 'Start Automatic Updates') {                      
		return;
	}
	var updateCount = document.getElementById('updateCount').value;
	if (updateCount && updateCount.length > 0) updateCount = parseInt(updateCount);
	if (updateCount > 1) {                                                           
		document.getElementById('updateCount').value = updateCount-1;
		return;
	}
		
	do_quote();
}

function startStopFunction() {
  var startStop = document.getElementById('startStop').value;             console.log(startStop);
  if (startStop == 'Start Automatic Updates') {
	  var refreshInterval = document.getElementById('refreshInterval').value;
	  document.getElementById('updateCount').value = refreshInterval;
	  document.getElementById('startStop').value = "Stop Automatic Updates";
  } else {
	  document.getElementById('startStop').value = "Start Automatic Updates";
  } 
}
	
function do_onSelect() {
	var refreshInterval = document.getElementById('refreshInterval').value;                          
	document.getElementById('updateCount').value = refreshInterval;
}

function clear_table() {
	var table = document.getElementById('myTable');
	while(table.rows.length > 1) {
		table.deleteRow(1);
	}
}
	
function do_quote() {
	var refreshInterval = document.getElementById('refreshInterval').value;                          
	document.getElementById('updateCount').value = refreshInterval;

	var symbols = document.getElementById('symbols').value;
	console.log(symbols);
	
    var url = 'http://candidateservices.allegient.com/randomQuote/quote?symbols='+symbols;
    console.log(url);
    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {

            console.log(data);
            console.log(JSON.stringify(data));
			
			let quotes = data.quotes;
            console.log(quotes);
			
			console.log(data.generatedDate)
			document.getElementById('current').value = data.generatedDate;
			for (i=0; i<quotes.length; i++) {

				let quote = quotes[i];	
				
				var newRow=document.getElementById('myTable').insertRow();
				newRow.innerHTML = "<td>"+quote.symbol+"</td><td>"+quote.lastTradePrice+"</td><td>"+data.generatedDate+"</td>";
			}


		}
		)
}
