var champs = {};
champs._currentVotes = [];

champs.champTips = function() {
  var tst = $('.toggle-tips');
  var enemyTipsUl = $('.enemy-tips ul');
  var allyTipsUl = $('.ally-tips ul');

  allyTipsUl.show();

  tst.on('click', function() {
    var $this = $(this);
    if ($this.hasClass('enemy-tips')) {
      allyTipsUl.hide();
      enemyTipsUl.fadeIn();
    } else {
      enemyTipsUl.hide();
      allyTipsUl.fadeIn();
    }
  })
}

champs.showBattleData = function() {
  var moreInfo = $('.battle-data-button .more-info');
  var lessInfo = $('.battle-data-button .less-info');
  var battleData = $('.battle-data');
  var showing = false;

  moreInfo.on('click', function() {
    battleData.slideDown('fast');
    moreInfo.hide();
    lessInfo.show();
    return false;
  });

  lessInfo.on('click', function() {
    battleData.slideUp('fast');
    lessInfo.hide();
    moreInfo.show();
    return false;
  });
}

champs.searchChampion = function() {
  var cfilter = $('#champ-filter');
  var champpa = $('.champ').parent();

  cfilter.on('keyup click input', function() {
    if (this.value.length > 0) {
      champpa.hide().filter(function() {
        return $(this).data('name').toLowerCase().lastIndexOf(cfilter.val().toLowerCase(), 0) != -1;
      }).show();
    }
    else {
      champpa.show();
    }
  });
}

champs.spellHover = function() {
  var spells = $('.champ-spells .spell');
  var spellImage = $('.champ-spells .spell img');

  spells
    .on('mouseenter', function() {
      console.log($(this).next('img'))
      $(this).find('img').css({
        'padding-bottom': '75px'
      })
    })

    .on('mouseleave', function() {
      $(this).find('img').css({
        'padding-bottom': '0px'
      })
    })
}

champs.showTenCounters = function() {
  var badAgainst  = $('.bad-against .champ');
  var goodAgainst = $('.good-against .champ');
  var tenBad = badAgainst.slice(0, 10);
  var tenBadii = badAgainst.slice(10, 20);
  var tenGood = goodAgainst.slice(0, 10);
  var tenGoodii = goodAgainst.slice(10, 20);
  var showMoreBad = $('.bad-against .more-champs');
  var showLessBad = $('.bad-against .less-champs');
  var showMoreGood = $('.good-against .more-champs');
  var showLessGood = $('.good-against .less-champs');

  showLessBad.hide();
  showLessGood.hide();
  tenBadii.hide();
  tenGoodii.hide();

  function showMoreEvent(x) {
    return x.bind('click', function() {
      var p = $(this).parent().first();

      if (p.data('gorb') === 'bad') {
        console.log('badddd');
        tenBadii.slideDown('fast');
        showMoreBad.hide();
        showLessBad.show();
      }
      else if (p.data('gorb') === 'good') {
        console.log('goooooododo');
        tenGoodii.slideDown('fast');
        showMoreGood.hide();
        showLessGood.show();
      }
      return false;
    })
  }

  function showLessEvent(x) {
    return x.bind('click', function() {
      var p = $(this).parent().first();

      if (p.data('gorb') === 'bad') {
        tenBadii.slideUp('fast');
        showLessBad.hide();
        showMoreBad.show();
      }
      else if (p.data('gorb') === 'good') {
        tenGoodii.slideUp('fast');
        showLessGood.hide();
        showMoreGood.show();
      }
      return false;
    })
  }

  showMoreEvent(showMoreBad);
  showMoreEvent(showMoreGood);
  showLessEvent(showLessBad);
  showLessEvent(showLessGood);
}

champs.vote = function() {
  var lc = $('#champion-page');
  var votes = $('.votes').children();

  votes.on('click', function() {
    var $this  = $(this);
    var lcname = lc.data('landingchamp');
    var cname  = $this.closest('.champ').data('champ');
    var gorb   = $this.closest('.col-md-6').data('gorb');
    var uord   = $this.attr('class');
    var count  = $this.find('span');
    var data   = { lc: lcname, gorb: gorb, c: cname };
    var unid   = lcname+gorb+cname+uord;

    console.log(unid, uord, champs._currentVotes);

    // if unique string isnt in champs._currentVotes
    // therefor it hasnt been clicked this page load
    if (champs._currentVotes.indexOf(unid) === -1) {
      champs._currentVotes.push(unid);

      var countToNum = +count.text();
      countToNum++;
      count.text(countToNum.toString());

      castVote(uord, data);
    }
    else { console.log('shits already in there!'); }
    return false;
  })

  function castVote(uord, data) {
    $.ajax({
      url: '/'+uord, // /upvote, /downvote
      method: 'POST',
      data: data
    }).done(function(x) {
      console.log('request send, heres the response: ', x);
    }).fail(function(jqxhr, ts) {
      console.log('fail!', ts);
    });
  }
}