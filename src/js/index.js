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

function appendRankingElem(el) {
  $('#js_ranking').empty();
  $('#js_ranking').append(el);
}

function initDataRanking() {
  resultsRanking(dataRanking);
  $('#js_ranking__count').text(dataRanking.length);
}

function resultsRanking(obj) {
  const listContainer = `
    <div id="js_ranking-list">
      <div class="content__list-title">
        <h6><span id="js_ranking__count"></span> Peringkat Tertinggi</h6>
        <h6>Skor</h6>
      </div>
      <div id="js_ranking-list-item" class="content__list-item"></div>
    </div> 
  `;

  appendRankingElem(listContainer);

  $('#js_ranking__count').text('');
  $('#js_ranking-list-item').empty();
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

    $('#js_ranking-list-item').append(listRank);
  }
}

function handleEmptyResult() {
  const emptyResult = `
    <div class="ranking__not-found">
      <div>
        <img src="./assets/img/search-not-found.png" alt="">
        <p>Hasil pencarian tidak ditemukan</p>
      </div>
    </div> 
  `;
  appendRankingElem(emptyResult);
}

function handleLoaderResult() {
  const loader = `
    <div id="js_ranking-loader" class="ranking__loader">
      <div class="content__list-title">
        <h6>Peringkat Tertinggi</h6>
        <h6>Skor</h6>
      </div>
      <div class="content__list-item">
        <div class="row">
          <div class="col-10">
            <span class="unf-loader-line"></span>
          </div>
          <div class="col-2">
            <span class="unf-loader-line unf-loader-line--block"></span>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <span class="unf-loader-line"></span>
          </div>
          <div class="col-2">
            <span class="unf-loader-line unf-loader-line--block"></span>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <span class="unf-loader-line"></span>
          </div>
          <div class="col-2">
            <span class="unf-loader-line unf-loader-line--block"></span>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <span class="unf-loader-line"></span>
          </div>
          <div class="col-2">
            <span class="unf-loader-line unf-loader-line--block"></span>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <span class="unf-loader-line"></span>
          </div>
          <div class="col-2">
            <span class="unf-loader-line unf-loader-line--block"></span>
          </div>
        </div>
      </div>
    </div>
  `;
  appendRankingElem(loader);
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
          $(this).blur()
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
          handleLoaderResult();
          setTimeout(() => {
            if (results != 0) {
              resultsRanking(results);
            } else {
              handleEmptyResult();
            }
          }, 3000);
        }
      } else {
        if (e.which == 13) {
          $(this).blur()
          handleLoaderResult();
          setTimeout(() => {
            initDataRanking();
          }, 3000);
        }
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
    click: function(e) {
      let triggerBtn = $('.js_reminder-btn--same');
      for (let i = 0; i < triggerBtn.length; i++) {
        let _self = $(triggerBtn[i]);
        if (_self.hasClass('quiz__program-reminder')) {
          _self.toggleClass('unf-btn--transparent');
          let condition = _self.hasClass('unf-btn--transparent');
          onChangeBtnReminder(_self, condition);
        }

        if (_self.hasClass('program__btn-reminder')) {
          _self
            .toggleClass('unf-btn--primary')
            .toggleClass('unf-btn--secondary');
          let condition = _self.hasClass('unf-btn--secondary');
          onChangeBtnReminder(_self, condition);
        }
      }
    },
  });

  $('.js_reminder-btn').on({
    click: function() {
      let _self = $(this);
      _self.toggleClass('unf-btn--primary').toggleClass('unf-btn--secondary');
      let condition = _self.hasClass('unf-btn--secondary');
      onChangeBtnReminder(_self, condition);
    },
  });
});

function onChangeBtnReminder(el, bool) {
  if (bool) {
    el.text('Hapus Pengingat');
    showToaster(
      'Pengingat berhasil terpasang. Notifikasi akan dikirim saat NET. Play dimulai.'
    );
  } else {
    el.text('Ingatkan Saya');
  }
}

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

function showBottomSheet(bool) {
  if (bool) {
    $('html, body').addClass('lock');
    $('.unf-bottom-sheet').addClass('unf-bottom-sheet--show');
  } else {
    $('html, body').removeClass('lock');
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

$(function handleGotoAllProgram() {
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
      scrollTop: href ? $(href).offset().top - 40 : 0,
    },
    500
  );
}

$(function initFloatingBtnRanking() {
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
        } else {
          if (!$('#js_search-ranking').is(':focus')){
            showFloating($('#btn-to-top'), true);
          }
        }
      }

      lastScroll = scroll;
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
