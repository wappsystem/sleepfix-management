$('#D__ID').on('load',function(){
    $('#dev_password__ID').hide();
    if($vm.server=="development") $('#dev_password__ID').show();
    var record=$vm.vm['__ID'].input.record;
    $('#first_name__ID').text(record.First_Name);
    if(typeof(TP)!='undefined'){
        var h="http://127.0.0.1:8000/wappsystem/sleepfix-online-questionnaire/index.html?TP="+TP+"&username="+record.Email+"&password="+record.Password
        //var h="https://online-questionnaire.sfix.com.au/index.html?TP="+TP+"&username="+record.Email+"&password="+record.Password
        $('#link__ID').html("<a target=_blank href="+h+">"+h+"</a>");
    }
    if(TP=="AC") {$('#link__ID').html("Access Code = "+record.Access_Code);}
    uid=record.UID;
    email_to=record.Email;
    email_body=$('#email__ID').html();
})
//-----------------------------------------------
$('#send__ID').on('click',function(){
    var req={cmd:'send-email',db_pid:'20011578',qid:$vm.qid,To:email_to,Subject:email_subject,Body:email_body,Password:$('#dev_password__ID').val()}
    $VmAPI.request({data:req,callback:function(res){
        if(res.ret==1){
            $vm.alert("The email has been sent out to "+email_to);
            var data={Subject:email_subject,To:email_to,TP:v2}
            var dbv={S1:email_subject,S2:email_to,PUID:uid,V1:uid,V2:v2}
            var req={cmd:"add",qid:$vm.qid,db_pid:'20011579',data:data,dbv:dbv};
            $VmAPI.request({data:req,callback:function(res){
            }});
        }
        else{
            $vm.alert("Error");
        }
    }});
})
