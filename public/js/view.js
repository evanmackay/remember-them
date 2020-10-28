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

function isDate(date) {
    let patt = new RegExp('^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](18|19|20)\\d\\d$');
    let res = patt.test(date);
    return res;
};


//Enter a new member
$('.create-form').on('submit', (event) => {
    event.preventDefault();

    let arr = [];
    let arr2 = [];
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

    arr.push(first, last, branch, unit, awards, sos, dob, dod);
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

    for(i = 0; i < arr2.length; i++) {
        if(!isDate(arr2[i])) {
            err = true;
            $('#error').text('The date was entered in an invalid format. Please use MM/DD/YYY format.');
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
            date_of_birth: dob,
            date_of_death: dod,
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
            location.reload();
        })
        .catch((err) => {
            throw err;
        });
    }
});

//Approve new requests


//Delete new requests