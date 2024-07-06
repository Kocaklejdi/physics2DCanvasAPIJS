class Controls{
    constructor(){
        this.left = false;
        this.right = false;
        this.down = false
        this.jump = false
        this.isInTheAir = false;
        this.handleControls()
    }
    handleControls(){
        document.addEventListener("keydown",(e)=>{
            if(e.key == "ArrowLeft"){
                this.left = true;
            }
            if(e.key == "ArrowRight"){
                this.right = true;
            }
            if(e.key == "ArrowDown"){
                this.down = true;
            }
            if(e.key == " "){
                this.jump = true;
            }
        })
        document.addEventListener("keyup",(e)=>{
            if(e.key == "ArrowLeft"){
                this.left = false;
            }
            if(e.key == "ArrowRight"){
                this.right = false;
            }
            if(e.key == "ArrowDown"){
                this.down = false;
            }
            if(e.key == " "){
                this.jump = false;
            }
        })
    }
}