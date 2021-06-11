/*
각 아이템이 어떤 역할을 하고, 어떤이미지를 갖고 있는지에대한 정보를 가진 객체정의
디자인적으로 또는 시각적으로 보여지는 클래스가 아니라, 아이템의 정보를 가진객체
*/

class ItemRole{
    constructor(role, src){
        this.role=role;
        this.src=src;
    }
}