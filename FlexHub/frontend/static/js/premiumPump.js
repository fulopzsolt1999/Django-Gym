document.querySelectorAll('.exercise-image').forEach(image => {
   image.addEventListener('mouseenter', () => {
      image.querySelector('.bubble').style.display = 'block';
   });
   image.addEventListener('mouseleave', () => {
      image.querySelector('.bubble').style.display = 'none';
   }); 
});