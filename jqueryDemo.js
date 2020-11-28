$("#button1,#button2").click(function(){
    var nameValue = $('#name').val(); 
    var name_re = /^[A-Za-z- ]+$/;
    if (nameValue.match(name_re) == null) 
    {
	    alert("Name must be right");
    	return false;
	}

    var marks_re = /^(0|[1-9][0-9]?|100)$/;
	var engValue = $('#eng').val(); 
    if (engValue.match(marks_re) == null) 
    {
    	alert("Enter marks of English in 0 to 100");
    	return false;
	}

	var mathsValue = $('#maths').val(); 
    if (mathsValue.match(marks_re) == null) 
    {
    	alert("Enter marks of Maths in 0 to 100");
    	return false;
	}

	var gujValue = $('#gujrati').val(); 
    if (gujValue.match(marks_re) == null) 
    {
    	alert("Enter marks of Gujrati in 0 to 100");
    	return false;
	}

	avgValue = parseFloat((parseFloat(engValue) + parseFloat(mathsValue) + parseFloat(gujValue))/3).toFixed(2);

	var n =  $('#entryTable').find('tr').length;
	if($(this).prop("id")== "button2"){
		n = currentRow.prop("id");
		var markup = "<tr id=" + n + "><td>" + nameValue + "</td><td>" + engValue + "</td><td>"+ 
				 mathsValue + "</td><td>" + gujValue + "</td><td>" + avgValue + 
				 "</td><td><button class='edit'>Edit</button><button class='delete'>Delete</button></td></tr>";
		var element = $('tr[id='+n+']');
		$(markup).insertAfter(element);
		element.remove();
	    $("#button1").show();
	    $("#button2").hide();
	}else{
		var markup ="<tr id=" + n + "><td>" + nameValue + "</td><td>" + engValue + "</td><td>"+ 
				     mathsValue + "</td><td>" + gujValue + "</td><td>" + avgValue + 
				     "</td><td><button class='edit'>Edit</button><button class='delete'>Delete</button></td></tr>";
	    $("#entryTable").append(markup);
	}
	$("#forms")[0].reset();
});

$("#res").click(function(){
	$("#forms")[0].reset();
});

$("#entryTable").on("click", ".edit", function(e){
	window.currentRow=$(this).closest("tr");
	window.col1=currentRow.find("td:eq(0)").html();
	$("#name").val(col1);
	window.col2=currentRow.find("td:eq(1)").html();
	$("#eng").val(col2);
	window.col3=currentRow.find("td:eq(2)").html();
	$("#maths").val(col3);
	window.col4=currentRow.find("td:eq(3)").html();
	$("#gujrati").val(col4);

    $("#button1").hide();
    $("#button2").show();
});

$("#entryTable").on("click", ".delete", function(e){
	currentRow=$(this).closest("tr");
	currentRow.remove();
});

$("#search").on("change textInput input", function() {
	var searchVal = $(this).val().toLowerCase();
	$("#record tr").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(searchVal) == 0);
	});
});

$('#1, #2, #3, #4').click(function() {

	switching = true;
	var switchcount = 0;
	var rows = $('#entryTable tr');
	dir = "asc"; 
	while (switching) {
		switching = false;
		rows = $('#entryTable tr');
		var id = $(this).prop("id");
		for (i = 1; i < (rows.length-1); i++) {
			shouldSwitch = false;
			x = $(rows[i]).children("td")[id];
			y = $(rows[i+1]).children("td")[id];
			if (dir == "asc") {
				if (parseFloat($(x).html()) > parseFloat($(y).html())) {
					shouldSwitch= true;
					break;
				}
			} else if (dir == "desc") {
				if (parseFloat($(x).html()) < parseFloat($(y).html())) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount ++;      
		} 
		else {
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
});
