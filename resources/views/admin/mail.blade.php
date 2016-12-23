@extends('layouts.admin')

@section('content')
<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.css">
<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/theme/monokai.css">
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/codemirror.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/3.20.0/mode/xml/xml.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/codemirror/2.36.0/formatting.js"></script>
<link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.css" rel="stylesheet">




<label style="font-size: 20px;" >To:</label>
<div class="radio" style="padding-left: 10px; margin-top: -10px;">
    <label>
        <input type="radio" class="radioInput" name="toRadio" id="admin" value="admin" checked="checked">
        Admin
    </label>
    <!--<br>-->
    <label>
        <input type="radio" class="radioInput" name="toRadio" id="user" value="user" >
        Users
    </label>
    <!--<br>-->
    <label>
        <input type="radio" class="radioInput" name="toRadio" id="all" value="all" >
        All
    </label>
</div>



<input type="text" name="subject" id="subject" class="form-control" placeholder="Subject" required="required" pattern="" title="">
<br>

<div id="summernote" ></div>

<div id="divsendMail" class="pointer" style=" align-items: center;">    
    <span class="">
        <button type="button" class="btn btn-primary col-xs-12 col-sm-12 col-md-12" style="outline: none;">Send Mail</button>
    </span>    
</div>
@endsection

@section('scripts')

<script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.2/summernote.js"></script>
<script>
    $(document).ready(function() {
        $('#summernote').summernote({
            height: 300,                 // set editor height
            minHeight: null,             // set minimum height of editor
            maxHeight: null,             // set maximum height of editor
            focus: false
        });  
        $('#divsendMail').on('click',function(){
            var markupStr = $('#summernote').summernote('code');
            $('#summernote').summernote('reset');
            var radioSelected = $('input[name=toRadio]:checked').val();
            var count = 1;
            var subject = $('input[name=subject]').val();
            $('input[name=subject]').val('');
            console.log(subject);
            swal({
                title: "Send mail to "+radioSelected,
                text: "Mail will be send to all people in the group.",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, send it!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false,
                showLoaderOnConfirm: true,
                inputPlaceholder: "Message from admin"
                },
                function(isConfirm){  
                if ( isConfirm) {
                    $.ajax({
                        type: "POST",
                        url: '/admin/mail',
                        data: {to:radioSelected, toCount:count, subject:subject, body:markupStr},
                        beforeSend: function (request) {
                            return request.setRequestHeader('X-CSRF-Token', $("meta[name='csrf-token']").attr('content'));
                        },
                        success: function(response) {
                            console.log(response);
                            swal({title: "Mail queued", text: "Mail will be been send shortly.",timer: 1000, type: "success", showConfirmButton: false});
                        },
                        error: function(response) {
                            swal({title: "Error in sending. Please try after sometime.", type: "error", cancelButtonText: "Okay",closeOnConfirm: false,closeOnCancel: false});
                        }
                    })               
                } else {
                    swal({title: "Cancelled", text: "",timer: 800, type:"error", showConfirmButton: false});
                }
            });
        });
    });
</script>
@endsection