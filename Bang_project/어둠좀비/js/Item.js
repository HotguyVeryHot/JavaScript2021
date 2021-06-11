/*
아이템을 정의한다!!
*/
class Item{
    constructor(itemRole ,container, width, height, x, y, velX, velY){
        this.itemRole=itemRole; //각 아이템은 보유할 정보객체
        this.container=container;
        this.img=document.createElement("img");
        this.src=itemRole.src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX;
        this.velY=velY;
        
        //아이템의 모습을 설정해본다!! 
        this.img.src=this.src;

        //크기
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";
        

        //위치        
        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";

        //부모 요소에 부착
        this.container.appendChild(this.img);
    }   

    tick(){
        this.x += this.velX;
        this.y += this.velY;
    } 
    
    //그래픽 적 처리 
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }    
}