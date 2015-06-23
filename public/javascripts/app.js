var events = {};

events.champTips = function() {
  var tst = $('.toggle-tips');
  var enemyTipsUl = $('.enemy-tips ul');
  var allyTipsUl = $('.ally-tips ul');

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


events.champTips()