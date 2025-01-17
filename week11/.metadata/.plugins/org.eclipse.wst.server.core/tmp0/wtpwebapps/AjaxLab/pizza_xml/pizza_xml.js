function getCustomerInfo() {
	var phone = $("#phone").val();
	if (phone == "") {
		$("#address").val("");
		$("#order").val("");
	}
	else {
		$.ajax({
	 		type: "GET",
			url: "lookupCustomer_xml.jsp?phone=" + phone,
			/* 또는 url: "lookupCustomer_xml.jsp", 
				data: {"phone": phone}, */  
			dataType: "xml",
			success: updatePage,
			error: function(jqXHR) {
				var message = jqXHR.getResponseHeader("Status");
				if ((message == null) || (message.length <= 0)) {
					alert("Error! Request status is " + jqXHR.status);
				} else {
					alert(message);	
				}
			}
		});
	}
}

function updatePage(xmlDoc) {
	alert("response: " + xmlDoc);
	/* Update the HTML web form */
	var name = xmlDoc.getElementsByTagName("name")[0].textContent;
	var addr = xmlDoc.getElementsByTagName("address")[0].textContent;
	var recentOrder = xmlDoc.getElementsByTagName("recentOrder")[0].textContent;
	var greeting = document.getElementById("greeting").innerText="Hi, " + name + "! ";

	$("#address").val("To: " + name + "\n" + addr);
	$("#order").val(recentOrder);
}

function submitOrder() {
	var data = {
		phone: $("#phone").val(), 
		address: $("#address").val(), 
		order: $("#order").val()
	};
	$.ajax({
 		type: "POST",
		url: "placeOrder_xml.jsp",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8", // default(생략 가능)
		data: data,	
		dataType: "text",
		success: showConfirmation,
		error: function(jqXHR) {
			var message = jqXHR.getResponseHeader("Status");
			if ((message == null) || (message.length <= 0)) {
				alert("Error! Request status is " + jqXHR.status);
			} else {
				alert(message);	
			}
		}
	});
}

function showConfirmation(response) {
	// Create some confirmation text
	var p = document.createElement("p");
	p.innerHTML = `Your order should arrive within ${response} minutes. Enjoy your pizza!`;
	var span = document.createElement("span");
	$(span).append(p);
	$("#main-page > span").remove();
	$("#main-page").append(span);
	
	// Or you can replace the form with the confirmation as below:
	// $("#order-form").replaceWith(p);	
}