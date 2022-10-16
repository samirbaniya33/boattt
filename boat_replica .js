const togglebtn = document.getElementsByClassName("toggle-btn")[0];

const navelements = document.getElementsByClassName("nav-elements")[0];

const carousel = document.getElementsByClassName("carousel")[0];

const category = document.getElementsByClassName("categories")[0];

const card_container = document.getElementsByClassName("card-container")[0];

console.log(carousel);

togglebtn.addEventListener("click", ()=>{
  navelements.classList.toggle('active');
  //carousel.style.top = '300'+'px';
  carousel.style.transform = 'translateY(300px)';

  //both above format works for putting below navbar
  category.style.transform = 'translateY(300px)';
  card_container.style.transform = 'translateY(300px)';
   
})




//carousel

const track = document.querySelector('.carousel_track');

//when i click left move slides to the left
//when i click right move slides to the right
//when i click the nav indicators move to that slide

const slides = Array.from(track.children);

const prevButton = document.querySelector('.carousel_btn_left');
const nextButton = document.querySelector('.carousel_btn_right');

const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

console.log(slideSize);
console.log(slideWidth);

//slides[0].style.left= slideWidth*0 + 'px';
//slides[1].style.left=slideWidth*1 + 'px';
//slides[2].style.left=slideWidth*2 + 'px';

/*slides.forEach((slide,index)=>{
  slide.style.left = slideWidth*index+'px';
})*/
//another way of doing the above thing by declaring it in a function

const setSlidePosition = (slide,index)=>{
   slide.style.left = slideWidth*index +'px';
}
slides.forEach(setSlidePosition);

//when i click left





/*
//when i click right 

nextButton.addEventListener('click',e=>{
  const currSlide = track.querySelector('.current_slide');
  console.log(currSlide);
  const nextSlide = currSlide.nextElementSibling;
  //above line movet to the next slide
  
  const amountToMove = nextSlide.style.left;
  //below changing entire track to the left
  track.style.transform = 'translateX(-' + amountToMove + ')';
  
  //bel to change current slide
  
  currSlide.classList.remove('current_slide');
  nextSlide.classList.add('current_slide');
})
*/


//when i click left and right above lines via function

const moveToSlide = (track, currentSlide, targetSlide) =>{
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; 
  
  currentSlide.classList.remove('current_slide');
  targetSlide.classList.add('current_slide');
  
}

//for updating dots

const updateDots = (currentDot, targetDot) =>{
  currentDot.classList.remove('current_slide');
  targetDot.classList.add('current_slide');
  
}

//for hiding arrows
const hideShowArrows = (slides,prevButton, nextButton, targetIndex) =>{
  if(targetIndex===0){
    prevButton.classList.add('is_hidden');
    nextButton.classList.remove('is_hidden');
  
  }else if(targetIndex === slides.length-1){
    console.log(targetIndex);
    prevButton.classList.remove('is_hidden');
    nextButton.classList.add('is_hidden');
  }else {
    prevButton.classList.remove('is_hidden');
    nextButton.classList.remove('is_hidden');
  }
  
}

// for right 
nextButton.addEventListener('click',e=>{
  const currentSlide = track.querySelector('.current_slide');
  const nextSlide = currentSlide.nextElementSibling;
  
  //dots
  const currentDot = dotsNav.querySelector('.current_slide');
  const nextDot = currentDot.nextElementSibling;
  
  const nextIndex = slides.findIndex(slide =>slide===nextSlide);
  
  
  updateDots(currentDot, nextDot);
  
  moveToSlide(track, currentSlide, nextSlide);
  hideShowArrows(slides,prevButton,nextButton,nextIndex);

  
})
// for left

prevButton.addEventListener('click', e=>{
  const currentSlide = track.querySelector('.current_slide');
  const prevSlide = currentSlide.previousElementSibling;
  
  const currentDot = dotsNav.querySelector('.current_slide');
  const previousDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide =>slide===prevSlide);

  
  updateDots(currentDot, previousDot);
  moveToSlide(track, currentSlide, prevSlide);
  hideShowArrows(slides,prevButton,nextButton,prevIndex);

})


// when i click left right indicatores move to that slide

dotsNav.addEventListener('click',e=>{
  //what indicator was clicked on
  const targetDot = e.target.closest('button');
  console.log(targetDot);
  
  if(!targetDot) return; 

  const currentSlide = track.querySelector('.current_slide');
  const currentDot = dotsNav.querySelector('.current_slide');

  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex];
  
  moveToSlide(track,currentSlide,targetSlide);
  updateDots(currentDot, targetDot);
  
  hideShowArrows(slides,prevButton,nextButton,targetIndex);
  

})

