$(function() {
  const baoEditor = CodeMirror.fromTextArea(document.getElementById('bao-code'), {
      mode: "application/json",
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      foldGutter: true,
      lint: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"]
    });
  const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
      mode: "text/html",
      lineNumbers: true,
      matchTags: true,
      autoCloseTags: true,
      lineWrapping: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });

  $('#code-area-tabs>li.nav-item>a[href="#bao"]').click(baoEditor, function(e) {
    e.preventDefault();
    $(this).tab('show');
    e.data.refresh();
    e.data.focus();
  });

  $('#code-area-tabs>li.nav-item>a[href="#html"]').click(htmlEditor, function(e) {
    e.preventDefault();
    $(this).tab('show');
    e.data.refresh();
    e.data.focus();
  });

  // Set default example file to load.
  if (!$.deparam.fragment()['load-bao']) {
    window.location.hash = $.param.fragment(window.location.hash, 'load-bao=calc');
  }

  function createAlertBox(text, timeout = 5000) {
    return $('<div/>', {
      text: text,
      class: 'alert alert-danger m-0'
    }).appendTo($('#code-area'))
      .hide().slideDown('slow').delay(timeout).slideUp('slow');
  }

  // Handle all uncaught exceptions.
  window.addEventListener('error', function(e) {
    createAlertBox(e.message);
  })

  function loadBaoCode(filename) {
    const baoName = 'examples/' + filename + '.bao';
    const htmlName = 'examples/' + filename + '.html';
    $('#file-name-input').val(filename);
    $.get(baoName, function(data) {
      baoEditor.getDoc().setValue(data);
      baoEditor.focus();
    }).fail(function() {
      createAlertBox('Failed to load ' + baoName + '.');
    });
    $.get(htmlName, function(data) {
      htmlEditor.getDoc().setValue(data);
    }).fail(function() {
      createAlertBox('Failed to load ' + htmlName + '.');        
    });
  }
  loadBaoCode($.deparam.fragment()['load-bao']);

  $(window).bind("hashchange", function(e) {
    loadBaoCode($.deparam.fragment()['load-bao']);
  });

  $('#file-name-form').submit(function(e) {
    e.preventDefault();
    window.location.hash = $.param.fragment(window.location.hash, 'load-bao=' + $('#file-name-input').val());
  });

  $.getJSON('examples/examples.json', function(data) {
    $('#file-name-input').autocomplete({
      source: data
    });
  });

  $('#run').click(function() {
    // Load html
    $('.result-area div').html(htmlEditor.getValue());
    // Run bao
    Bao.runBao(baoEditor.getValue());
    // Show result area
    $('.result-area').removeClass('d-none');
    $('html,body').animate({scrollTop: $('.result-area').offset().top}, 'slow');
  });
});
