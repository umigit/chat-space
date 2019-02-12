$(function() {
  function buildHTML(message) {
    var html = `<div class="message">
                  <div class="message__top">
                    <p class="message__top__name">${message.user_name}</p>
                    <p class="message__top__date">${message.date}</p>
                  </div>
                  <p class="message__text">${message.text}</p>
                </div>`;
    return html;
  }

  $(window).on('load', function(event) {
    event.preventDefault();
    /* Act on the event */
    $('.messages').scrollTop($('.messages')[0].scrollHeight);
  });

  $('#message-form').on('submit', function(event) {
    event.preventDefault();

    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('#message-form')[0].reset();
    })
    .fail(function() {
      alert('メッセージを入力してください');
    })
    .always(function() {
      // $('#send_message').prop('disabled', false);
    });
  });
});
