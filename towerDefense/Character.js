class Character{
    constructor(x,y,w,h, walls){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.walls = walls
        this.yCurrent = this.y;
        this.yBeggining = this.y;
        this.horizontalSpeed = 0;
        this.verticalSpeed = 0;
        this.gravity = -0.2
        this.isFalling = true;
        this.jumpheight = -20;
        this.canSwitch = true;
        this.controls = new Controls()

    }
    AABB(B){
        const AisToTheRightOfB = this.x > B.x + B.w;
        const AisToTheLeftOfB = this.x + this.w < B.x;
        const AisAboveB = this.y + this.h < B.y;
        const AisBelowB = this.y > B.y + B.h;
        return !(AisToTheRightOfB
            || AisToTheLeftOfB
            || AisAboveB
            || AisBelowB);
    }
    checkCollisions(other){
        this.walls.forEach(wall => {
            if(this.AABB(wall)){
                if(this.horizontalSpeed < 0){
                    this.x = wall.x + wall.w  + 0.01
                }
                if(this.horizontalSpeed > 0){
                    this.x = wall.x - this.w - 0.01
                }
            }
        });
        this.verticalSpeed += this.gravity
        this.y += this.verticalSpeed
        this.walls.forEach((wall) => {
            if(this.AABB(wall)){
                if(this.verticalSpeed < 0){
                    this.y = wall.y + wall.h + 0.01
                    
                    if(this.gravity < 0){
                        this.isFalling = false
                    }
                }
                if(this.verticalSpeed > 0){
                    this.y = wall.y - this.h - 0.01
                    this.explosionRadius = this.verticalSpeed * 5;
                    ctx.beginPath()
                    ctx.ellipse(this.x,this.y,this.explosionRadius,this.explosionRadius,0,0,2*3.141592,false)
                    ctx.stroke()
                    this.walls.forEach((thisWall,i)=>{
                        if(((this.x - thisWall.x)*(this.x - thisWall.x) +(this.y - thisWall.y)*(this.y - thisWall.y)) < this.explosionRadius * this.explosionRadius){
                            this.walls.splice(i,1)
                        }
                    })
                    if(this.gravity > 0 ){
                        this.isFalling = false
                    }
                    
                }
                this.verticalSpeed = 0
            }
        });


    }
    update(){
        this.horizontalSpeed = 0;

        if(this.controls.left){
            this.horizontalSpeed = -6;
        }
        if(this.controls.right){
            this.horizontalSpeed = 6;
        }
        if(this.controls.jump && !this.isFalling){
            if(this.gravity > 0){
                this.verticalSpeed = this.jumpheight;
            }else{
                this.verticalSpeed = -this.jumpheight;
            }

            this.isFalling = true
        }
        if(this.y + this.h + this.verticalSpeed > height){
            this.y = height - this.h
            this.isFalling = false;
            this.verticalSpeed = 0;
        }
        if(this.verticalSpeed > 0 && this.gravity > 0){
            this.isFalling = true
        }
        if(this.verticalSpeed < 0 && this.gravity < 0){
            this.isFalling = true
        }
        if(this.controls.down && this.canSwitch){
            this.canSwitch = false
            this.gravity *= -1
            setTimeout(()=>{
                this.canSwitch = true
            },1000)
        }
        this.x += this.horizontalSpeed
    }
    showSelf(ctx){
        ctx.fillStyle = "rgb(255,0,0)"
        ctx.fillRect(this.x,this.y,this.w,this.h)
    }
}