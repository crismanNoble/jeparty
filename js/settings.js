$(function() {
    //onload do these things:

    //watch for a team number change
    $('#teamNumber').change(function(){
        changeTeamNumber($('#teamNumber').val());
    });

    //watch for category changes
    $('.cat').change(function(){
        changeCat(this.id,$(this).val());
    });
    
});

function changeCat(which,what) {
    console.log(which + ' and ' + what);
}

function changeTeamNumber(howMany) {
    console.log(howMany);
}
