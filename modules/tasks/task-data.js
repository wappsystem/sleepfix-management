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
m.set_req_export=function(i1,i2){
    var sql="with participant as (select Participant_uid=UID,RowNum=row_number() over (order by PUID) from [TABLE-20011505])";
    sql+=",tb as (select PUID,Information,DateTime from [TABLE-"+m.db_pid+"-@S1] ) ";
    sql+="select Participant_uid,Information,DateTime from participant left join tb on PUID=Participant_uid where RowNum between @I1 and @I2";
	m.req={cmd:'read',qid:m.qid,sql:sql,i1:i1,i2:i2};
}
//-------------------------------------
