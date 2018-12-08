const dataRanking = [
  {
    ranking: '1',
    name: 'Ichsan Indra Wahyudi',
    skor: '19904',
  },
  {
    ranking: '2',
    name: 'Irwanto',
    skor: '11604',
  },
  {
    ranking: '3',
    name: 'Rendi Christian',
    skor: '19904',
  },
  {
    ranking: '4',
    name: 'Ariel Noah',
    skor: '9904',
  },
  {
    ranking: '5',
    name: 'Ryan aja',
    skor: '9904',
  },
  {
    ranking: '6',
    name: 'Mbo Dharmi',
    skor: '9904',
  },
  {
    ranking: '+9999',
    name: 'Mpok ella',
    skor: '9904',
  },
];

$(document).ready(function() {
  initDataRanking();
});

function initDataRanking(params) {
  resultsRanking(dataRanking);
  $('#js_ranking__count').text(dataRanking.length);
}

function resultsRanking(obj) {
  $('#js_ranking__count').text('');
  $('#js_ranking-list').empty();
  for (const key of obj) {
    const listRank = `
      <div class="row">
        <div class="col-9">
          <div class="ranking__item">
            <div class="ranking__item-num">
              <span>${key.ranking}</span>
            </div>
            <div class="ranking__item-name">
              <span>${key.name}</span>
            </div>
          </div>
        </div>
        <div class="col-3">
          <span class="ranking__score">${key.skor}</span>
        </div>
      </div>
    `;

    $('#js_ranking-list').append(listRank);
  }
}

function handleSearchingNotFound(type) {
  if (type) {
    $('#js_ranking').hide();
    $('#js_ranking-empty-search').addClass('ranking__not-found--show');
  } else {
    $('#js_ranking').show();
    $('#js_ranking-empty-search').removeClass('ranking__not-found--show');
  }
}

$(function handleSearchRanking() {
  $('#js_search-ranking').on({
    input: function(e) {
      let _self = $(this);

      if (_self.val()) {
        _self.siblings().addClass('unf-searchbar__close--show');
      } else {
        _self.siblings().removeClass('unf-searchbar__close--show');
      }
    },
    keypress: function(e) {
      const results = [];
      let val = $(this).val();
      if (val) {
        if (e.which == 13) {
          for (let i = 0; i < dataRanking.length; i++) {
            for (key in dataRanking[i]) {
              if (
                dataRanking[i][key].toLowerCase().indexOf(val.toLowerCase()) !=
                -1
              ) {
                results.push(dataRanking[i]);
              }
            }
          }
          if (results != 0) {
            resultsRanking(results);
          } else {
            handleSearchingNotFound(true);
          }
        }
      } else {
        initDataRanking();
        handleSearchingNotFound(false);
      }
    },
  });
});

$(function handleResetSearchRanking() {
  $('#js_reset-search-ranking').on({
    click: function() {
      let input = $('#js_search-ranking');
      input.val('');
      input.siblings().removeClass('unf-searchbar__close--show');
      initDataRanking();
    },
  });
});

// Reminder

$(function handleBtnReminder() {
  $('.js_reminder-btn--same').on({
    click: function() {
      let _self = $(this);
      console.log(_self);
      if (_self.hasClass('quiz__program-reminder')) {
        _self.toggleClass('unf-btn--transparent');
        if (_self.hasClass('unf-btn--transparent')) {
          _self.text('Hapus Pengingat');
          showToaster(
            'Pengingat berhasil terpasang. Notifikasi akan dikirim saat NET. Play dimulai.'
          );
        } else {
          _self.text('Ingatkan Saya');
        }
      }
    },
  });

  // $('#js_reminder-btn--highlight').on({
  //   click: function() {
  //     console.log('clikk');
  //   },
  // });

  $('.program__btn-reminder').on({
    click: function() {
      let _self = $(this);
      console.log('click juga');
      _self.toggleClass('unf-btn--primary').toggleClass('unf-btn--secondary');
      // if (_self.attr('id') == 'js_reminder-btn--highlight') {
      //   $('#js_reminder-btn-top').click();
      // }
      if (_self.hasClass('unf-btn--secondary')) {
        _self.text('Hapus Pengingat');
        showToaster(
          'Pengingat berhasil terpasang. Notifikasi akan dikirim saat NET. Play dimulai.'
        );
      } else {
        _self.text('Ingatkan Saya');
      }
    },
  });
});

// FAQ

$(function handleFaq() {
  $('#js_all-faq').on({
    click: function() {
      showBottomSheet(true);
    },
  });

  $('.faq__question').on({
    click: function() {
      let _self = $(this);
      _self.toggleClass('faq__question--open');
      if (_self.hasClass('faq__question--open')) {
        _self.siblings().slideDown(200);
      } else {
        _self.siblings().slideUp(200);
      }
    },
  });
});

$(function handleCloseAllFaq() {
  $('#js_close-bottom-sheet').on({
    click: function() {
      showBottomSheet(false);
    },
  });
});

// BottomSheet

function showBottomSheet(bool) {
  if (bool) {
    $('.unf-bottom-sheet').addClass('unf-bottom-sheet--show');
  } else {
    $('.unf-bottom-sheet').removeClass('unf-bottom-sheet--show');
  }
}

// Tab

$(function initTabIndicator() {
  let tab = $('input[name=how-to]');
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].checked) {
      let id = tab[i].id;
      let label = $(`.unf-tab__list-item-label[for=${id}]`)[0];
      handleIndicatorTab(label);
      break;
    }
  }
});

$(function handleChangeTab() {
  $('.unf-tab__input').on({
    change: function() {
      let _self = $(this);
      let id = _self[0].id;
      let label = $(`.unf-tab__list-item-label[for=${id}]`)[0];
      handleIndicatorTab(label);
    },
  });
});

function handleIndicatorTab(e) {
  $('#js_unf-tab__indicator').css({
    width: e.offsetWidth,
    transform: `translateX(${e.offsetLeft}px)`,
  });
}

// Toaster

function showToaster(text = '', isError = false, autoClose = true) {
  var toaster = $('.unf-toaster');
  let toasterMessage = $('.unf-toaster__text');

  toaster.click(function(e) {
    toaster.removeClass('unf-toaster--show');
  });

  if (isError) {
    toaster.addClass('unf-toaster--error');
  } else {
    toaster.removeClass('unf-toaster--error');
  }

  toasterMessage.text(text);
  toaster.addClass('unf-toaster--show');

  if (autoClose) {
    setTimeout(function() {
      toaster.removeClass('unf-toaster--show');
    }, 3000);
  }
}

// Floating Btn

$(function name(params) {
  $('#js_all-program').on({
    click: function() {
      let href = $(this).attr('href');
      smoothScroll(href);
    },
  });
});

$(function onClickFloatingBtn() {
  $('.floating-action--chip').on({
    click: function() {
      let href = $(this).attr('href');
      smoothScroll(href);
    },
  });
});

function smoothScroll(href = false) {
  $('html, body').animate(
    {
      scrollTop: href ? $(href).offset().top - 55 : 0,
    },
    500
  );
}

$(function initFloatingBtnRanking(params) {
  if ($(window).scrollTop() < 100) {
    showFloating($('#btn-to-ranking'), true);
  }
});

$(function handleFloatinBtnRanking() {
  let lastScroll = 0;
  $(window).on({
    scroll: function() {
      let scroll = $(this).scrollTop();

      if (scroll < 100) {
        showFloating($('#btn-to-ranking'), true);
        showFloating($('#btn-to-top'), false);
      } else {
        showFloating($('#btn-to-ranking'), false);
        if (scroll > lastScroll) {
          showFloating($('#btn-to-top'), false);
          // console.log('downscroll code');
        } else {
          showFloating($('#btn-to-top'), true);
          // console.log('upscroll code');
        }
      }

      lastScroll = scroll;

      // console.log($(this).scrollTop());
    },
  });
});

function showFloating(el, bool) {
  if (bool) {
    el.addClass('floating-action--show');
  } else {
    el.removeClass('floating-action--show');
  }
}
