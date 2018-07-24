// JavaScript Document


$(document).ready(function(){
    console.log('Javascript connected');
    
    
    
    $('.dltBtn').on('click', function(){
		var id = $(this).attr('id');
		console.log("You Clicked " + id);
		$.ajax({
			type: 'DELETE',
			url: '/delete/' + id,
//			data:
			success: function(data){
//				some code to do something with the response
				location.reload();
			}
		});
		
	});
	
    $('.dltThd').on('click', function(){
		var id = $(this).attr('id');
		console.log("You Clicked " + id);
		$.ajax({
			type: 'DELETE',
			url: '/page/' + id,
//			data:
			success: function(data){
//				some code to do something with the response
				location.reload();
			}
		});
		
	});
    
    
})