const enviroment = 'production';
var domain;
var userId;

if (enviroment === 'production') {
  domain = 'https://chat.tokopedia.com';
} else {
  domain = 'https://chat-staging.tokopedia.com';
}

// fetch('https://gql.tokopedia.com', {
//   method: 'POST',
//   credentials: 'include',
//   body: '{"query":"{\\n\\tprofile {\\n\\t\\tuser_id\\n\\t}\\n}"}',
// }).then(response => response.json()).then((json) => {
//   userId = json.profile.user_id;
// });

const endpointGetPrizeQuizWinner =
  '/gmf/api/v2/leaderboard/weekly_prize_quiz_winners';
const endpointGetEvents = '/gcn/api/v2/leaderboard/get_events';
const endpointGetLeaderRanking =
  '/gmf/api/v2/leaderboard/weekly_top_ten_winners';

$(document).ready(function() {
  initDataRanking();
  initDataPrizeQuizWinner();
  initDataShowEvents();
});

function appendRankingElem(el) {
  $('#js_ranking').empty();
  $('#js_ranking').append(el);
}

function initDataRanking() {
  $.ajax({
    url: domain + endpointGetLeaderRanking,
    success: function(response) {
      weekly_winners = response.data.weekly_winners;
      resultsRanking(weekly_winners);
      $('#js_ranking__count').text(weekly_winners.length);
    },
    error: function() {
      handleEmptyResult();
    },
  });
}

function initSearchDataRanking(winner_name) {
  $.ajax({
    url: domain + endpointGetLeaderRanking,
    data: { winner_name: winner_name },
    success: function(response) {
      weekly_winners = response.data.weekly_winners;
      if (weekly_winners.length !== 0) {
        resultsRanking(weekly_winners);
      } else {
        handleEmptyResult();
      }
    },
    error: function() {
      handleEmptyResult();
    },
  });
}

function initDataShowEvents() {
  var settings = {
    crossDomain: true,
    method: 'GET',
    headers: {
      /* "Authorization": "bearer _fruNGSdSDKnhg7PDDoDCQ", */
      'cache-control': 'no-cache',
    },
    url: domain + endpointGetEvents,
    success: function(response) {
      data = response.data;
      resultNextEvent(data.next_event);
      resultsAllEvents(data.all_events);
      handleBtnReminder();
    },
  };
  $.ajax(settings);
}

function initDataPrizeQuizWinner() {
  var settings = {
    crossDomain: true,
    url: domain + endpointGetPrizeQuizWinner,
    method: 'GET',
    headers: {
      'cache-control': 'no-cache',
    },
    url: domain + endpointGetPrizeQuizWinner,
    success: function(response) {
      resultsQuizWinner(response.data.weekly_prize_quiz_winner);
    },
  };
  $.ajax(settings);
}

function resultNextEvent(data) {
  if (data === null) {
    return false;
  }

  const reminderTrue = `<button class="unf-btn unf-btn--small quiz__program-reminder js_reminder-btn unf-btn--transparent">Hapus Pengingat</button>`;

  const reminderFalse = `<button class="unf-btn unf-btn--small quiz__program-reminder js_reminder-btn">Ingatkan Saya</button>`;

  const reminderButton = data.is_reminded ? reminderTrue : reminderFalse;

  const nextEvent = `
    <h4 class="quiz__program-next">Jadwal Program NET. Play selanjutnya:</h4>
    <h3 class="quiz__program-text">
      ${data.name}
    </h3>
    <h3 class="quiz__program-clock">
      ${data.start_time}
    </h3>

    <span data-event-id="${data.event_id}">
      ${reminderButton}
    </span>    

    <a id="js_all-program" href="#leaderboard-program" class="quiz__program-all">Lihat jadwal selengkapnya</a>
    
  `;

  $('#next-event').append(nextEvent);
}

function resultsAllEvents(obj) {
  const reminderFalse = `<button class="unf-btn unf-btn--small unf-btn--animate unf-btn--primary program__btn-reminder js_reminder-btn">Ingatkan Saya</button>`;

  const reminderTrue = `<button class="unf-btn unf-btn--small unf-btn--animate program__btn-reminder js_reminder-btn unf-btn--secondary">Hapus Pengingat</button>`;

  for (const key of obj) {
    const reminderButton = key.is_reminded ? reminderTrue : reminderFalse;
    const listAllEvents = `
      <div class="row">
        <div class="col-6">
          <h6 class="program__name">
            ${key.name}
          </h6>
          <span class="program__clock">
            ${key.start_time}
          </span>
        </div>
        <div class="col-6" data-event-id="${key.event_id}">
          ${reminderButton}
        </div>
      </div>      
    `;

    $('#all-events-list-item').append(listAllEvents);
  }
}

function resultsQuizWinner(obj) {
  for (const key of obj) {
    const listPrizeQuizWinner = `
      <div class="row">
        <div class="col-6">
          ${key.winner_name !== '' ? key.winner_name : 'Akan datang'}
        </div>
        <div class="col-6">
          ${key.prize_name}
        </div>
      </div>      
    `;

    $('#quiz-winner-list-item').append(listPrizeQuizWinner);
  }
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
    const rank = key.rank > 9999 ? '+9999' : key.rank;
    const listRank = `
      <div class="row">
        <div class="col-9">
          <div class="ranking__item">
            <div class="ranking__item-num">
              <span>${rank}</span>
            </div>
            <div class="ranking__item-name">
              <span>${key.winner_name}</span>
            </div>
          </div>
        </div>
        <div class="col-3">
          <span class="ranking__score">${key.score}</span>
        </div>
      </div>
    `;

    $('#js_ranking-list-item').append(listRank);
  }

  $('#js_ranking-list-item .row').each(function() {
    var rank = $(this).find('.ranking__item-num')
    var val = rank.find('span').text();

    if (val == 1) {
      rank.addClass('first');
    }
    if (val == 2) {
      rank.addClass('second');
    }
    if (val == 3) {
      rank.addClass('third');
    }
  });
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
          $(this).blur();
          handleLoaderResult();
          initSearchDataRanking(val);
        }
      } else {
        if (e.which == 13) {
          $(this).blur();
          handleLoaderResult();
          initDataRanking();
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

function handleBtnReminder() {
  $('.js_reminder-btn--same').on({
    click: function(e) {
      let triggerBtn = $('.js_reminder-btn--same');
      for (let i = 0; i < triggerBtn.length; i++) {
        let _self = $(triggerBtn[i]);
        let parent = _self.parent();
        let eventId = $(parent).data('event-id');
        if (_self.hasClass('quiz__program-reminder')) {
          _self.toggleClass('unf-btn--transparent');
          let condition = _self.hasClass('unf-btn--transparent');
          onChangeBtnReminder(_self, condition, eventId);
        }

        if (_self.hasClass('program__btn-reminder')) {
          _self
            .toggleClass('unf-btn--primary')
            .toggleClass('unf-btn--secondary');
          let condition = _self.hasClass('unf-btn--secondary');
          onChangeBtnReminder(_self, condition, eventId);
        }
      }
    },
  });

  $('.js_reminder-btn').on({
    click: function() {
      let _self = $(this);
      let parent = _self.parent();
      let eventId = $(parent).data('event-id');
      _self.toggleClass('unf-btn--primary').toggleClass('unf-btn--secondary');
      let condition = _self.hasClass('unf-btn--secondary');
      onChangeBtnReminder(_self, condition, eventId);
    },
  });
}

function onChangeBtnReminder(el, bool, eventId) {
  if (bool) {
    // put ajax request here
    // var settings = {
    //   "async": true,
    //   "crossDomain": true,
    //   "url": "https://chat-staging.tokopedia.com/gcn/api/v2/leaderboard/remind_me/5",
    //   "method": "POST",
    //   "headers": {
    //     "Authorization": "Bearer _fruNGSdSDKnhg7PDDoDCQ",
    //     "cache-control": "no-cache",
    //     "Postman-Token": "479286b9-4d1e-416e-99c0-9172d5acfd9d"
    //   }
    // }

    // $.ajax(settings).done(function (response) {
    //   console.log(response);
    // });
    el.text('Hapus Pengingat');
    showToaster(
      'Pengingat berhasil terpasang. Notifikasi akan dikirim saat NET. Play dimulai.'
    );
  } else {
    // put ajax request here
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
          if (!$('#js_search-ranking').is(':focus')) {
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
