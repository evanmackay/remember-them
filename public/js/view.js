
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



//Input validation function declarations
function isEmpty(val) {
    if(!val) {
        return true;
    }
};

  



//Enter a new member
$('.create-form').on('submit', (event) => {
    event.preventDefault();
    let arr = [];
    let err;
    let img = $('#fileToUpload').val().trim();
    let first = $('#first').val().trim();
    let last = $('#last').val().trim();
    let age = $('#age').val();
    let branch = $('#branch').val().trim();
    let unit = $('#unit').val().trim();
    let awards = $('#awards').val().trim();
    let sos = $('#sos').val().trim();
    let dob = $('#dob').val().trim();
    let dod = $('#dod').val().trim();
    let convertedDate;
    

    function dateConversion(date) {
        const d = new Date(date);
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        convertedDate = `${da}-${mo}-${ye}`
        return convertedDate
        // console.log(convertedDate);

    }

    console.log(img)

    arr.push(first, last, branch, unit, awards, sos, dob, dod);

    //Validate all fields in the form
    for(i = 0; i < arr.length; i++) {
        if(isEmpty(arr[i])) {
            err = true;
            $('#error').text('None of the above fields can be left blank');
        } else {
            err = false;
        }
    };

    //If there are no errors, data is posted
    if(!err) {
        const newMember = {
            image: img,
            first_name: first,
            last_name: last,
            branch_of_service: branch,
            age: age,
            date_of_birth: dateConversion(dob),
            date_of_death: dateConversion(dod),
            unit: unit,
            awards: awards,
            summary_of_service: sos
        };

        $.ajax('/SEALs', {
            method: 'POST',
            data: newMember
        })
        .then(() => {
            console.log('Member added');
            // console.log(newMember.date_of_birth)
            location.reload();
        })
        .catch((err) => {
            throw err;
        });
    }
});

//Approve a new submission
$('#approve').on('click', function(event) {
    console.log('UPDATE triggered');
    let id = $(this).data('id');

    let status = {
        approved: true
    };

    $.ajax('/SEALs/' + id, {
        method: 'PUT',
        data: status
    })
    .then(() => {
        console.log('Entry approved!');
        location.reload();
    })
    .catch((err) => {
        console.log(err);
    });
});

//Delete a new submission
$('#delete').on('click', function(event) {
    console.log('DELETE triggered');
    let id = $(this).data('id');

    $.ajax('/SEALs/' + id, {
        method: 'DELETE'
    })
    .then(() => {
        console.log('Entry has been deleted');
        location.reload();
    })
    .catch((err) => {
        console.log(err);
    });
});

