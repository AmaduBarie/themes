if(jQuery('.summernote_description').length > 0 ){

	jQuery('.summernote_description').summernote({

		toolbar: [

			['view', ['codeview']],

			['font', ['bold', 'italic']],

			['para', ['ul', 'ol', 'paragraph']],

			['insert', ['link']],

		],
		callbacks: {
		    onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

}



/*Ticket Detail Page Js Start*/

if(jQuery('#TicketReply').length > 0 ){

	var ReplyButton = function (context) {

		var ui = jQuery.summernote.ui;

		var button = ui.button({

			contents: '<i class="las la-comment-dots scale5 mr-2" ></i> Replies',

			tooltip: 'Save Replies',

			click: function () {

			},

			data: {

				toggle: "modal",

				target: "#replyModal",

			},

		});

		return button.render();   // return button as jquery object

	}

	var ArticleButton = function (context) {

		var ui = jQuery.summernote.ui;

		var button = ui.button({

			contents: '<i class="las la-copy scale5 mr-2"></i> Articles',

			tooltip: 'Articles',

			click: function () {

			},

			data: {

				toggle: "modal",

				target: "#ArticleModal"

			},

		});

		return button.render();   // return button as jquery object

	}

	

	jQuery('#TicketReply').summernote({

		toolbar: [

			['view', ['codeview']],

			['font', ['bold', 'italic']],

			['para', ['ul']],

			['insert', ['picture', 'link']],

			['mybutton', ['reply','article']],

		],

		buttons: {

			reply: ReplyButton,

			article: ArticleButton

		},

		placeholder: 'Add to this conversation...',

		//maximumImageFileSize: 5242880,

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});  

		

}

if(jQuery('#TicketNote').length > 0 ){

	   $('#TicketNote').summernote({

		toolbar: [

			['view', ['codeview']],

			['font', ['bold', 'italic']],

			['para', ['ul', 'ol', 'paragraph']],

			['insert', ['link']],

		],

		placeholder: 'Add a note...',

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

}



if(jQuery('#CustomerNote').length > 0 ){

	$('#CustomerNote').summernote({

		toolbar: [

			['font', ['bold', 'italic']],

			['para', ['ul', 'ol', 'paragraph']],

			['insert', ['link']],

		],

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

}



jQuery(document).on('click', '.TicketReplyBtn', function() {

	var $this = jQuery(this);

	var reply_type = $this.data('reply-type');

	jQuery(".PostNoteSec, .CustomerNoteSec, .ReplyCommentSec").removeClass('active').hide();

	jQuery("#TicketDetailReplySec").removeClass('active-reply active-note active-customer-note');

	if(reply_type == 'ticket-comment')

	{

		jQuery("#TicketDetailReplySec").addClass('active-reply');

		jQuery(".ReplyCommentSec").addClass('active').show();

	}

	if(reply_type == 'ticket-note')

	{

		jQuery("#TicketDetailReplySec").addClass('active-note');

		jQuery(".PostNoteSec").addClass('active').show();

	}

	if(reply_type == 'customer-note')

	{

		jQuery("#TicketDetailReplySec").addClass('active-customer-note');

		jQuery(".CustomerNoteSec").addClass('active').show();

	}



});



$(".CancleTicketReply").on("click", function() {

	jQuery(".PostNoteSec, .CustomerNoteSec, .ReplyCommentSec").removeClass('active').hide();

	jQuery("#TicketDetailReplySec").removeClass('active-reply active-note active-customer-note');

	$("#TicketReply").summernote("code", '');

	$("#TicketNote").summernote("code", '');

	$("#CustomerNote").summernote("code", '');

});

/*Ticket Detail Page Js End*/



if(jQuery('#reply-description').length > 0 ){

	jQuery('#reply-description').summernote({

		toolbar: [

			['view', ['codeview']],

			['font', ['bold', 'italic']],

			['para', ['ul']],

			['insert', ['picture', 'link']],

			['code'],

		],

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}


	});

}



if(jQuery('.setting-textarea').length > 0 ){

		

	$('.setting-textarea').summernote({

		toolbar: [

			['view', ['codeview']],

			['font', ['bold', 'italic']],

			['insert', ['link']],

		],

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

	  

}



if(jQuery('.system-welcome-message').length > 0 ){

	

	$('.system-welcome-message').summernote({

		toolbar: [

			['style', ['style']],

			['view', ['codeview']],

			['font', ['bold', 'italic', 'strikethrough']],

			['para', ['ul']],

			['insert', ['picture', 'table', 'link', 'hr']],

		],

		styleTags: [

			'p', 'pre', 'h2', 'h3', 'h4',

		],

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

	  

}



if(jQuery('.NotificationContent').length > 0 ){

	jQuery('.NotificationContent').summernote({

		toolbar: [

			['view', ['codeview']],

			['font', ['bold', 'italic']],

			['para', ['ul', 'ol', 'paragraph']],

			['insert', ['link']],

		],

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

}



if(jQuery('.ticket_description').length > 0 ){

	jQuery('.ticket_description').summernote({

		toolbar: [

			['style', ['style']],

			['font', ['bold', 'italic']],

			['para', ['ul', 'ol']],

			['insert', ['link']],

		],

		height: 200,

		styleTags: [ 'pre' ],

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

}



if(jQuery('.Customer-Reply').length > 0 ){

	jQuery('.Customer-Reply').summernote({

		toolbar: [

			['style', ['style']],

			['font', ['bold', 'italic']],

			['para', ['ul', 'ol']],

			['insert', ['link']],

		],

		height: 200,

		styleTags: [ 'pre' ],

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

}

if(jQuery('#AboutBusiness').length > 0 ){

	jQuery('#AboutBusiness').summernote({

		toolbar: [

			['style', ['style']],

			['font', ['bold', 'italic']],

			['para', ['ul', 'ol']],

			['insert', ['link']],

		],

		height: 200,

		styleTags: [ 'pre' ],

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

}

if(jQuery('#PageContent, #BlogContent').length > 0 ){

	jQuery('#PageContent, #BlogContent').summernote({

		height: 200,

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
	        onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

}

if(jQuery('.CommanDescription').length > 0 ){

	jQuery('.CommanDescription').summernote({

		height: 200,

		callbacks: {
		    onPaste: function (e) {
                if (document.queryCommandSupported("insertText")) {
                    var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                    setTimeout(function () {
                        document.execCommand('insertText', false, bufferText);
                    }, 10);
                    e.preventDefault();
                } else {
                    var text = window.clipboardData.getData("text")
                    setTimeout(function () {
                        document.execCommand('paste', false, text);
                    }, 10);
                    e.preventDefault();
                }
             
            },
            onImageUpload : function(files, editor, welEditable) {
	             for(var i = files.length - 1; i >= 0; i--) {
	                     sendFile(files[i], this);
	            }
	        }
	  	}

	});

}

function sendFile(file, el) {

	if(typeof upload_editor_image_url != 'undefined')
	{
		var form_data = new FormData();
		form_data.append('editor_image', file);
		console.log(form_data);
		$.ajax({
			headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
		    data: form_data,
		    type: "POST",
		    url: upload_editor_image_url,
		    cache: false,
		    contentType: false,
		    processData: false,
		    success: function(url) {
		        $(el).summernote('editor.insertImage', url);
		    }
		});
	}
}