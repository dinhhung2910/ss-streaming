//webkitURL is deprecated but nevertheless
function formatTimeCallback(seconds, pxPerSec) {
    seconds = Number(seconds);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    // fill up seconds with zeroes
    var secondsStr = Math.round(seconds).toString();
    if (pxPerSec >= 25 * 10) {
		secondsStr = seconds.toFixed(2);
    } else if (pxPerSec >= 25 * 1) {
		secondsStr = seconds.toFixed(1);
    }

    if (minutes > 0) {
        if (seconds < 10) {
            secondsStr = '0' + secondsStr;
        }
        return `${minutes}:${secondsStr}`;
    }
    return secondsStr;
}

function timeInterval(pxPerSec) {
    return 0.1;
}

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'gray',
    progressColor: 'red',
    closeAudioContext:true,
    plugins:[
    	WaveSurfer.regions.create(),
		WaveSurfer.timeline.create({
			container: "#wave_timeline",
			timeInterval: timeInterval,
			formatTimeCallback: formatTimeCallback,
		})
    ]
});



// Button
var get_button = document.getElementById("get");
var play_button = document.getElementById("play");
var anno_button = document.getElementById("anno");
var clear_button = document.getElementById("clear");
var submit_button = document.getElementById("submit");
var current_path = NaN;
var color_label = "rgba(84,196,165,0.2)"
var color_anno = "rgba(200,150,10,0.2)"
wavesurfer.enableDragSelection({color: color_anno});

// Speed
var slider = document.getElementById("speed_range");
var output = document.getElementById("speed_val");
output.innerHTML = slider.value;

// Zoom
// var slider_z = document.getElementById("zoom_range");
// var output_z = document.getElementById("zoom_val");
// output_z.innerHTML = slider_z.value;

get_button.addEventListener("mousedown", get_audio);
play_button.addEventListener("mousedown", play_audio);
anno_button.addEventListener("mousedown", annotation);
submit_button.addEventListener("mousedown", submit_next); // submit_anno
clear_button.addEventListener("mousedown", clear_anno);

function submit_next(){
    submit_anno();
    get_audio();
}

document.getElementById("waveform").addEventListener("mousedown", function(){play_button.innerHTML="Play Audio"; toggle_play=true;});
wavesurfer.on('ready',function(){wavesurfer.pause(); enable_audio();});
wavesurfer.on('region-dblclick', remove_region); // dbclick to remove region
wavesurfer.on('finish', function(){
    play_button.innerHTML="Play Audio";
    toggle_play=true;})

// wavesurfer.on('region-click', play_region); // dbclick to remove region

var toggle_anno = false;
var toggle_play = true;

function clear_anno(){
    // Object.keys(wavesurfer.regions.list).map(function(id) {
    //     wavesurfer.regions.list[id].remove();})
    wavesurfer.clearRegions();
}

function remove_region(region){
    wavesurfer.regions.list[region.id].remove();
}

function get_audio(){
    wavesurfer.clearRegions();
    // Reset msg
    document.getElementById("msg").innerHTML="";
    disable_audio();

    // Send data
	let formData = new FormData();
	formData.append("path", current_path);

	fetch("/api/get_audio",
			{
				method: "POST",
				body:  formData
			})
		.then(response => response.text())
		.then(data => {
			data = JSON.parse(data)
            console.log("get_audio:",data);
            current_path = data.path
            document.getElementById("msg").innerHTML=data.msg;
            if (data["is_audio"]){

                // Load Audio
                wavesurfer.load(current_path);

                // Load Region
                predict_regions = data.regions
                for(var key in predict_regions) {
                    draw(predict_regions[key], color_label, key);
                  }
            }
        });
}

function draw(predict_regions, color, msg){
	Object.entries(predict_regions).map(predict =>
		{
			wavesurfer.addRegion({
				start: predict[1][0],
				end: predict[1][1],
				loop: false,
				color: color,
				drag: true,
                resize: true,
                attributes: {
					label: msg
				  }
				});
		})
}

function submit_anno(){
    json_data = JSON.stringify(
        Object.keys(wavesurfer.regions.list).map(function(id) {
            let region = wavesurfer.regions.list[id];
            return [region.start, region.end];
        })
    );
    let formData = new FormData();
    formData.append("data", json_data);
    formData.append("path", current_path);

	fetch("/api/save_anno",
			{
				method: "POST",
				body:  formData
			})
		.then(response => response.text())
		.then(data => {
            data = JSON.parse(data)
            document.getElementById("msg").innerHTML=data.msg
        });
}

slider.oninput = function() {
    output.innerHTML = this.value;
    wavesurfer.setPlaybackRate(this.value/100);
  } 

// slider_z.oninput = function() {
//     output_z.innerHTML = this.value/100;
//     console.log(Number(this.value))
//     wavesurfer.zoom(Number(this.value)/100);
// }

// Audio function
function enable_audio(){
    play_button.disabled = false;
    anno_button.disabled = false;
    submit_button.disabled = false;
    clear_button.disabled = false;
}
function disable_audio(){
    play_button.disabled = true;
    anno_button.disabled = true;
    submit_button.disabled = true;
    clear_button.disabled = true;
}

function play_audio(){
    if (toggle_play){
        play_button.innerHTML="Pause Audio";
        wavesurfer.play();
        toggle_play=false;
    }
    else {
        play_button.innerHTML="Play Audio";
        wavesurfer.pause();
        toggle_play=true;
    }
}

function annotation(){
    if (toggle_anno)
    {
        anno_button.innerHTML = "Annotate";
        anno_button.style.backgroundColor="rgb(237, 52, 29)";
        wavesurfer.enableDragSelection({color: color_anno});
        wavesurfer.on('region-dblclick', remove_region); // dbclick to remove region
        toggle_anno = false;
    }
    else
    {
        anno_button.innerHTML = "Annotate";
        anno_button.style.backgroundColor="rgb(125, 125, 125)";
        wavesurfer.disableDragSelection();
        wavesurfer.un('region-dblclick', remove_region); // dbclick to remove region
        toggle_anno = true;
    }
    
}

function play_region(region){
    // wavesurfer.play(region.start, region.end);
    wavesurfer.regions.list[region.id].play()
}