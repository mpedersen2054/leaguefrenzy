var events = {};

events._currentVotes = [];

events.champTips = function() {
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

events.showBattleData = function() {
  var moreInfo = $('.more-info');
  var lessInfo = $('.less-info');
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

events.searchChampion = function() {
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

events.spellHover = function() {
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

events.showTenCounters = function() {
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

events.clickUpvote = function() {
  var lc = $('#champion-page');
  var up = $('.votes .upvote');

  up.on('click', function() {
    var $this = $(this);
    var cname  = $this.closest('.champ').data('champ');
    var lcname = lc.data('landingchamp');
    var gorb   = $this.closest('.col-md-6').data('gorb');
    var count  = $this.find('span');
    var data   = { lc: lcname, gorb: gorb, c: cname };
    var unid   = lcname+gorb+cname;

    if (events._currentVotes.indexOf(unid) === -1) {
      events._currentVotes.push(unid);

      // string to num, inc num, back to string, insert
      var countToNum = +count.text();
      countToNum++;
      count.text(countToNum.toString());

      $.ajax({
        url: '/counter',
        method: 'POST',
        data: data
      }).done(function(x) {
        console.log('request send, heres the response: ', x);
      }).fail(function(jqxhr, ts) {
        console.log('fail!', ts)
      });
    }
    else {
      console.log('already in ther!!!!')
    }

    console.log(events._currentVotes)

    return false;
  });
}

events.clickDownvote = function() {
}

$(function() {
  events.champTips();
  events.showBattleData();
  events.searchChampion();
  events.spellHover();
  events.showTenCounters();
  events.clickUpvote();
  events.clickDownvote();
})