//portions of the code via http://www.javascripter.net/faq/browserw.htm
var winW = 630, winH = 460;

//start new code

//document.writeln(cellW+'x'+cellH);
//document.writeln('gutter:'+gutter);

$(function() {
    //onload do these things
    reSizeCell();
    writeValues();

    $('.cell').click(function(){
        var who = this.id;  
        questionPop(who);
    });

    $('.proceed').click(function(){
        var who = $(this).parent()[0].id;
        //$(this).parent().hide('slow');
        answerPop(who);
        $(this).parent().hide(500);
    });

    $('.close').click(function(){
        console.log('closer');
        $(this).parent().hide('slow');
    });
});

$(window).resize(function() {
  //resize just happened, pixels changed
    reSizeCell();

});



function reSizeCell() {
    getWindowSize();
    var cellW = Math.floor((.9 * winW )/6);
    var cellH = Math.floor(cellW/1.618);
    var gutter = Math.floor((.1 * winW)/12-1);
    var fullW = 6 * cellW + 12 * gutter;
    var fullH = 6 * cellH + 12 * gutter;
    var textH = Math.floor(cellH * .55);
    $('.cell').css('width', cellW);
    $('.cell').css('height', cellH);
    $('.cell').css('margin', gutter);
    $('.cell').css('font-size', textH);
    $('.cell').css('line-height', cellH+'px');

    $('.top').css('font-size', textH/2);
    $('.top').css('line-height', textH/1.8+'px');

    $('.question').css('width',fullW);
    $('.question').css('height',fullH);

    $('.answer').css('width',fullW);
    $('.answer').css('height',fullH);

    $('.questionText').css('font-size', cellH);
    $('.questionText').css('width', cellW * 4 + 10*gutter);
    $('.questionText').css('margin-left', cellW);
    $('.questionText').css('margin-top', cellH);

    $('#wrap').css('width', fullW);
    console.log(winW+'/'+cellW+'/'+cellH+'/'+gutter)
}

function questionPop(who) {
    var whoq = '#'+who+'q';
    console.log(whoq);
    
    $(whoq).show();
}

function answerPop(who) {
    var whoa = '#' + who.substring(0, who.length - 1) + 'a';
    console.log(whoa);

    $(whoa).show().animate();
}



function getWindowSize() {

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

function writeValues(roundType) {
    $('.200').html('$200');
    $('.400').html('$400');
    $('.600').html('$600');
    $('.800').html('$800');
    $('.1000').html('$1000');
}