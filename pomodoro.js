let inc1 = $("#inc1");
let dec1 = $("#dec1");
let inc2 = $("#inc2");
let dec2 = $("#dec2");
let clock = $("#clock");
let start_btn = $("#start-btn");
let pause_btn = $("#pause-btn");
let reset_btn = $("#reset-btn");

let session_text = $("#session");
let break_text = $("#break");

let snd = new Audio("https://www.soundjay.com/misc/sounds/censor-beep-6.mp3");

let session_bool = true;
let inter = "";
let time = {
    minutes: 25,
    seconds: 0
};

let break_obj = {
    minutes: 5,
    seconds: 0
};

let session_amount = 25;
let break_amount = 5;

function time_format(obj){
    let min = (obj.minutes < 10) ? ("0" + obj.minutes) : obj.minutes;
    let sec = (obj.seconds < 10) ? ("0" + obj.seconds) : obj.seconds;
    return min + ":" + sec;
}

function time_decide(){
    clearInterval(inter);
    (session_bool) ? startTimer(clock, time) : startTimer(clock, break_obj);
}

inc1.on("click", function(e){
    curr = session_text.text();
    if(curr != "60:00"){
        time.minutes++;
        session_text.text(time_format(time));
    }
});

inc2.on("click", function(e){
    curr = break_text.text();
    if(curr != "60:00"){
        break_obj.minutes++;  console.log("hello");
        break_text.text(time_format(break_obj));
    }
});


dec1.on("click", function(e){
    curr = session_text.text();
    if(curr != "01:00"){
        time.minutes--;
        session_text.text(time_format(time));
    }
});


dec2.on("click", function(e){
    curr = break_text.text();
    if(curr != "01:00"){
        break_obj.minutes--;
        break_text.text(time_format(break_obj));
    }
});

start_btn.on("click", function(e){
    clock.removeClass("text-light")
    clock.addClass("text-warning");
    time_decide();
});

pause_btn.on("click", function(e){
    clearInterval(inter);
    clock.addClass("text-light")
    clock.removeClass("text-warning");
});

reset_btn.on("click", function(e){
    clearInterval(inter);
    time.minutes = 25;
    time.seconds = 0;
    break_obj.minutes = 5;
    break_obj.seconds = 0;
    session_bool = true;
    clock.text("25:00");
    session_text.text("25:00");
    break_text.text("05:00");
    clock.addClass("text-light")
    clock.removeClass("text-warning");
});

function startTimer(display, obj) {
    let obj_orig = {
        minutes: obj.minutes,
        seconds: obj.seconds
    };
    inter = setInterval(function () {
        if(obj.seconds > 0 || obj.minutes > 0){
            (obj.seconds > 0) ? obj.seconds-- : (obj.minutes--, obj.seconds = 59);
            display.text(time_format(obj));
        }
        else{
            snd.play();
            session_bool = !session_bool;
            obj.minutes = obj_orig.minutes;
            obj.seconds = obj_orig.seconds;
            time_decide()
        }
    }, 1000);
}
