//set minimum witdh and height, for browsers without defaults
var winW = 630, winH = 460;
var who = '';
var winningTeam = 0;
var bounty = 0;
var team1Score = 0;
var team2Score = 0;
var team3Score = 0;
var numTeams = 2;

$(function() {
    //setup keyboard shortcuts 
     $(document).shortkeys({
        'U': function () { unlockAnswers(); }, //depreciated
        'N': function () { answerPop(who); },
        'M': function () { closeAll(); },
        'Q': function () { race('team1'); },
        'P': function () { race('team2'); },
        'L': function () { race('team3'); },
        'Z': function () { FJ(); },
        'S': function () { FJa(); },
        'C': function () { pointAdder('correct'); },
        'V': function () { pointAdder('incorrect'); },
        'K': function () { showKeyboard(); },
        'I': function () { showInfo(); },
        'S': function () { showSettings(); },
        'H': function () { toggleHelp(); }
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) { closeAll(); }
    });
    //onload do these things
    reSizeCell();
    writeValues();
    //watch for a click on a cell
    $('.cell').click(function(){
        //figure out who got clicked and how much it is worth
        who = this.id;
        howMuch = $(this)[0].classList[1];
        //you can't click a previously clicked cell!
        if ($(this).hasClass('expired')) {
            return false;
        }
        questionPop(who);
        setBounty(howMuch);
        lockAnswers();
    });
    //watch for a click on the proceed
    //need to have a shortcut here as well
    $('.proceed').click(function(){
        console.log(who);
        answerPop(who);
    });

    $('.close').click(function(){
        closeAll();
    });

    //infoBar Controls
    $('#closeInfo').click(function(){
        console.log('close the info bar');
        toggleHelp();
    });
    $('#iconInfo').click(function(){
        console.log('show the information');
    });
    $('#iconSettings').click(function(){
        console.log('show the settings');
    });
    $('#iconKeyboard').click(function(){
        console.log('show the keyboard shortucts');
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

    $('.sentanceText').css('font-size', cellH/1.5);
    $('.sentanceText').css('width', cellW * 4 + 10*gutter);
    $('.sentanceText').css('margin-left', cellW);
    $('.sentanceText').css('margin-top', cellH/2);
    //chage if 3 teams!
    if (numTeams == 2) {
        $('.proceed').css('width', cellW*3 + 4*gutter);
        $('.teams').css('width', cellW*3 + 4*gutter);
        console.log(numTeams);
    } else if (numTeams == 3) {
        $('.proceed').css('width', cellW*2 + 2*gutter);
        $('.teams').css('width', cellW*2 + 2*gutter);
        console.log(numTeams);
    }
    
    //the answer styles
    $('.answer').css('width',fullW-2*gutter);
    $('.answer').css('height',fullH-2*gutter);
    $('.answer').css('margin',gutter);
    $('.answerText').css('font-size', cellH);
    $('.answerText').css('width', cellW * 4 + 10*gutter);
    $('.answerText').css('margin-left', cellW);
    $('.answerText').css('margin-top', cellH);
}

function setBounty(points){
    console.log(points + 'points availible');
    bounty = Number(points);
}

var pointable =0;

function pointAdder(value) {
    //determine who might get points
    if( !pointable ) {
        return false;
    }
    console.log(winningTeam);
    //get their points
    var teamPoints;
    if (winningTeam == 'team1') {
        teamPoints = team1Score;
    } else if (winningTeam == 'team2') {
        teamPoints = team2Score;
    } else {
        teamPoints = team3Score;
    }
    console.log(winningTeam + ' has ' + teamPoints);
    //add or subtract the points
    console.log('they answered ' + value);
    if (value == 'correct') {
        teamPoints = teamPoints + bounty;
    } else {
        teamPoints = teamPoints - bounty;
    }

    if (winningTeam == 'team1') {
        team1Score = teamPoints;
    } else if (winningTeam == 'team2') {
        team2Score = teamPoints;
    } else {
        team3Score = teamPoints;
    }

    console.log('they now have' + teamPoints);
    var whoToChange = '#'+winningTeam+'Score';
    $(whoToChange).html('$'+teamPoints);
    pointable = 0;
    sentancePop(who);

}

var answerable = 0;

function unlockAnswers() {
    answerable = 1;
    console.log('question is unlocked');
}

function lockAnswers() {
    answerable = 0;
    console.log('question is locked');
}

function race(team) {
    if (answerable == 1){
        winningTeam = team;
        $('.'+team).addClass('winner');
        answerable = 0;
        console.log('winning team was ' + team);
    } else {
        console.log('question is still locked')
    }
}

function closeAll() {
    //hide both the question and the answer
    $('.question').hide('slow');
    $('.answer').hide('slow');
    $('.team1').removeClass('winner');
    $('.team2').removeClass('winner');
}

function sentancePop(who) {
    var whos = '#'+who+'s';
    $('.'+winningTeam).removeClass('winner');
    console.log(whos);
    $(whos).show();
}

function questionPop(who) {
    var whoq = '#'+who+'q';
    console.log(whoq);
    $(whoq).show('slow',function(){
        unlockAnswers();
    });
}

function answerPop(who) {
    var whoa = '#' + who + 'a';
    $(whoa).show();
    $('#'+who).addClass('expired');
    pointable = 1;
}

function FJ() {
    $('#FJ').show('slow');
}

function FJa() {
    $('#FJa').show();
}

function toggleHelp() {
    $('#infoBar').toggleClass('hide');
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
    $('#team1Score').html('$'+team1Score);
    $('#team2Score').html('$'+team2Score);
    $('#team3Score').html('$'+team3Score);
}