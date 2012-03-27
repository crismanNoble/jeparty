//set minimum witdh and height, for browsers without defaults
var winW = 630, winH = 460;
var who = '';
var winningTeam = 0;

$(function() {
    //setup keyboard shortcuts 
     $(document).shortkeys({
        'G': function () { console.log('g'); },
        'M': function () { console.log('M'); },
        'U': function () { unlockAnswers(); },
        'N': function () { answerPop(who); },
        'Q': function () { race('team1'); },
        'P': function () { race('team2'); },
        'C': function () { pointAdder('correct'); },
        'V': function () { pointAdder('incorrect'); }
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) { closeAll(); }
    });
    //onload do these things
    reSizeCell();
    writeValues();
    //watch for a click on a cell
    $('.cell').click(function(){
        who = this.id;
        if ($(this).hasClass('expired')) {
            // prevent the question from coming up
            return false;
        }
        questionPop(who);
        lockAnswers();
    });
    //watch for a click on the proceed
    //need to have a shortcut here as well
    $('.proceed').click(function(){
        //$(this).parent().hide('slow');
        console.log(who);
        answerPop(who);
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
    if (winW>1.3*winH){
        winW = 1.3*winH;
    }
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
    //$('#wrap').css('margin-top', 2*gutter);
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
    //the teams styles
    $('.teams').css('width', cellW*3 + 4*gutter);
    $('.teams').css('margin', gutter);
    $('.teams').css('font-size', textH);
    //the question styles
    $('.question').css('width',fullW-2*gutter);
    $('.question').css('height',fullH-2*gutter);
    $('.question').css('margin',gutter);
    $('.questionText').css('font-size', cellH);
    $('.questionText').css('width', cellW * 4 + 10*gutter);
    $('.questionText').css('margin-left', cellW);
    $('.questionText').css('margin-top', cellH);

    $('.proceed').css('width', cellW*3 + 4*gutter);
    //the answer styles
    $('.answer').css('width',fullW-2*gutter);
    $('.answer').css('height',fullH-2*gutter);
    $('.answer').css('margin',gutter);
    $('.answerText').css('font-size', cellH);
    $('.answerText').css('width', cellW * 4 + 10*gutter);
    $('.answerText').css('margin-left', cellW);
    $('.answerText').css('margin-top', cellH);
}

function pointAdder(value) {
    console.log(value);
    closeAll();
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
        winningTeam = parseInt(team.charAt(4));
        console.log(winningTeam);
        $('.'+team).addClass('winner');
        answerable = 0;
    }
}

function closeAll() {
    //hide both the question and the answer
    $('.question').hide('slow');
    $('.answer').hide('slow');
    $('.team1').removeClass('winner');
    $('.team2').removeClass('winner');
}

function questionPop(who) {
    var whoq = '#'+who+'q';
    console.log(whoq);
    $(whoq).show('slow');
}

function answerPop(who) {
    var whoa = '#' + who + 'a';
    $(whoa).show();
    $('#'+who).addClass('expired');
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