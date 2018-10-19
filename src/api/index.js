const host = /localhost/.test(window.location.host)?'http://baojia-test.chelun.com':'https://baojia.chelun.com';
function sendRequest(url, method = 'GET', data = {}){
    let params = {
        method
    };
    if (method == 'POST'){
        params.body = JSON.stringify(data);
    }
    if (url.indexOf('?') == -1){
        url += `?_=${+new Date()}`
    }else{
        url += `&_=${+new Date()}`
    }
    return fetch(host+url, params).then(res=>res.json()).then(body=>body);
}
export let getBrandList = ()=>{
    return sendRequest('/v2-car-getMasterBrandList.html');
}
export let getMakeList = (id)=>{
    return sendRequest(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
}
export let getdetailList = (id)=>{
    return sendRequest(`/v2-car-getInfoAndListById.html?SerialID=${id}`);
}
export let getlowpricedata = (obj) =>{
    return sendRequest(`/v2-dealer-alllist.html?carId=${obj.carId}&cityId=${obj.cityId}&_1539312444103`)
}
export let getimgdata=(obj)=>{
    // console.log(obj,'adjaldjwkldkladjakldjaskldjaskldjskaldsjklajkl')
    if(obj.ColorID){
        return sendRequest(`/v2-car-getImageList.html?SerialID=${obj.SerialID}&ColorID=${obj.ColorID}`)
    }else if(obj.CarID){
        return sendRequest(`/v2-car-getImageList.html?SerialID=${obj.SerialID}&CarID=${obj.CarID}`)
    }else{
        return sendRequest(`/v2-car-getImageList.html?SerialID=${obj.SerialID}`)
    }
}
// https://baojia.chelun.com/v2-car-getImageList.html?SerialID=2593&_1539862562888
// https://baojia.chelun.com/v2-car-getImageList.html?SerialID=2593&ColorID=23110&_1539862084753
// https://baojia.chelun.com/v2-car-getImageList.html?SerialID=2593&_1539865006378
// https://baojia.chelun.com/v2-car-getImageList.html?SerialID=2593&CarID=126282&_1539865648400

export let getimgdetail=(param)=>{
    let search=``;
    for(let i in param){
        search+=`&${i}=${param[i]}`;
    }
    if(!param['Page']){
        search+=`&Page=1`;
    }
    if(!param['PageSize']){
        search+=`&PageSize=30`;
    }
    // console.log(`/v2-car-getCategoryImageList.html?SerialID=${search.slice(1,search.length)}&_1539588570809`)
    return sendRequest(`/v2-car-getCategoryImageList.html?${search.slice(1,search.length)}`);
}
// https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=4765&ImageID=6&Page=1&PageSize=30&_1539588570809

//地理位置
export let getcitydata=()=>{
    return sendRequest(`/v1-city-alllist.html?`)
}
export let getprovincedata=(ids)=>{
    return sendRequest(`/v1-city-alllist.html?provinceid=${ids}`)
}


//颜色
export let getcolordata=(ids)=>{
    return sendRequest(`/v2-car-getModelImageYearColor.html?SerialID=${ids}`)
}
// https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID=2593&_1539700937076

// http://baojia-test.chelun.com/v2-car-getImageList.html?SerialID=2593&_=1539874783536
// https://baojia.chelun.com/v2-car-getImageList.html?SerialID=2593&_=1539874835211