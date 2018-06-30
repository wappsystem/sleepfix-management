//-------------------------------------
m.before_submit=function(record,dbv){
   var r=true; if(m.before_submit_2!=undefined) r=m.before_submit_2(record,dbv); if(r==false) { return false; }
   if(record.Participant_uid!=""){
       dbv.PUID=record.Participant_uid;
       dbv.S3=$vm.status_of_data(record);
   }
   return r;
};
//-------------------------------------
$('#new__ID').off('click').on('click',function(){$vm.load_module_v2(m.form_module,'',{goback:1})})
//-------------------------------------
$('#D__ID').on('load',function(){  if(m.preload==true) return; m.set_req(); m.request_data(); })
//-------------------------------------
