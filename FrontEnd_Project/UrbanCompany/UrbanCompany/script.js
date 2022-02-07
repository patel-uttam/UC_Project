// nav fad in and out

(function($){
    $(document).ready(function(){
        $(".navscroll").hide();

        $(function(){
            $(window).scroll(function(){
                if($(this).scrollTop()>500)
                {
                    $(".navscroll").fadeIn();
                }
                else
                {
                    $(".navscroll").fadeOut();
                }
            });
        });
    });
}(jQuery));

//



// first sider
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

const track = document.querySelector('.track');
const carouselcontainerwidth = document.querySelector('.carousel-container').offsetWidth;

let nextWidth=288;
let prevWidth=0;
prev.style.visibility= `hidden`;
next.addEventListener('click',
() =>
{
if(nextWidth <= 2304)
{
    if(nextWidth+288 > 2304)
    {
        next.style.visibility= `hidden`;
    }
    track.style.transform = `translateX(-${nextWidth}px)`;
    prevWidth = nextWidth;
    nextWidth += 288;
    prev.style.visibility= `visible`;
    console.log("prevWidth  " + prevWidth + " && " + "nextWidth  " + nextWidth);
    
}
else
{
    next.style.visibility= `hidden`;
}
})

prev.addEventListener('click',
() =>
{

if(prevWidth >= 0 )
{
    if(prevWidth <=288)
    {
        prevWidth = 0;
        prev.style.visibility= `hidden`;
    }
    else
    {
        prevWidth -= 288;
        next.style.visibility= `visible`;
    }
    track.style.transform = `translateX(-${prevWidth}px)`;
    nextWidth = prevWidth+288;
    console.log("prevWidth  " + prevWidth + " && " + "nextWidth  " + nextWidth);
}
})


// 



// cleaning and pest slider 

const prev_clean_pest = document.querySelector('.prev-clean-slider');
const next_clean_pest = document.querySelector('.next-clean-slider');
const track_clean_pest = document.querySelector('.track-clean-slider');

let next_clean_pestWidth=288;
let prev_clean_pestWidth=0;

prev_clean_pest.style.visibility= `hidden`;

next_clean_pest.addEventListener('click',
() =>
{
if(next_clean_pestWidth <= 288)
{
    next_clean_pest.style.visibility= `hidden`;
    track_clean_pest.style.transform = `translateX(-${next_clean_pestWidth}px)`;
    prev_clean_pestWidth = next_clean_pestWidth;
    next_clean_pestWidth += 288;
    prev_clean_pest.style.visibility= `visible`;
    console.log("prev_clean_pestWidth  " + prev_clean_pestWidth + " && " + "next_clean_pestWidth  " + next_clean_pestWidth);
    
}
else
{
    next_clean_pest.style.visibility= `hidden`;
    
}
})

prev_clean_pest.addEventListener('click',
() =>
{

if(prev_clean_pestWidth >= 0 )
{
    if(prev_clean_pestWidth >= 288)
    {
        prev_clean_pestWidth = 0;
        prev_clean_pest.style.visibility= `hidden`;
        next_clean_pest.style.visibility= `visible`;
    }

    track_clean_pest.style.transform = `translateX(-${prev_clean_pestWidth}px)`;
    next_clean_pestWidth = prev_clean_pestWidth+288;
    console.log("prev_clean_pestWidth  " + prev_clean_pestWidth + " && " + "next_clean_pestWidth  " + next_clean_pestWidth);
}
})



// customer review


const prev_customer_review = document.querySelector('.prev-customerreview-slider');
const next_customer_review = document.querySelector('.next-customerreview-slider');
const track_customer_review = document.querySelector('.track-customerreview-slider');

let next_customer_reviewWidth=288;
let prev_customer_reviewWidth=0;

prev_customer_review.style.visibility= `hidden`;

next_customer_review.addEventListener('click',
() =>
{
if(next_customer_reviewWidth <= 864)
{
    if(next_customer_reviewWidth+288>=864)
    {
        next_customer_review.style.visibility= `hidden`;
    }

    track_customer_review.style.transform = `translateX(-${next_customer_reviewWidth}px)`;
    prev_customer_reviewWidth = next_customer_reviewWidth;
    next_customer_reviewWidth += 288;
    prev_customer_review.style.visibility= `visible`;
    console.log("prev_customer_reviewWidth  " + prev_customer_reviewWidth + " && " + "next_customer_reviewWidth  " + next_customer_reviewWidth);
    
}
else
{
    next_customer_review.style.visibility= `hidden`;
    
}
})

prev_customer_review.addEventListener('click',
() =>
{

if(prev_customer_reviewWidth >= 0 )
{
    if(prev_customer_reviewWidth <= 288)
    {
        prev_customer_reviewWidth = 0;
        prev_customer_review.style.visibility= `hidden`;
    }
    else
    {
        prev_customer_reviewWidth -=288;
        next_customer_review.style.visibility= `visible`;
    }

    track_customer_review.style.transform = `translateX(-${prev_customer_reviewWidth}px)`;
    next_customer_reviewWidth = prev_customer_reviewWidth+288;
    console.log("prev_customer_reviewWidth  " + prev_customer_reviewWidth + " && " + "next_customer_reviewWidth  " + next_customer_reviewWidth);
}
})
