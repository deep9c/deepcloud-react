var React = require('react');
var Firebase = require('firebase');
var Highcharts = require('highcharts');
var HighchartsMore = require('highcharts-more');
HighchartsMore(Highcharts);

import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';

var socket = null;

var ChartsContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function () {
    return {
      fullname: 'fnu',
	  email:'',
	  message:'',
	  tel:'',
	  accuracyChart:'',
	  lossChart: ''
    }
  },

  componentDidMount: function(){
  	console.log('ChartsContainer didmount');
  	this.processCanvas();
	this.lossChart();
	this.accuracyChart();
	this.cpuContainer();
	this.showAccuracychart();
	this.ramContainer();

	socket = io.connect('http://localhost:3333');
	socket.on('news', (msg)=>{
		this.onSocketMsg(msg,socket);
	//this.state.fullname = 'msg:- ' + msg;
	});
  },

  componentWillUnmount(){
    socket.close();
  },

  updateEpoch: function(ep){

  $('#div1_1_2_1').empty();
  console.log(ep);
    var el = document.getElementById('div1_1_2_1'); // get canvas

    var options = {
        percent:  ep,
        size: el.getAttribute('data-size') || 320,
        lineWidth: el.getAttribute('data-line') || 15,
        rotate: el.getAttribute('data-rotate') || 0,
    }

    var canvas = document.createElement('canvas');
        
    if (typeof(G_vmlCanvasManager) !== 'undefined') {
        G_vmlCanvasManager.initElement(canvas);
    }

    var ctx = canvas.getContext('2d');
    canvas.width = canvas.height = options.size;
    canvas.id="progressChart";

    el.appendChild(canvas);

    ctx.translate(options.size / 2, options.size / 2); // change center
    ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

    //imd = ctx.getImageData(0, 0, 240, 240);
    var radius = (options.size - options.lineWidth) / 2;

    var drawCircle = function(color, lineWidth, percent) {
        percent = Math.min(Math.max(0, percent || 1), 1);
        ctx.beginPath();
        ctx.arc(0, 0, radius, Math.PI, Math.PI + Math.PI * 2 * percent, false);
        ctx.strokeStyle = color;
            ctx.lineCap = 'round'; // butt, round or square
        ctx.lineWidth = lineWidth
        ctx.stroke();
    };

    drawCircle('#efefef', options.lineWidth, 100 / 100);
    drawCircle('#555555', options.lineWidth, options.percent / 100);

  },

  onSocketMsg: function(data,socket){
  	this.state.fullname = data;

  	if(data.CPU != undefined) {
      var point = $('#cpucontainer').highcharts().series[0].points[0];
      point.update(parseInt(data.CPU));
  }
  if(data.RAM != undefined) {
      var point = $('#ramcontainer').highcharts().series[0].points[0];
      point.update(parseInt(data.RAM));
      this.state.accuracyChart.series[0].setData(data.acTr,true);
      this.state.accuracyChart.series[1].setData(data.acVal,true);
      this.state.lossChart.series[0].setData(data.lsTr,true);
      this.state.lossChart.series[1].setData(data.lsVal,true);
      this.state.accuracyChart.xAxis[0].setExtremes(1, data.acTr.length);
      this.state.lossChart.xAxis[0].setExtremes(1, data.acTr.length);

      //$('#div1_1_2_1').attr("data-percent", 5);
      var str1= "TRAINING<br><br>"+ data.acTr.length+"/100 <br> EPOCH <br> "+data.sam_s+" <br> SAMPLES/S";
      $('#div1_1_2_2').html(str1);
      var str3 = "BATCH<br>"+data.batch+"/1875 <br><br> SECONDS/EPOCH <br> "+ data.sec_ep;
      $('#div1_1_2_3').html(str3);
      $('#div1_1_2_4').show();
      var str2 = "KPI: "+data.kpi+"<br>ACCURACY";
      $('#div1_1_3').html(str2);


      this.updateEpoch(data.acTr.length);

  	}
  	socket.emit('my other event', { my: 'data' });
  },


  processCanvas: function(){
  	// ************ FIRST.js STARTS *****************
  	var el = document.getElementById('div1_1_2_1'); // get canvas
  	


var options = {
    percent:  el.getAttribute('data-percent') || 25,
    size: el.getAttribute('data-size') || 320,
    lineWidth: el.getAttribute('data-line') || 15,
    rotate: el.getAttribute('data-rotate') || 0,
}

var canvas = this.refs.canvas;
    
if (typeof(G_vmlCanvasManager) !== 'undefined') {
    G_vmlCanvasManager.initElement(canvas);
}

var ctx = canvas.getContext('2d');
canvas.width = canvas.height = options.size;
canvas.id="progressChart";



ctx.translate(options.size / 2, options.size / 2); // change center
ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

//imd = ctx.getImageData(0, 0, 240, 240);
var radius = (options.size - options.lineWidth) / 2;

var drawCircle = function(color, lineWidth, percent) {
		percent = Math.min(Math.max(0, percent || 1), 1);
		ctx.beginPath();
		ctx.arc(0, 0, radius, Math.PI, Math.PI + Math.PI * 2 * percent, false);
		ctx.strokeStyle = color;
        ctx.lineCap = 'round'; // butt, round or square
		ctx.lineWidth = lineWidth
		ctx.stroke();
};

drawCircle('#efefef', options.lineWidth, 100 / 100);
drawCircle('#555555', options.lineWidth, options.percent / 100);
// ************ FIRST.js ENDS *****************
  },

  showAccuracychart: function(){
  	$('#accuracycontainer').show();
	$('#losscontainer').hide();
  },

  showLosschart: function(){
  	$('#accuracycontainer').hide();
	$('#losscontainer').show();
  },

  accuracyChart: function(){
  	this.state.accuracyChart = Highcharts.chart('accuracycontainer', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Accuracy'
    },
    credits: {
      enabled: false
    },

    xAxis: {
        allowDecimals: false,
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        }
    },
    yAxis: {
        title: {
            text: 'accuracy'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name}  <b>{point.y}</b><br/> in {point.x} epoch'
    },
    plotOptions: {
        area: {
            pointStart: 1,
            marker: {
                enabled: false,
                symbol: 'circle',
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: 'Training',
        data: []
    }, {
        name: 'Validation',
        data: []
    }]
});
  },

  lossChart: function(){
  	this.state.lossChart = Highcharts.chart('losscontainer', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Loss'
    },
    credits: {
      enabled: false
    },

    xAxis: {
        allowDecimals: false,
        labels: {
            formatter: function () {
                return this.value; // clean, unformatted number for year
            }
        }
    },
    yAxis: {
        title: {
            text: 'loss'
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    tooltip: {
        pointFormat: '{series.name} <b>{point.y}</b><br/> in {point.x} epoch'
    },
    plotOptions: {
        area: {
            pointStart: 1,
            marker: {
                enabled: false,
                symbol: 'circle',
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    series: [{
        name: 'Training',
        data: [ ]
    }, {
        name: 'Validation',
        data: [ ]
    }]
});
  },
  
  cpuContainer: function(){
  	var cpuContainer = Highcharts.chart('cpucontainer', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
     credits: {
      enabled: false
    },

    title: {
        text: 'CPU Status'
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'CPU (%)'
        },
        plotBands: [{
            from: 0,
            to: 60,
            color: '#55BF3B' // green
        }, {
            from: 60,
            to: 80,
            color: '#DDDF0D' // yellow
        }, {
            from: 80,
            to: 100,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Speed',
        data: [0],
        tooltip: {
            valueSuffix: ' %'
        }
    }]

});
  	
  },

  ramContainer: function(){
  	var ramContainer = Highcharts.chart('ramcontainer', {

    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
     credits: {
      enabled: false
    },

    title: {
        text: 'RAM Status'
    },

    pane: {
        startAngle: -150,
        endAngle: 150,
        background: [{
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#FFF'],
                    [1, '#333']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#333'],
                    [1, '#FFF']
                ]
            },
            borderWidth: 1,
            outerRadius: '107%'
        }, {
            // default background
        }, {
            backgroundColor: '#DDD',
            borderWidth: 0,
            outerRadius: '105%',
            innerRadius: '103%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: 'RAM (%)'
        },
        plotBands: [{
            from: 0,
            to: 60,
            color: '#55BF3B' // green
        }, {
            from: 60,
            to: 80,
            color: '#DDDF0D' // yellow
        }, {
            from: 80,
            to: 100,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Speed',
        data: [0],
        tooltip: {
            valueSuffix: '%'
        }
    }]

});
  },

  render: function () {
    return (
		<div className='ui container'>
			<div className='ui one column grid'>
				<div className='row'>
					{/*<div className='column'>*/}
						<div id="div1" className='col-md-6'>
							<div id="div1_1" className='row'>
								<div id="div1_1_1">
									<div style={{width:'50%', float:'left', fontSize:12}}>
										<strong>CREATED: 8 th June, 2017 {this.state.fullname}<br/>
										TYPE: Manual Job</strong>
									</div>
									<div style={{width:'50%', float:'left', fontSize:12}}>
										<strong>DEVICE: GPU(NA)<br/>
										VERSION: v108</strong>
									</div>
								</div>
								<div id="div1_1_2">
									<div data-percent="0" id="div1_1_2_1">
										<canvas ref="canvas"/>
										
										
									</div>
									<div className="text-center" id="div1_1_2_2"></div>
									<div className="text-center" id="div1_1_2_3"></div>
									<div className="text-center" id="div1_1_2_4" style={{display: 'none'}}>
										ELAPSED<br/>
										00:01:32<br/>
										<br/>
										ESTIMATE<br/>
										00:03:43
									</div>
								</div>
								<div className="text-center" id="div1_1_3"></div>
							</div>
							<div id="div1_2" className='row'>
								<div id="div1_2_1" className='col-md-6'>
									<table className="table" style={{fontSize:15, margin: '1px solid red'}}>
										<thead className="thead-inverse">
											<tr>
												<th colSpan="2">ADDITIONAL INFORMATION</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>PARAMETER</td>
												<td>25510</td>
											</tr>
											<tr>
												<td>BATCH SIZE</td>
												<td>16</td>
											</tr>
											<tr>
												<td>DATA</td>
												<td>TRAINING: 30000<br/>
												VALIDATION:15000</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div id="div1_2_2" className='col-md-6'>
									<table className="table" style={{fontSize:15, margin: '1px solid red'}}>
										<thead className="thead-inverse">
											<tr>
												<th colSpan="2">HYPERPARAMETERS</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>dropout_last_layer</td>
												<td>0.5</td>
											</tr>
											<tr>
												<td>weights_init</td>
												<td>Normal</td>
											</tr>
											<tr>
												<td>Optimizer</td>
												<td>ada</td>
											</tr>
											<tr>
												<td>learning rate</td>
												<td>1</td>
											</tr>
											<tr>
												<td>rho</td>
												<td>0.95</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div className='col-md-6'>
						<div id="div2" className='row'> 
  							<div className="text-center" id="c2Menubar">
    							<input type="radio" name="options" id="option1" autoComplete="off" onChange={this.showAccuracychart} onClick={this.showAccuracychart} checked /> Accuracy &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    							<input type="radio" name="options" id="option2" autoComplete="off" onClick={this.showLosschart}/> Loss
  							</div>
  							<div id="accuracycontainer" ref="accuracycontainer"></div>
  							<div id="losscontainer" ref="losscontainer"></div>  							
  							
						</div>

						<div id="div3" className='row'>
  							<div id="ramcontainer" className='col-md-6'></div>
  							<div id="cpucontainer" className='col-md-6'></div>  							
						</div>
						</div>

					{/*</div>*/}
				</div>
			</div>
		</div>
    )
  }
});

module.exports = ChartsContainer;
