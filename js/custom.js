//set minimum witdh and height, for browsers without defaults
var winW = 630, winH = 460;

$(function() {
    //setup keyboard shortcuts 
     $(document).shortkeys({
        'G': function () { console.log('g'); },
        'M': function () { console.log('M'); },
        'U': function () { unlockAnswers(); },
        'Q': function () { race('team1'); },
        'P': function () { race('team2'); }
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) { closeAll(); }
    });
    //onload do these things
    reSizeCell();
    writeValues();
    //watch for a click on a cell
    $('.cell').click(function(){
        var who = this.id;  
        questionPop(who);
        lockAnswers();
    });
    //watch for a click on the proceed
    //need to have a shortcut here as well
    $('.proceed').click(function(){
        var who = $(this).parent()[0].id;
        //$(this).parent().hide('slow');
        answerPop(who);
        $(this).parent().hide(500);
    });

    $('.close').click(function(){
        console.log('closer');
        closeAll();
        //$(this).parent().hide('slow');
    });
});


$(window).resize(function() {
  //resize just happened, pixels changed, change the pixels!
    reSizeCell();
});

function reSizeCell() {
    //first find the window size
    getWindowSize();
    //determine some of the depndant sizes
    var cellW = Math.floor((.9 * winW )/6);
    var cellH = Math.floor(cellW/1.618);
    var gutter = Math.floor((.1 * winW)/12-1);
    var halfGutter = Math.floor(gutter/2);
    var fullW = 6 * cellW + 12 * gutter;
    var fullH = 6 * cellH + 12 * gutter;
    var textH = Math.floor(cellH * .53);
    //use the varibles and write them into the css
    $('#wrap').css('width', fullW);
    //$('body').css('padding-top', 2*gutter);
    $('#wrap').css('margin-top', 2*gutter);
    console.log(winW+'/'+cellW+'/'+cellH+'/'+gutter);
    //cell styles
    $('.cell').css('width', cellW);
    $('.cell').css('height', cellH);
    $('.cell').css('margin', gutter);
    $('.cell').css('font-size', textH);
    $('.cell').css('line-height', cellH+'px');
    //the category row styles
    $('.top').css('font-size', textH/2);
    $('.top').css('line-height', textH/1.8+'px');
    $('.top').css('width', cellW - 2*halfGutter);
    $('.top').css('height', cellH - 2*halfGutter);
    $('.top').css('padding', halfGutter);
    //$('.top').css('margin-top', 2*gutter);
    //the question styles
    $('.question').css('width',fullW);
    $('.question').css('height',fullH);
    $('.questionText').css('font-size', cellH);
    $('.questionText').css('width', cellW * 4 + 10*gutter);
    $('.questionText').css('margin-left', cellW);
    $('.questionText').css('margin-top', cellH);
    $('.question').css('padding-bottom', gutter);
    //the answer styles
    $('.answer').css('width',fullW);
    $('.answer').css('height',fullH);
    $('.answer').css('padding-bottom', gutter);
    $('.answerText').css('font-size', cellH);
    $('.answerText').css('width', cellW * 4 + 10*gutter);
    $('.answerText').css('margin-left', cellW);
    $('.answerText').css('margin-top', cellH);
}

var answerable = 0;

function unlockAnswers() {
    answerable = 1;
    console.log(answerable);
}

function lockAnswers() {
    answerable = 0;
    console.log(answerable);
}

function race(team) {
    if (answerable == 1){
        console.log(team);
        answerable = 0;
    }
}

function closeAll() {
    //hide both the question and the answer
    $('.question').hide('slow');
    $('.answer').hide('slow');
}
function questionPop(who) {
    var whoq = '#'+who+'q';
    console.log(whoq);
    $(whoq).show('slow');
}

function answerPop(who) {
    var whoa = '#' + who.substring(0, who.length - 1) + 'a';
    console.log(whoa);
    $(whoa).show();
    var who = whoa.substring(0, whoa.length - 1);
    $(who).addClass('expired');
    console.log(who + 'should have class expired');
}

function getWindowSize() {
    //portions of the code via http://www.javascripter.net/faq/browserw.htm
    if (document.body && document.body.offsetWidth) {
     winW = document.body.offsetWidth;
     winH = document.body.offsetHeight;
    }
    if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth ) {
     winW = document.documentElement.offsetWidth;
     winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
     winW = window.innerWidth;
     winH = window.innerHeight;
    }
};

//this wil write the money values, depending of if it is double jeapardy
function writeValues(roundType) {
    $('.200').html('$200');
    $('.400').html('$400');
    $('.600').html('$600');
    $('.800').html('$800');
    $('.1000').html('$1000');
}