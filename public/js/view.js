var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });





  
$('#create').on('submit', (event) => {
    event.preventDefault();

    const newMember = {
        first_name: $('#first').val().trim(),
        last_name: $('#last').val().trim(),
        age: $('#age').val().trim(),
        date_of_birth: $('#dob').val().trim(),
        date_of_death: $('#dod').val().trim(),
        unit: $('#unit').val().trim(),
        awards: $('#awards').val().trim(),
        summary_of_service: $('#sos').val().trim()
    }

    $.ajax('/api/servicemembers/SEALs', {
        method: 'POST',
        data: newMember
    })
    .then(() => {
        console.log('Member added');
        location.reload();
    })
    .catch((err) => {
        throw err;
    });
});
