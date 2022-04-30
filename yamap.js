var cnt= 0;
var cntStep= 1;
var cntMax= 12;
var cntMin=0;
var isStarted =false;
var timerDelay1=2000;
var timerDelay2=500;
var timerId1;
var timerId2;

var x0=55.790927;
var y0=49.114453;
var zoom0= 18;
var objLineString= new Object();
var arrayShowSegments= [];
var arrayAllSegments=[
[55.7907909999963, 49.114689],
[55.7906309999963, 49.115019],
[55.7904659999963, 49.115370],
[55.7903079999963, 49.115692],
[55.7901639999963, 49.115982],
[55.7900279999963, 49.116313],
[55.7898429999963, 49.116621],
[55.7899619999963, 49.116786],
[55.7901129999963, 49.116998],
[55.7902579999963, 49.117200],
[55.7903979999963, 49.117401],
[55.7905549999963, 49.117654],
];
var x0= arrayAllSegments[3][0];
var y0= arrayAllSegments[3][1];
window.onload=initWindowOnload;
ymaps.ready(initYMaps);
function initWindowOnload() {
	console.log("Window onload: OK. cnt= "+cnt);
	timerId1=setTimeout(function run() {
		timerId2=setTimeout(run,timerDelay2);
		if(!isStarted) {
			console.log("Timer: \"stopped\". cnt= "+cnt);
			return false;
		}
		if (isStarted) {
			cnt+=cntStep;
			if(cnt>cntMax) {
				cnt=cntMax-cntStep;
				cntStep*=-1;
			}
			if (cnt<cntMin) {
				cntStep*= -1;
				cnt=cntMin+cntStep;
			}
			if (cntStep>0) {
				arrayShowSegments.push(arrayAllSegments[cnt]);
				console.log("Timeout: Push Segment:"+"cnt="+cnt);
			}
			if (cntStep<0) {
				arrayShowSegments.pop();
			console.log("Timeout: Pop Segment: "+" cnt="+cnt);
			}
			objLineString.setCoordinates(arrayShowSegments);
		}
	},
	timerDelay1);
}
function initYMaps() {
	cntMax=arrayAllSegments.length-1;
	console.log("Ymaps init: OK");
	var lineStringGeometry=new
	ymaps.geometry.LineString(arrayShowSegments);
	objLineString=lineStringGeometry;
	arrayShowSegments.push(arrayAllSegments[cnt]);
	cnt+=cntStep;
	arrayShowSegments.push(arrayAllSegments[cnt]);
	console.log("Added 2nd node: "+" cnt="+cnt);
	var polylineRed3=new ymaps.Polyline(lineStringGeometry, {}, {
		strokeColor: "#FF0000",
		strokeOpacity: 0.4,
		strokeWidth: 3,
	}
	);
	var map1=new ymaps.Map("map", {
		center: [x0,y0],
		zoom:zoom0
	});
map1.geoObjects.add(polylineRed3);
console.log("Show 1st segment on the map1.");
}
function onClickStart() {
	isStarted=true;
	console.log("Clicked button:Start. isStarted= "+isStarted);
}
function onClickStop() {
	isStarted=false;
	console.log("Clicked button:Stop. isStarted= "+isStarted);
}
function onClickResetTimer() {
	isStarted=false;
	clearTimeout(timerId1);
	clearTimeout(timerId2);
	console.log("timeout:rested.cnt= "+cnt);
	console.log("isStarted="+isStarted);
}
