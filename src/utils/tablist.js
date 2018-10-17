export const mergedata=(list)=>{
    let keys=[]    
    let obj={}
    list.forEach((val,ind)=>{
        let str=val.exhaust_str+'/'+val.max_power_str+' '+val.inhale_type
        if(keys.indexOf(str)!=-1){
            obj[str].push(val);
        }else{
            keys.push(str);
            obj[str]=[val]
        }
    }) 
    return obj;
}
    
export const sortdata=(list)=>{
    return list.sort((a,b)=>{
        if(a.exhaust!=b.exhaust){
            return a.exhaust-b.exhaust
        }else{
            if(a.max_power!=b.max_power){
                return a.max_power-b.max_power
            }else{
                if(a.inhale_type!=b.inhale_type){
                    return a.inhale_type-b.inhale_type
                }else{
                    return b.market_attribute.year-a.market_attribute.year
                }
            }
        }
    })
}

export const filterdata=(year,list)=>{
    // console.log(year,'year',list,'list')
    if(year=='全部'){
        return list
    }else{
        return list.filter((val,ind)=>{
            return val.market_attribute.year==year
        })
    }
}