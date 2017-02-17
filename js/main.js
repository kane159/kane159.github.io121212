// 註解
(function($, undefined){

var MAIN = {
		'items': {},
		'complete': false
	};

TEST = MAIN;
function grade(){
	
	var grades = {},
		text = [],
		total = 0;
	
	$.each(MAIN.items, function(id, iframe){
		var info = iframe.contentWindow.info,
			grade = info.grade || 0;
		
		text.push(info.name + "：" + grade);
		grades[id] = grade;
		total += info.grade;
	});
	grades['__total'] = total;
	text.push("總計：" + total);
	
	$("<div>")
		.html(text.join("<br/>"))
		.dialog();
	MAIN.complete = true;
	$("#info input#grade").prop("disabled", true).off("click");
	// Upload Grade to Server (Implement it as Needed)
}

$(function(){
	
	$("#frames").tabs();
	
	$("#info input#grade").on("click", function(ev){
		// Check if there's any item not complete yet
		var complete = true;
		$.each(MAIN.items, function(id, iframe){
			complete &= (iframe && iframe.contentWindow.info.grade !== null);
		});
		if (complete)
			grade();
		else
			$("<div>")
				.text("尚有未完成項目，將以零分計算，是否繼續？")
				.dialog({
					'modal': true, 'autoOpen': true,
					'buttons': {
						'是': function(){
							grade();
							$(this).dialog("close");
						},
						'否': function(){ $(this).dialog("close"); }
					}
				});
	});
	
	$("#info input#rank").on("click", function(){
		// TODO: Implement it as Needed
	});
	
	$("iframe")
		.on("load", function(ev){
			MAIN.items[$(this).parent().attr("id")] = this;
		});
});

})(jQuery);