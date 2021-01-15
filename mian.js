var windowssele=window.getSelection();
            var sele_rang;            
            var get_pid={
                /**
                 *  返回 [开始id][寻id途径子元素][结束id][寻id途径子元素]
                 */                                       
                where(){
                    let stendate=[];
                    sele_rang=windowssele.getRangeAt(0);
                    let sten=sele_rang.startContainer;                    
                    // console.log(sele_rang);                    
                    stendate=this.for_to_id(sten);
                    sten=this.for_to_id(sele_rang.endContainer);
                    stendate.push(sten[0],sten[1]);
                    return stendate;                 
                },                              
                for_to_id(sten){
                    let nodenames=[];
                    // console.log(sten.id.slice(0,2))
                    for(;sten.id.slice(0,2)!="pa";){
                        // sten=sten
                        if(sten.id=="intext")break;
                        nodenames.push(sten.localName);
                        sten=sten.parentElement;
                    }
                    if(sten.id.slice(0,2)=="pa"){
                        if(p_start.changeone){
                            p_start.onework(sten);
                        }
                        return [sten.id,nodenames]
                    }else{
                        console.error("未找到指定区域的id");
                        return [null,null];
                        }
                }
            }

            var p_start={
                id:7,
                changeone:false,
                newone(){
                    this.changeone=true;
                    sten=get_pid.for_to_id(windowssele.getRangeAt(0).startContainer);
                },
                onework(st){
                    st.id="pa"+this.id;
                    this.id++;
                    this.changeone=false;
                }
            }

        $(document).ready(function () {
            // $("#intext br").css({
            // "background-color":"#5557",
            // "height":"10px",
            // "width":"10px"
            // })
            // $("#intext").keyup(e=>{
            // console.log(e.keyCode);
            // switch(e.keyCode){
            //     case 81:{
            //         if(e.ctrlKey){
            //             console.log(get_pid.where());
            //         }
            //         break;}
   
            // }
            // })
            $("#intext").keypress(e=>{
                switch(e.keyCode){                    
                    case 13:{
                        setTimeout(function(){
                            p_start.newone();          
                        },0);
                    }    
                }
            })
        });
        
        