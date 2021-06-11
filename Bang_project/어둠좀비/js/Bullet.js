/*총알을 정의한다*/
class Bullet{
    /*변수(Property), 함수(Method)*/

    constructor(container, src, width, height, x, y, velX, velY){
        //멤버변수 (객체와 생명을 같이 하는 변수)
        this.container=container;
        this.img=document.createElement("img");
        this.src=src;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX;
        this.velY=velY;
        
        //총알의 모습을 설정해본다!! 
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

    //물리량 변화
    tick(){
        this.x += this.velX;
        this.y += this.velY;
        
        //나(총알)와 적군들과의 충돌체크!! ( 총알인 나와 적군은 1:多 관계이다 )
        //화면에 존재하는 모든 적군을 대상으로 충돌검사!!
        //만일 적군과 총알인 내가 충돌하게 된다면, 제거 대상은 적군 뿐 아니라 나도 해당!!
        for(var i=0;i<enemyArray.length;i++){
            var hitResult=hitTest(this.img , enemyArray[i].img); //객체 자체는 무형의 단위일뿐 style 을 가질수없다.
            // 그 객체의 인스턴스가 가진 멤버변수 중 우리는 img를 사용할 것임...
            if(hitResult){
                removeObject(this.container, enemyArray[i].img , enemyArray, i); //적군 제거                
                removeObject(this.container, this.img , bulletArray, bulletArray.indexOf(this)); //총알 제거                
            }
        }

        //총알은 날아가다가, 자신이 스크린을 벗어 난다면, 자살
        if(this.x > screen.width ){
            //console.log("저 스스로 죽을께요");
            //console.log("화면끝네 도달한 저는요 바로 ", this);
            var index = bulletArray.indexOf(this);
            //console.log("저는 bulletArray의 ", index , " 번째에 살고있어요");
            removeObject(this.container , this.img, bulletArray, index); //총알배열의 크기에 변경사항생김
        }
    }

    //그래픽 적 처리 
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }
}