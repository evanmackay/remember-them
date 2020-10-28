
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

    let arr = [];
    let arr2 = [];
    let first = $('#first').val().trim();
    let last = $('#last').val().trim();
    let unit = $('#unit').val().trim();
    let awards = $('#awards').val().trim();
let sos = $('#sos').val().trim();
let dob = $('#dob').val().trim();
let dod = $('#dod').val().trim();

arr.push(first, last, unit, awards, sos);
arr2.push(dob, dod);


//Input validation functions

// Input validation functions

function isEmpty(val) {
    if(!val) {
        return true;
    }
};



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

function isDate(date) {
    let patt = new RegExp('^(0[1-9]|1[012])[- /.] (0[1-9]|[12][0-9]|3[01])[- /.] (19|20)\d\d$');
    let res = patt.test(date);
    return res;
};
// function isDate(date) {
//     let patt = new RegExp('^(0[1-9]|1[012])[- /.] (0[1-9]|[12][0-9]|3[01])[- /.] (19|20)\d\d$');
//     let res = patt.test(date);
//     return res
// };


//Enter a new member
$('.create-form').on('submit', (event) => {
    event.preventDefault();

    let arr = [];
    let arr2 = [];
    let err;
    let first = $('#first').val().trim();
    let last = $('#last').val().trim();
    let unit = $('#unit').val().trim();
    let awards = $('#awards').val().trim();
    let sos = $('#sos').val().trim();
    let dob = $('#dob').val().trim();
    let dod = $('#dod').val().trim();


    arr.push(first, last, unit, awards, sos, dob, dod);
    arr2.push(dob, dod);

    //Validate all fields in the form
    for(i = 0; i < arr.length; i++) {
        if(isEmpty(arr[i])) {
            err = true;
            $('#error').text('None of the above fields can be left blank');
        } else {
            err = false;
        }
    };

    // for(i = 0; i < arr2.length; i++) {
    //     if(!isDate(arr2[i])) {
    //         err = true;
    //         $('#error').text('The date entered was invalid. Please use the MM/DD/YYY format');
    //     } else {
    //         err = false;
    //     }
    // };

    //If there are no errors, data is pushed to the DB
    if(!err) {
        const newMember = {
            first_name: $('#first').val().trim(),
            last_name: $('#last').val().trim(),
            age: $('#age').val(),
            date_of_birth: $('#dob').val().trim(),
            date_of_death: $('#dod').val().trim(),
            branch_of_service: $('#BoS').val().trim(),
            unit: $('#unit').val().trim(),
            awards: $('#awards').val().trim(),
            summary_of_service: $('#sos').val().trim()
        }

        
        $.ajax('/api/servicemembers/SEALs', {


        console.log(newMember);
    
        $.ajax('/SEALs', {
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

    }     
});

