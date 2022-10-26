var myStr, age, audio,devId="macbook", gender, user, flag;
meow = []
age = 18;

function combine(result) {
    console.log(result);
    result.result.forEach(element => {
      meow.push(element);
    });
  }
  function filterList() {
    console.log(meow)
    newList = [];
    meow.forEach(ele => {
      console.log(ele.ageRating);
      if (age >= 18) {
        if (ele.ageRating != "G") newList.push(ele);
      }
      else {
        if (ele.ageRating == "G"||"12+"|| "7+"||"5+") newList.push(ele);
      }
    });
  
    console.log(newList);
    showListHtml(newList);
  }

function getOTTList(below18) {
    age = below18
    const url = 'https://codelikeada.lgads.tv/epg/ott?limit=10&genre=';
  
    var requestOptions = {
      method: 'GET',
      // headers: {'Content-Type': 'application/json',},
      redirect: 'follow',
      // mode: 'no-cors'
    };
  
    genre.forEach(element => {
      fetch(url + element, requestOptions)
        .then(response => response.json())
        .then(result => {
          combine(result);
          filterList();
        })
        .catch(error => console.log('error', error));
    });
  
    // filterList();
  }

function postSomething(){
    let data = {age: age, gender: gender, audio: myStr.audio, devId: devId, user: user};
    var req = {
        method: "POST",
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
    };
    console.log("Data",data);
    fetch("https://srs-codelikeada.lgads.tv/srs/v1/enroll", req)
    .then(response =>{ return response.text() })
    .then(result =>{
        // var temp = JSON.parse(result);
        // console.log(temp);

        console.log("enrollresponse", result);
    }).catch(error=> console.log('error', error));

}


function postSomething2(){
    let data = {devId: devId, audio: myStr.audio};
    var req = {
        method: "POST",
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),

    };
    console.log("Data",data);
    fetch("https://srs-codelikeada.lgads.tv/srs/v1/command", req)
    .then(response =>{ return response.text()  })
    .then(result =>{
        var temp = JSON.parse(result);
        console.log(temp);
        var d=document.createElement("div");
        document.body.appendChild(d);
        d.innerHTML += '<h1>'+temp.user+'</h1>';
         
        if (temp.user == "Puja") {
            getOTTList(17)
          }
          else {
            getOTTList(18)
          }

        // console.log("enrollresponsee", result);
    }).catch(error=> console.log('error', error));

}

function postAjax(audioConverted){
    const url = 'https://codelikeada.lgads.tv/transcode';
    let data = {extension: 'wav', data: audioConverted.substr(22)};

var requestOptions = {
  method: 'POST',
  // headers: {'Content-Type': 'application/json',},
  body: JSON.stringify(data),
  redirect: 'follow',
  // mode: 'no-cors'
};



fetch("https://codelikeada.lgads.tv/transcode", requestOptions)
  .then(response => response.text())
  .then(result =>{
      myStr = JSON.parse(result);
      console.log(myStr.audio);
      // console.log(myStr.audio);
      console.log(result);

      if (flag == 1) postSomething();
      else postSomething2();
  })
  .catch(error => console.log('error', error));
}






function submitForm() {
    var form = document.getElementById("form");


    age = document.getElementById("age").value;
    // audio = myStr;
    devId = "macbook";
    gender = document.getElementById("gender").value;
    user = document.getElementById("user").value;


    console.log(form.name);
    // form.submit();
}




// var myStr;
// const below18 = "Puja";
// const devId = "puja_12";

let genre = ['comedy', 'thriller', 'kids', 'adventure', 'drama', 'crime']

// function createDatabase() {
//   let obj1 = {
//     "age": "string",
//     "audio": "string",
//     "devId": "string",
//     "gender": "string",
//     "user": "string"
//   }
//   let obj2 = {
//     "age": "string",
//     "audio": "string",
//     "devId": "string",
//     "gender": "string",
//     "user": "string"
//   }

//   let url = 'https://codelikeada.lgads.tv/srs/v1/enroll';
//   let requestOptions1 = {
//     method: 'GET',
//     // headers: {'Content-Type': 'application/json',},
//     redirect: 'follow',
//     body: JSON.stringify(obj1),
//     vad: false,
//     // mode: 'no-cors'
//   };
//   let requestOptions2 = {
//     method: 'POST',
//     redirect: 'follow',
//     body: JSON.stringify(obj2),
//     vad: false,
//   }

//   fetch(url, requestOptions1)
//     .then(response => response.text())
//     .then(result => {
//       console.log("Enrolled response", result);
//     })
//     .catch(error => console.log('error', error));

//   fetch(url, requestOptions2)
//     .then(response => response.text())
//     .then(result => {
//       console.log(result);
//     })
//     .catch(error => console.log('error', error));
// }; 



// createDatabase();

function showListHtml(arr) {
  console.log("showing array",arr);
  if (arr.length == 0) return;
  let container = document.getElementById('recommandation');

  let ul = document.createElement('ul');
   arr.forEach(element => {
    let item = document.createElement('li');
    let link = document.createElement('a');
    let p = document.createElement('p');
    let img = document.createElement('img');
    
    

    p.innerText = element.iTitle;
    link.appendChild(p);
    
   link.href = element.links[0].urls.web;
    item.appendChild(link);
    img.src= element.originalImages[0].url
    item.appendChild(img);
    ul.appendChild(item);
  });

  container.innerHTML = "";
  container.appendChild(ul);
  console.log("list===",ul)










function getUser(ado) { 
    getOTTList(18);
  const url = 'https://codelikeada.lgads.tv/srs/v1/command';
  let data = { audio: ado, devId: devId }

  var requestOptions = {
    method: 'POST',
    // headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data),
    redirect: 'follow',
    mode: 'no-cors'
  };

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
      if (result.user == "Puja") {
        getOTTList(17)
      }
      else {
        getOTTList(18)
      }
    })
    .catch(error => console.log('error', error));
}

// function postAjax(audioConverted) {
//   const url = 'https://codelikeada.lgads.tv/transcode';
//   let data = { extension: 'wav', data: audioConverted.substr(22) };

//   var requestOptions = {
//     method: 'POST',
//     // headers: {'Content-Type': 'application/json',},
//     body: JSON.stringify(data),
//     redirect: 'follow',
//     // mode: 'no-cors'
//   };

//   fetch("https://codelikeada.lgads.tv/transcode", requestOptions)
//     .then(response => response.text())
//     .then(result => getUser(result.audio))
//     .catch(error => console.log('error', error));
// }
}

jQuery(document).ready(function () {
    var $ = jQuery;
    var myRecorder = {
        objects: {
            context: null,
            stream: null,
            recorder: null
        },
        init: function () {
            if (null === myRecorder.objects.context) {
                myRecorder.objects.context = new (
                    window.AudioContext || window.webkitAudioContext
                );
            }
        },
        start: function () {
            var options = { audio: true, video: false };
            navigator.mediaDevices.getUserMedia(options).then(function (stream) {
                myRecorder.objects.stream = stream;
                myRecorder.objects.recorder = new Recorder(
                    myRecorder.objects.context.createMediaStreamSource(stream),
                    { numChannels: 1 }
                );
                myRecorder.objects.recorder.record();
            }).catch(function (err) { });
        },
        stop: function (listObject) {
            if (null !== myRecorder.objects.stream) {
                myRecorder.objects.stream.getAudioTracks()[0].stop();
            }
            if (null !== myRecorder.objects.recorder) {
                myRecorder.objects.recorder.stop();

                // Validate object
                if (null !== listObject
                    && 'object' === typeof listObject
                    && listObject.length > 0) {
                    // Export the WAV file
                    myRecorder.objects.recorder.exportWAV(function (blob) {
                        console.log({ blob })
                        var url = (window.URL || window.webkitURL)
                            .createObjectURL(blob);

                        var reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = function () {
                            let base64String = reader.result;
                            postAjax(base64String);
                            // console.log('Base64 String - ', base64String);

                            // Simply Print the Base64 Encoded String,
                            // without additional data: Attributes.
                            // console.log('Base64 String without Tags- ',
                            //     base64String.substr(base64String.indexOf(', ') + 1));
                        }
                            // Prepare the playback
                            var audioObject = $('<audio controls></audio>')
                                .attr('src', url);

                            // Prepare the download link
                            var downloadObject = $('<a>&#9660;</a>')
                                .attr('href', url)
                                .attr('download', new Date().toUTCString() + '.wav');

                            // Wrap everything in a row
                            var holderObject = $('<div class="row"></div>')
                                .append(audioObject)
                                .append(downloadObject);

                            // Append to the list

                            listObject.append(holderObject);
                        });
                }
            }
        }
    };

    // Prepare the recordings list
    var listObject = $('[data-role="recordings"]');
    var listObject2 = $('[data-role="records"]');

    // Prepare the record button
    $('[data-role="controls"] > button').click(function () {
        // Initialize the recorder
        myRecorder.init();
        flag = 1;
        // Get the button state
        var buttonState = !!$(this).attr('data-recording');

        // Toggle
        if (!buttonState) {
            $(this).attr('data-recording', 'true');
            myRecorder.start();
        } else {
            $(this).attr('data-recording', '');
            myRecorder.stop(listObject);
        }
    });

    $('[data-role="tests"] > button').click(function () {
        // Initialize the recorder
        myRecorder.init();
        flag = 2;
        // Get the button state
        var buttonState = !!$(this).attr('data-recording');

        // Toggle
        if (!buttonState) {
            $(this).attr('data-recording', 'true');
            myRecorder.start();
        } else {
            $(this).attr('data-recording', '');
            myRecorder.stop(listObject2);
        }
    });

});