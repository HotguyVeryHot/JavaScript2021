/*적군을 정의한다*/
class Enemy{
    /*
    상태: 변수(속성)
    동작: 함수(메서드)
    */
    constructor(container, src, width, height, x, y, velX, velY){
        this.container=container;
        this.img=document.createElement("img");
        this.src=src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX;
        this.velY=velY;

        
        //적군의 모습을 설정해본다!! 
        this.img.src=this.src;

        //크기
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";

        //위치        
        this.img.style.position="absolute";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
        this.img.style.zIndex=0;
        
        
        //부모 요소에 부착
        this.container.appendChild(this.img);
    }   
    
    tick(){
        this.x += this.velX;
        this.y += this.velY;

        // 어둠속 좀비 발견
        // if(areaTest(this.img , whiteCircle)){
        // }

        //내가 화면의 음수값을 가질때 즉 좌측 한계점을 지나면, 제거 
        if(this.x <0){
            removeObject(this.container, this.img, enemyArray , enemyArray.indexOf(this));
        }
    } 
    
    //그래픽 적 처리 
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }
}