//-------------------------------------
m.set_req_export=function(i1,i2){
    var sql="with tb as (select Information,UID,PUID,DateTime,Author,RowNum=row_number() over (order by ID DESC) from [TABLE-"+m.db_pid+"-@S1] )";
    sql+="select Information,UID,PUID,DateTime,Author from tb where RowNum between @I1 and @I2";
    m.req={cmd:'read',qid:m.qid,sql:sql,i1:i1,i2:i2};
}
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
