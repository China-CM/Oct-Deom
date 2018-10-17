export function lazyLoad(el){
    function inView(ele){
        let rect=ele.getBoundingClientRect();
        if(rect.left>0 && rect.left < window.innerWidth && rect.top>0 && rect.top<window.innerHeight){
            return true;
        }
        return false;
    }
    /**
     *判断图片是否已经加载
     *
     * @param {*} ele
     * @returns
     */
    function isDeal(ele){
        return ele.src == ele.dataset.src;
    }
    
    function deal(){
        let nodes=[...document.querySelectorAll('img[data-src]')]
        nodes.forEach((item)=>{
            if( inView(item) && !isDeal(item) ){
                item.src=item.dataset.src;
            }
        })
    }
    deal();
    if(el){
        document.querySelector(el).addEventListener('scroll',deal);
    }else{
        window.onscroll = deal;
    }
}