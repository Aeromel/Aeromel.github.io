// basic functionalities
$(document).ready(function () {
  var data = '';
  var x = '';
  var con = false;
  var a = false;
  $('#btnDisconnect').attr('disabled', true);
  $('#btnSubscribe').attr('disabled', true);
  $('#btnUnsubscribe').attr('disabled', true);
  $('#btnPublish').attr('disabled', true);

  document.getElementById('btnSubscribe').addEventListener("click", function (e) {
    e.preventDefault();
    a = false;
    if (con == true) {
      if ($('#Subscribe-topic').val() == '') {
        alert('No Topic provided!')
      } else {
        client.subscribe($('#Subscribe-topic').val());
        data = 'Subscribed to  ' + $('#Subscribe-topic').val();
        $('#span').html(data);
        x = $('#Subscribe-topic').val();
        $('#btnUnsubscribe').attr('disabled', false);
        $('#btnPublish').attr('disabled', false);
        var dt = new Date();
        var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        $('#tblSubscribe').append('<tr><td>' + $('#Subscribe-topic').val() + '</td><td>' + time + '</td></tr>');
        $("#Publish-topic").val($("#Subscribe-topic").val());
      }
    } else {
      alert('Connect first!');
    }
  })

  document.getElementById('btnUnsubscribe').addEventListener("click", function (e) {
    e.preventDefault();
    $('#span').html('');
    $('#Subscribe-topic').val('');
    $('#btnUnsubscribe').attr('disabled', true);
    $('#Publish-topic').val('');
    $('#Publish-payload').val('');
  })

  document.getElementById('btnConnect').addEventListener("click", function (e) {
    e.preventDefault();
    client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
    con = true;
    client.on("connect", function () {
      console.log("Successfully connected");
    })
    $("#status").val("Successfully connected")
    $('#btnSubscribe').attr('disabled', false);
    $('#btnDisconnect').attr('disabled', false);
    $('#btnConnect').attr('disabled', true);
    $('#btnPublish').attr('disabled', false);

    client.on("message", function (topic, payload) {
      console.log([topic, payload].join(": "));
    })

    $("#Subscribe-topic").val('demo');
  })

  document.getElementById('btnDisconnect').addEventListener("click", function (e) {
    e.preventDefault();
    data = '';
    console.log('You are disconnected.');
    client.end();
    $('#span').html(data);
    $('#Subscribe-topic').val('');
    $('#Publish-topic').val('');
    $('#Publish-payload').val('');
    $('#btnSubscribe').attr('disabled', true);
    $('#btnDisconnect').attr('disabled', true);
    $('#btnSubscribe').attr('disabled', true);
    $('#btnUnsubscribe').attr('disabled', true);
    $('#btnPublish').attr('disabled', true);
    $('#btnConnect').attr('disabled', false);
    $("#status").val("Disconnected")
  })

  document.getElementById('btnPublish').addEventListener("click", function (e) {
    e.preventDefault();
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    $('#tblPublish').append('<tr><td>' + $('#Publish-topic').val() + '</td><td>' + $('#Publish-payload').val() + '</td><td>' + time + '</td></tr>');
    console.log('Published.');


    if (x == $('#Publish-topic').val()) {
      var dt = new Date();
      var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $('#tblReceive').append('<tr><td>' + $('#Publish-topic').val() + '</td><td>' + $('#Publish-payload').val() + '</td><td>' + time + '</td></tr>');
    }
  })
});
