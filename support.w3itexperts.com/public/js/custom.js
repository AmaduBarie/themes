
var screenWidth = $( window ).width();

(function($) {
	"use strict";

	$("#checkAll").change(function() {
		$("td input:checkbox").prop('checked', $(this).prop("checked"));
	});

	$(".ticket_edit").on('click', function(e)
	{
		e.preventDefault();	//STOP default action
		var dzEditUrl = $(this).attr('href');
		var dzContainerId = $(this).attr('rel');
		var dzEditId = $(this).attr('id');
		
		$('#'+dzEditId).hide();
		$('.ticketContentContainer').removeClass('d-none');
		$('.editFormContainer').html('');
		
		$.ajax({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		},
			method: "GET",
			url: dzEditUrl,
			dataType: 'html',
			success: function(data) {
				$('.edit-content-'+dzContainerId).addClass('d-none');
				$('.edit-form-'+dzContainerId).html(data);
				$('.edit-form-'+dzContainerId).removeClass('d-none');
			}
		})
	});
	
	$(document).on('click', '.edit_cancel', function(e) {
		$('.ticketContentContainer').removeClass('d-none');
		$('.editFormContainer').html('');
		$(".ticket_edit").show()
	});
	
	$(document).on('click', '.readStatus', function(e) {
		e.preventDefault();	
		var dzReadStatusUrl = $(this).attr('href');
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			method: "GET",
			url: dzReadStatusUrl,
			dataType: 'html',
			success: function(data) {
				$('#read_status').html(data);
			}
		});
		return false;
	});
	
	$('.ticketLikeBtn').click(function() {
		var $this = $(this);
		var likeUrl = $(this).attr('likeUrl');
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			method: "GET",
			url: likeUrl,
			dataType: 'json',
			success: function(data) {
				if(data.res == 'success') {
					if(data.msg == 'liked') {
						$this.removeClass('btn-outline-light');
						$this.addClass('btn-primary').html('<i class="fa fa-thumbs-up mr-2"></i> Liked');
					} else if(data.msg == 'unliked') {
						$this.removeClass('btn-primary');
						$this.addClass('btn-outline-light').html('<i class="fa fa-thumbs-up mr-2 text-info"></i> Like');
					}
				} else {
					alert('Something went wrong.')
				}
				return false;
			}
		});
	}); 

	$('.ticket_status').on('change', function() {
		$('#ticket_status_update').submit();
	});

	$('.ticket_category').on('change', function() {
		$('#ticket_category_update').submit();
	});
	
	$('.assign_user').on('change', function() {
		$('#ticket_assign_user_update').submit();
	});
	
	$('#refresh_purchase_data').on('submit',function() {
		var actionVal = $(this).attr('action');
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type: "POST",
			url: actionVal,
			data:  $(this).serialize(), // serializes the form's elements.
			success: function(data)
			{
			   location.reload();
			}
		});
		return false;
	});
	
	$('#purchase_code_update').on('submit',function() {
		var actionVal = $(this).attr('action');
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type: "POST",
			url: actionVal,
			data:  $(this).serialize(), // serializes the form's elements.
			success: function(data)
			{
				location.reload();
			}
		});
		return false;
	});

	var DzCardDraggable = function () {
		return {
			init: function () {
				var containers = document.querySelectorAll('.draggable-zone');
				if (containers.length === 0) {
					return false;
				}
				var swappable = new Sortable.default(containers, {
					draggable: '.draggable',
					handle: '.draggable .draggable-handle',
					mirror: {
						appendTo: 'body',
						constrainDimensions: true
					}
				});
			}
		};
	}();

	jQuery(document).ready(function () {
		DzCardDraggable.init();
	});

	$(".handle-compact-switch").on('change',function(){
		$(".category-form-list").toggleClass("compact-drag-bx");
	});
		
	jQuery(document).on('change', '#jump-article-category', function () {
		window.location.href = jQuery(this, 'option:selected').val();
	});

	if(jQuery('.sortable').length > 0 ){
		$( ".sortable" ).sortable({
			axis: "y"
		});
		$( ".sortable" ).disableSelection();
	}

	$("#upload-profile-img").on("change", function(){
		if($(this).is(':checked')) {
			$("#profile-sec").show();
		} else {
			$("#profile-sec").hide();
		}
	});

	$(".ticket-list-formats li a").on('click',function(){
		var articleFormat = $(this).data('format');
		
		$(".ticket-list-formats li a").removeClass('active');
		$(this).addClass('active');
		
		if(articleFormat == 'default'){
			jQuery('.artical-box').addClass('default').removeClass('compact detailed');
		}else if(articleFormat == 'compact'){
			jQuery('.artical-box').addClass('compact').removeClass('detailed default');
		} else if(articleFormat == 'detailed'){
			jQuery('.artical-box').addClass('detailed').removeClass('default compact');
		}
	}); 
	
	var screenWidth = $(window).width();
	
	if(screenWidth <= 768){
		jQuery('.artical-box').addClass('compact').removeClass('detailed default');
	}else{
		jQuery('.artical-box').addClass('default').removeClass('detailed compact');
	}

	$(document).on('click', '.ticket-star-list', function(e)
	{
		e.preventDefault(); //STOP default action
		var $this = $(this);
		var starred_url = $(this).attr('url');
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			method: "get",
			url: starred_url,
			dataType: 'json',
			success: function(data) {
				if(data.res == 'success') {
					if(data.msg == 'starred') {
						$this.addClass('stared');
					} else if(data.msg == 'notstarred'){
						$this.removeClass('stared');
					}
				} else {
					alert('Something went wrong.');
				}
			}
		});
		
		return false;
		
	});

	jQuery(document).on('change', '#old-saved-reply', function () {
		var reply_id = jQuery(this, 'option:selected').val();
		var actionurl = jQuery(this).attr('actionurl')+'/'+reply_id;
		var delete_reply_url = jQuery("#delete-reply").attr('href');
		if(!reply_id) {
			jQuery('#reply-title').val('');
			jQuery('#reply-description').summernote("code", '');
			jQuery("#share_with_all").prop('checked', false);
			jQuery("#delete-reply").attr('href', delete_reply_url).hide();
			jQuery("#saved-reply-btn").text('Add Saved Reply');
			return false;
		}
		jQuery.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type: "GET",
			dataType: 'json',
			url: actionurl,
			success: function(data)
			{
				if(data.res == 'success') {

					jQuery('#reply-title').val(data.title);
					jQuery('#reply-description').summernote("code", data.description);
					jQuery("#share_with_all").prop('checked', false);
					jQuery("#delete-reply").attr('href', delete_reply_url+'/'+reply_id).show();
					jQuery("#saved-reply-btn").text('Update Saved Reply');
					if(data.share_with_all == '1') {
						jQuery("#share_with_all").prop('checked', true);
					}
				} else {
					alert('Something went wrong.');
					return false;
				}
			}
		});
		return false;

	});

	jQuery(document).on('click', '.save-reply-in-post', function () {
		event.preventDefault();
		var actionurl = jQuery(this).attr('href');
		jQuery.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type: "GET",
			dataType: 'json',
			url: actionurl,
			success: function(data)
			{
				if(data.res == 'success') 
				{
					jQuery('#TicketReply').summernote("code", data.description);
					jQuery("#replyModal").modal('hide');
				} 
				else 
				{
					alert('Something went wrong.');
					return false;
				}
			}
		});

	});

	jQuery(document).on('click', '.article-in-post', function () {
		
		event.preventDefault();

		var actionurl = jQuery(this).attr('href');
		var title = jQuery(this).attr('title');

		$('#TicketReply').summernote('createLink', {
			text: '<i class="fa fa-file"></i> '+title,
			url: actionurl,
			isNewWindow: true
		});
		jQuery("#ArticleModal").modal('hide');
	});

	jQuery(document).on('click', '.select-all-ticket', function () {
		
		event.preventDefault();
		jQuery(".assign-ticket-checkboxs").prop('checked', true);

	});

	jQuery(document).on('click', '.deselect-all-ticket', function () {
		
		event.preventDefault();
		jQuery(".assign-ticket-checkboxs").prop('checked', false);

	});

	jQuery(document).on('click', '.close-selected-ticket', function () {
		
		event.preventDefault();
		var checkedNum = $('.assign-ticket-checkboxs:checked').length;

		if(checkedNum > 0) {
	
			jQuery("#assign-ticket-close").submit();

		}

	});

	jQuery(document).on('click', '.reopen-selected-ticket', function () {
		
		event.preventDefault();
		var checkedNum = $('.assign-ticket-checkboxs:checked').length;

		if(checkedNum > 0) {
	
			jQuery("#assign-ticket-reopen").submit();

		}

	});

	jQuery(document).on('change', '#enable-autoresponder-msg', function () {
		if(jQuery(this).is(':checked')) {
			jQuery('.autoresponder-message-sec').show();
		} else {
			jQuery('.autoresponder-message-sec').hide();
		}
	});

	jQuery(document).on('change', '#disable-public-ticket', function () {
		if(jQuery(this).is(':checked')) {
			jQuery('#default-public-ticket-sec').hide();
		} else {
			jQuery('#default-public-ticket-sec').show();
		}
	});

	if ($('#custom-js-editor').length){
		var ace_js_editor = ace.edit("custom-js-editor");
		ace_js_editor.setTheme("ace/theme/monokai");
		ace_js_editor.getSession().setMode("ace/mode/javascript");
	}

	jQuery(document).on('change', '#system-logo', function() {
		
		if(jQuery(this).is(':checked')) {
			jQuery('.system-logo-sec').show();
		} else {
			jQuery('.system-logo-sec').hide();
		}

	});

	jQuery(document).on('change', '#system-favicon', function() {
		
		if(jQuery(this).is(':checked')) {
			jQuery('.system-favicon-sec').show();
		} else {
			jQuery('.system-favicon-sec').hide();
		}

	});

	jQuery(document).on('change', '#system-mobile-icon', function() {
		
		if(jQuery(this).is(':checked')) {
			jQuery('.system-mobile-icon-sec').show();
		} else {
			jQuery('.system-mobile-icon-sec').hide();
		}

	});

	jQuery(document).on('click', '.setting-upload-btn', function() {
		
		jQuery(this).parent().find('.setting-img-input').trigger('click');

	});

	jQuery(document).on('change', '#display-notice-message', function() {
		
		if(jQuery(this).is(":checked")) {
			jQuery("#notice-message-sec").show();
		} else {
			jQuery('#notice-message-sec').hide();
		}

	});

	jQuery(document).on('change', '#enable-welcome-message', function() {
		
		if(jQuery(this).is(":checked")) {
			jQuery("#system-welcome-message-sec").show();
		} else {
			jQuery('#system-welcome-message-sec').hide();
		}

	});

	jQuery(document).on('change', '#external-purchase-verification', function() {
		
		if(jQuery(this).is(":checked")) {
			jQuery("#purchase-verification-sec").show();
		} else {
			jQuery('#purchase-verification-sec').hide();
		}

	});

	jQuery(document).on('change', '#enable-envato-user-connect', function() {
		
		if(jQuery(this).is(":checked")) {
			jQuery("#envato-user-verify-sec").show();
		} else {
			jQuery('#envato-user-verify-sec').hide();
		}

	});

	jQuery(document).on('change', '#use-hero-image-checkbox', function() {
		
		if(jQuery(this).is(":checked")) {
			jQuery(".use-hero-image-sec").show();
		} else {
			jQuery('.use-hero-image-sec').hide();
		}

	});

	jQuery(document).on('click', '.system-tabs > li > a', function () {
		
		var system_label = jQuery(this).text();
		jQuery('.setting-heading').text(system_label);
	});

	jQuery(document).on('click', '.FlagButton', function () {
		
		var ticket_id = jQuery(this).attr('flagticketId');
		var flagUrl = $(this).attr('flagUrl');
		var $this = jQuery(this);
			
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type:       "POST",
			url:        flagUrl,
			data:       {'ticket_id':ticket_id}, // serializes the form's elements.
			dataType:   'json',
			success: function(data)
			{
				if(data.res == 'success') {

					if(data.type == 'add') {
						$this.closest('.comment-sec').addClass('flaged-ticket');
						$this.removeClass('fa-flag-o').addClass('fa-flag text-primary');
					} else if(data.type == 'remove') {
						$this.closest('.comment-sec').removeClass('flaged-ticket');
						$this.removeClass('fa-flag text-primary').addClass('fa-flag-o');
					}
				} 
			}
		});

	});

	jQuery(document).on('change', '#Notification-Email', function() {
		if(jQuery(this).is(':checked')) 
		{
			jQuery("#Notification-Email-Subject").show();
		} else 
		{
			jQuery("#Notification-Email-Subject").hide();
		}
	});

	jQuery(document).on('change', '.All-Notification', function() {
		if(jQuery(this).is(':checked')) 
		{
			jQuery(this).parents('tr').find('.Notification').prop('disabled', false);
		} else 
		{
			jQuery(this).parents('tr').find('.Notification').prop('disabled', true);
		}
	});

	

	/*Category page js start*/
	jQuery(document).on('change', '#EnvatoItemList', function() {
		var $this = jQuery(this);
		var item_title = $this.find("option:selected").data('item-title');
		var item_img = $this.find("option:selected").data('item-img');
		$('#cat-img-sec').css({'background-image':'url('+item_img+')', 'background-size':'cover'});
		$('#ProductCatImageSec').attr('src', item_img);
		$('.cat-add-icon').hide();
		jQuery("#Category-Name").val(item_title);
		jQuery("#Product-Title").val(item_title);
		jQuery("#Product-Image").val(item_img);
	});

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			var srcUrl = window.URL.createObjectURL(input.files[0]);
			reader.onload = function(e) {
				$('#cat-img-sec').css({'background-image':'url('+srcUrl+')', 'background-size':'cover'});
				$('.cat-add-icon').hide();
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
	
	jQuery(document).on("change", "#cat-img", function() {
		readURL(this);
	});
	
	jQuery("#ProductCatImage").on("change", function() {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			var srcUrl = window.URL.createObjectURL(this.files[0]);
			console.log(srcUrl);
			reader.onload = function(e) {
				$('#ProductCatImageSec').attr('src', srcUrl);
			}
			reader.readAsDataURL(this.files[0]);
		}
	});

	function readURL2(input) {
		if (input.files && input.files[0]) {

			var reader = new FileReader();
			var srcUrl = window.URL.createObjectURL(input.files[0]);

			reader.onload = function(e) {
				$(jQuery(input)).parent().find('.user-img').attr('src', srcUrl);
				$(jQuery(input)).parent().parent().parent().find('.remove-cat-img').hide();
				$(jQuery(input)).parent().parent().find('.old-logo').val('');

				var file_data = jQuery(input).prop('files')[0];   
				var cat_id = jQuery(input).data('cat-id');   
				var form_data = new FormData(document.getElementById("Category-Form"));                  
				form_data.append('category_file', file_data); 
				form_data.append('cat_id', cat_id); 
				jQuery.ajax({
						headers: {
							'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
						},
						url: cat_img_url,
						dataType: 'json',
						cache: false,
						contentType: false,
						processData: false,
						data: form_data,                         
						type: 'post',
						success: function(data){
							if(data.res == 'success') {
							} else {
								alert(data.msg);
								console.log(data.msg);
							}
						}
				});
		
			}
			reader.readAsDataURL(input.files[0]);
		}
	}

	jQuery(document).on("change", ".cat-img", function() {
		/*var alert_text = "You won't be able to revert this!";
		var sweet_alert = __sweet_alert(alert_text);
		if(!sweet_alert || typeof sweet_alert === "undefined") 
		{
			console.log(sweet_alert);
			return false;
		}*/
		readURL2(this);
	});
	/*Category page js end*/

	jQuery(document).on('change', "#EmailNotification", function() {
		jQuery('#EmailNotificationSec').collapse('toggle');
	});

	jQuery(document).on('change', "#WebNotification", function() {
		jQuery('#WebNotificationSec').collapse('toggle');
	});

	jQuery(document).on('change', "#SMSNotification", function() {
		jQuery('#SMSNotificationSec').collapse('toggle');
	});

	jQuery(document).on('change', '#Ticket-Subject-Category', function () {
		
		var $this = jQuery(this);
		var cat_id = $this.find('option:selected').val();
		if(get_article_by_cat_url === undefined){
			get_article_by_cat_url = '';
		} 	
		console.log(get_article_by_cat_url);
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type:       "POST",
			url:        get_article_by_cat_url,
			data:       {'cat_id':cat_id}, // serializes the form's elements.
			dataType:   'html',
			success: function(data)
			{
				jQuery('#Ticket-Subject-Articles').html(data); 
			}
		});

	});

	jQuery(document).on('change', '#TicketSubjectId', function() {
		var $this = jQuery(this);
		var ticket_title = $this.children("option:selected").data('title');
		var val = jQuery(this).val();
		var actionurl = jQuery(this).attr('rdx-link')+'/'+val;
		add_ticket_title(ticket_title, actionurl);
	});

	jQuery(document).ready(function() {
		var ticket_title = jQuery("#TicketSubjectId").children("option:selected").data('title');
		var val = jQuery('#TicketSubjectId').val();
		if(typeof val === 'undefined'){
			return;
		}
		var actionurl = jQuery("#TicketSubjectId").attr('rdx-link')+'/'+val;
		add_ticket_title(ticket_title, actionurl);
	});

	if(jQuery("#LaraApp-Title").length > 0)
	{
		jQuery("#LaraApp-Title").slug({hide:false});
	}

	/*$('#AddCustomerModelForm').on('submit', function() {
		event.preventDefault();
		var actionVal = $(this).attr('action');
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			type: "POST",
			url: actionVal,
			data:  $(this).serialize(), // serializes the form's elements.
			success: function(data)
			{
				jQuery('#UserId').append(data);
				jQuery('select.default-select').selectpicker('refresh');
				jQuery('#AddCustomerModel').modal('hide');
			}
		});
		return false;
	});*/

	jQuery(document).on('click', '.toggle-icon', function(){
		jQuery(this).toggleClass('active');
		jQuery('.support-menu').toggleClass('active');
	});

	/*==================== Sweet alert for delete record event start ====================*/
	/*
	* if you want to more custom text you can add data attr with deleteRecord class.
	*/
	jQuery(document).on('click', '.deleteRecord', function(){
		event.preventDefault();
		var alert_text = jQuery(this).data('alert_text');
		var link = jQuery(this).attr('href');
		deleteSweetAlert(alert_text, link);
	});

	function deleteSweetAlert(alert_text, link)
	{
		Swal.fire({
			title: 'Are you sure to delete?',
			text: alert_text,
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {
				window.location.href = link;
				return true;
			} else {
				return false;
			}
		})
	}
	/*==================== Sweet alert for delete record event end ====================*/


	

	/* ====================== Front create ticket page js start========================*/
	/*Show and hide purchase code section by category*/
	jQuery(document).on('change', '#product_category', function () {
		var purchase_code 	= jQuery('option:selected', this).attr('purchase-code');
		var category_id 	= jQuery('option:selected', this).val();
		var ticket_type 	= jQuery('.TicketType:checked').val();
		purchase_code 		= (ticket_type == 'pre_sale' || purchase_code == 'no') ? 'no' : 'yes';
		if(purchase_code == 'no') 
		{
			jQuery('#PurchaseCodeSec').hide();
			jQuery('#PurchaseCodeRequire').val(purchase_code);
		} 
		else 
		{
			jQuery('#PurchaseCodeRequire').val(purchase_code);
			jQuery('#PurchaseCodeSec').show();

		}
		jQuery('.CustomerInfoSec').show();

		//articles_by_category(category_id);

	});

	jQuery(document).on('change', '.TicketType', function () {
		var ticket_type 	= jQuery(this).val();
		var purchase_code 	= jQuery('option:selected', '#product_category').attr('purchase-code');
		if(ticket_type == 'pre_sale' || purchase_code == 'no') 
		{
			jQuery('#createTicketFormSubmitBtn').removeAttr('disabled');
			jQuery('#PurchaseCodeSec').hide();
			jQuery('#PurchaseCodeRequire').val(purchase_code);
		} 
		else 
		{
			jQuery('#createTicketFormSubmitBtn').attr('disabled','disabled');
			jQuery('#PurchaseCodeSec').show();
			jQuery('#PurchaseCodeRequire').val(purchase_code);
		}
	});

	jQuery(document).on('click', '#DefaultPlaceholder', function() {
		var $placeholder = jQuery("#PlaceholderSec").text();
		jQuery('#Placeholders').val($placeholder);
	});

	/* ====================== Created by Chandan ========================*/
	
	$(document).ready(function() {
		
		$(document).ready(function() {
			$('.assignedEmployeeCheck:checked').find(':input[type="number"]').removeAttr('disabled').show();
		    jQuery(document).on('change', '.assignedEmployeeCheck input:checkbox', function() {
		        if ($(this).is(':checked')) {
		            $(this).parents('.assignedEmployeeCheck').find(':input[type="number"]').removeAttr('disabled').show();
		        } else {
		            $(this).parents('.assignedEmployeeCheck').find(':input[type="number"]').attr('disabled', true).hide();
		        }
		    });
		});
	

	    /* */
		jQuery(document).on('change', '.assignedEmployeeCheck input:checkbox', function() {
			event.preventDefault();
			
			if ($(this).is(':checked')) {
				var alert_text = 'Are you Sure To Assign this Employee for this Project.';
				// var link = jQuery(this).attr('href');
				Swal.fire({
					title: 'Are you sure to Check?',
					text: alert_text,
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, Check it!'
				}).then((result) => {
					if (result.value) {
						return true;
					} else {
						$(this).prop('checked', false);	
						$('.assignedEmployeeCheck').find('input:text').attr('disabled', true).hide();
					}
				})
			}
		});
	


		/* */
	    jQuery(document).on('change', '.EmployeeBusinessSelectBox', function() {
	    	var	actionUrl = $(this).data('url');
	    	var	business_id = $(this).val();

	        jQuery.ajax({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				type: "POST",
				dataType: 'html',
                data: {'business_id':business_id},
				url: actionUrl,
				success: function(data)
				{
					if(data)
					{
						jQuery('.EmployeeDepartmentSelectBox').html(data);
					}
				}
			});
	    });


	    jQuery(document).on('change', '.EmployeeDepartmentSelectBox', function() {
	    	var	actionUrl = $(this).data('url');
	    	var	department_id = $(this).val();

	        jQuery.ajax({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				type: "POST",
				dataType: 'html',
                data: {'department_id':department_id},
				url: actionUrl,
				success: function(data)
				{
					if(data)
					{
						jQuery('.EmployeeDesignationSelectBox').html(data);
					}
				}
			});
	    });


	    jQuery(document).on('change', '.items-by-ajax', function() {
	    	var	actionUrl = $(this).data('url');
	    	var	model = $(this).data('model');
	    	var	value = $(this).val();

	    	if (model == 'sites') {
				jQuery('select[name="author"]').attr('data-site',value);		
	    	}
	    	if (model == 'author') {
	    		var	site = $(this).data('site');
	    		var data = {'id':value, 'model':model, 'site':site};
	    	}else {
	    		var data = {'id':value, 'model':model};
	    	}

	        jQuery.ajax({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				type: "POST",
				dataType: 'html',
                data: data,
				url: actionUrl,
				success: function(data)
				{
					if(data && model == 'author')
					{
						jQuery('select[name="attached_item_id"]').html(data);
					}
					else if(data && model == 'sites'){
						jQuery('select[name="author"]').html(data);
						
					}
				}
			});
	    });

	    jQuery(document).on('click', '.btnCopyLink', function() {
	    	var LinkId = $(this).data("link");
	    	var url = $('#'+LinkId).attr('href');
	    	 var $temp = $("<input>");
		    $("body").append($temp);
		    $temp.val(url).select();
		    document.execCommand("copy");
		    $temp.remove();
	    	alert('Link copied to clipboard.');
	   	});

	    jQuery(document).on('click', '.links-form-toggle', function() {
	    	if ($('.item-links-form').is(":hidden")) {
	    		jQuery('.item-links-form').show();
	    		jQuery('.item-links-box').hide();
	    	}
	    	else {
	    		jQuery('.item-links-form').hide();
	    		jQuery('.item-links-box').show();
	    	}	
	    });
		
		jQuery("a[data-toggle|='modal'], button[data-toggle|='modal']").on('click',function(e){
			e.preventDefault();
			var url 		  = jQuery(this).attr('href');
			var target 		  = jQuery(this).data('target');

			if(typeof target === "undefined" && target != '' && url != '' && url != '#' && typeof url === "undefined"){
				
				$.get(url, function(data) {
			        $(target).modal('show');
			        jQuery(target).find('.modal-content').html(data);
			    });
			}
		});

		//     jQuery(document).on('click', '.editProjectTeamToggle', function() {
		// 		var hideCheckbox = jQuery(this).attr('hideCheckbox');

		//         if (hideCheckbox == 'true') {
		//             $('.projectTeamInput').hide();
		//             $('.projectTeamCheckbox').show();
		// 			jQuery(this).attr('hideCheckbox', false);
		//         }
		//         else {
		//             $('.projectTeamInput').show();
		//         	$('.projectTeamCheckbox').hide();
		// 			jQuery(this).attr('hideCheckbox', true);
		//         }
		//     });



	    jQuery(document).on('change', '#product_category', function() {
	    	var product_id = jQuery('option:selected', this).data('product-id');
	    	if(typeof product_id != undefined && product_id)
	    	{
		    	window.history.replaceState(null, null, "?product_id="+product_id);
	    	}
	    	else
	    	{
	    		const currentURL = window.location.href;
    			const updatedURL = currentURL.replace(/(\?|&)product_id=([^&]*)/, '');
		    	window.history.replaceState(null, null, updatedURL);
	    	}
	    });

	    $('input[name="purchase_code"].check_purchase_code_ajax').blur(function() {
		    var $this = $(this);
		    var purchase_code = $(this).val();

		    // alert(purchase_code);
		    if (purchase_code != '') {
			    $.ajax({
					headers: {
						'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
					},
			        url: check_purchase_code_ajax_url,
			        method: 'POST', 
			        data:       {'purchase_code':purchase_code}, 
			        // dataType: 'json', 
			        success: function(response) {
			        	if (response.status == 0) {
			        		jQuery('#createTicketFormSubmitBtn').removeAttr('disabled');
							$('#ajaxResponseContainer').removeClass('text-danger').addClass('text-success');
			        	}else{
			        		jQuery('#createTicketFormSubmitBtn').attr('disabled','disabled');
							$('#ajaxResponseContainer').removeClass('text-success').addClass('text-danger');
			        	}
						$('#ajaxResponseContainer').html(response.message);
			        },
			        error: function(xhr, status, error) {
			            console.error('AJAX request failed');
			        }
			    });
		    }
		});

	});


})(jQuery);

function setting_img_preview(input, parent) {

	var file, img, file_width, file_height, file_size;

	if ((file = input.files[0])) {

		var file_size = file.size;
		var ext = input.value.split('.').pop().toLowerCase();

		$("#system-logo-img-err, #system-favicon-img-err, #system-mobile-icon-img-err").html("").removeClass('text-danger');
		if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
			$("#"+input.id+'-err').html("Please upload file having extensions .jpeg/.jpg/.png/.gif only.").addClass('text-danger');
			return false;
		}

		var reader = new FileReader();

		reader.onload = function (e) {

			img = new Image();
			img.src = e.target.result;
			var srcUrl = window.URL.createObjectURL(file);
		
			img.onload = function () {

				file_width = img.width;
				file_height = img.height;
				file_size = file.size;

				if(input.id == 'system-logo-img') {
					
					if(file_size > 5242880) {
						$("#system-logo-img-err").html("File size is greater than 5MB").addClass('text-danger');
						return false;
					}

				}

				if(input.id == 'system-favicon-img') {

					if(file_width > 32 || file_height > 32) {
						$("#system-favicon-img-err").html("Height and Width must not exceed 32px.").addClass('text-danger');
						return false;
					}

					if(file_size > 1048576) {
						$("#system-favicon-img-err").html("File size is greater than 1MB").addClass('text-danger');
						return false;
					}
				}

				if(input.id == 'system-mobile-icon-img') {
					
					if(file_width > 180 || file_height > 180) {
						$("#system-mobile-icon-img-err").html("Height and Width must not exceed 180px.").addClass('text-danger');
						return false;
					}

					if(file_size > 1048576) {
						$("#system-mobile-icon-img-err").html("File size is greater than 1MB").addClass('text-danger');
						return false;
					}

				}

				jQuery(input).parent().find('.logo-img-preview img').attr('src', srcUrl);
				jQuery(input).parent().find('.logo-img-preview').show();

			};

		}

		reader.readAsDataURL(file);

	}
}

function __sweet_alert(text)
{
	Swal.fire({
		title: 'Are you sure?',
		text: text,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.isConfirmed) {
			/*Swal.fire(
				'Deleted!',
				'Your file has been deleted.',
				'success'
			)*/
			return true;
		} else {
			return false;
		}
	})
}

function add_ticket_title(title, actionurl) {
	jQuery.ajax({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		},
		type: "GET",
		dataType: 'html',
		url: actionurl,
		success: function(data)
		{
			if(data)
			{
				jQuery('#CfContainer').html(data);
			}
			jQuery('#TicketTitle').val(title);
		}
	});
}

function articles_by_category(category_id) {
	
	if(typeof articles_by_category_url === 'undefined'){
		return;
	}
		
	jQuery.ajax({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		},
		type: "GET",
		dataType: 'html',
		url: articles_by_category_url+'/'+category_id,
		success: function(data)
		{
			if(data)
			{
				jQuery('#CategoryArticleSec').html(data);
			}
		}
	});
}

jQuery(document).ready(function() {
	if($("#dz_tree").length > 0)
	{
		$("#dz_tree").jstree({
	        "core": {
	            "themes": {
	                "responsive": false
	            }
	        },
	        "types": {
	            "default": {
	                "icon": "fa fa-folder"
	            },
	            "file": {
	                "icon": "fa fa-file-text"
	            }
	        },
	        "plugins": ["types"]
	    });
	}
});