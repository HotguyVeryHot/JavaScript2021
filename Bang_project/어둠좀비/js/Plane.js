/*
    비행기를 정의해본다!~!
    비행기라는 사용자 정의 자료형을 선언!!
*/
var createOne=0;
var createBlackBackground=0;
var blackArea;
var whiteCircle;
var flag=0;
var gameClear=false;
class Plane{
    //비행기가 어떤 특성을 가지고 태어날지를 결정!!
    constructor(container, src, width, height, x, y, velX, velY){
 
        //멤버변수 선언 및 초기화
        this.container=container; //비행기가 붙을 부모 요소
        this.img = document.createElement("img");
        this.src=src;
        this.width=width; 
        this.height=height;
        this.x=x;
        this.y=y;
        this.velX=velX; //주인공의 x 축으로의 속도를 결정
        this.velY=velY; //주인공의 y 축으로의 속도를 결정

        //멤버변수를 이용한 속성값 지정(스타일 속성 지정)
        this.img.src=src;
        this.img.style.width=this.width+"px"; 
        this.img.style.height=this.height+"px"; 
        this.img.style.position="absolute";
        this.img.style.zIndex=2;
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
        
        //화면에 부착
        this.container.appendChild(this.img);

    }
    tick(){
        this.x+=this.velX;//등속도 계속 누적     
        this.y+=this.velY;   
        
        // 주위 암흑
        if (createBlackBackground==0){
            blackArea=document.createElement("div");
            blackArea.style.position="absolute";
            blackArea.style.width=250+"px";
            blackArea.style.height=250+"px";
            blackArea.style.borderRadius=50+"%";            
            blackArea.style.left=this.x+"px";
            blackArea.style.top=this.y+"px";
            this.container.appendChild(blackArea);//생성된 텍스트 div 를 화면에 부착
            blackArea.style.zIndex=0;
            blackArea.style.border=3600+"px solid black";
            // blackArea.style.opacity=0;
            createBlackBackground=1;
        }else{
            blackArea.style.left=this.x-17.5-125-3570+"px";
            blackArea.style.top=this.y-25-125-3550+"px";
        }

        // 주위 빛
        if (createOne==0){
            whiteCircle=document.createElement("div");
            whiteCircle.style.position="absolute";
            whiteCircle.style.width=300+"px";
            whiteCircle.style.height=300+"px";
            whiteCircle.style.borderRadius=50+"%";
            whiteCircle.style.left=this.x+"px";
            whiteCircle.style.top=this.y+"px";
            whiteCircle.style.opacity=0.5;
            whiteCircle.style.zIndex=0;
            whiteCircle.style.background="radial-gradient(white 30%, black 70%)";
            whiteCircle.style.backgroundColor="white";
            this.container.appendChild(whiteCircle);//생성된 텍스트 div 를 화면에 부착
            createOne=1;
        }else{
            whiteCircle.style.left=this.x-17.5-110+"px";
            whiteCircle.style.top=this.y-25-100+"px";
        }

        //좌측 화면 밖으로 나가지 않도록!! 고정
        if(this.x<=0){ 
            this.x=0;
        }
        
        //나와 적군들과의 충돌체크 , 나의 hp만 죽고, 너죽고
        if(gameClear==false){
            for(var i=0;i<enemyArray.length;i++){
                
                if(hitTest(this.img , enemyArray[i].img)){ 
                    removeObject(this.container, enemyArray[i].img,  enemyArray, i);
                    removeObject(info, hpArray[hpArray.length-1].img, hpArray ,hpArray.length-1);//나의 hp제거
                    //주인공의 에너지가 모두 소진 되었는지... hp배열의 길이가 0이면...소진으로 본다
                    if(hpArray.length==0){
                            var div=document.createElement("div");
                            div.style.fontSize="200px";
                            div.style.textAlign="center"
                            div.style.color="#ffffff";
                            div.style.fontWeight="bold";
                            div.style.height=600+"px";
                            div.style.position="relative"
                            div.style.margin="auto"
                            div.style.zIndex=3;
                            div.innerHTML="당신은 죽었습니다.. <br><a href=\"javascript:location.reload()\">Retry</a>";
                            this.container.appendChild(div);//생성된 텍스트 div 를 화면에 부착
                    }
                }
            }
        }

        //아이템 취득 ( 아이템과의 충돌검사)
        for(var i=0; i<itemArray.length;i++){
            if(hitTest( this.img , itemArray[i].img)){//아이템과 충돌발견!!
                var itemRole = itemArray[i].itemRole;//주인공이랑 충돌한 한 아이템의 role

                removeObject(this.container, itemArray[i].img , itemArray, i);//사탕 제거
                flag=1;
            }
        }

        //열쇠 들고 탈출           
        if(hitTest(this.img , door.img)){
            if(flag==1){
                var div=document.createElement("div");
                div.style.fontSize="200px";
                div.style.textAlign="center"
                div.style.color="#ffffff";
                div.style.fontWeight="bold";
                div.style.height=600+"px";
                div.style.position="relative"
                div.style.zIndex=3;
                div.innerHTML="탈출 성공!! <br><a href=\"javascript:location.reload()\">Retry</a>";
                this.container.appendChild(div);//생성된 텍스트 div 를 화면에 부착
                flag=0;
                gameClear=true;                
            }
        }
    
        
        //console.log("this.x = ", this.x);
        if(this.x >= screen.width-this.width){ //우측 경계를 넘어서면 고정
            this.x=screen.width-this.width;
        }
    }

    //변경된 값을 화면에 보여주기 위한 그래픽 처리 (게임분야, 그래픽 분야에서는 랜더링)
    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }

}